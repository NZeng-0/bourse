<script setup lang="ts">
import type { Props } from '~/composables/lineChartOption'
import { getOption } from '~/composables/lineChartOption'
import type { history, indexProduct } from '~/api/types'
import { getIndexProduct } from '~/api'

const router = useRouter()

const grid = {
  height: '80%',
  bottom: '10%',
  cursor: 'pointer',
}

const loading = ref(false)
const list = shallowRef<indexProduct[]>([])
const timer = ref()
const prevPrices = ref(new Map())
const priceChanges = ref(new Map())
const styles = ref(new Map())
const chartOptions = ref<Map<number, any>>(new Map())
const icons = ref<Map<number, boolean>>(new Map())

function updateChartOption(item: indexProduct) {
  const option = getSeries(item.history_list, styles.value.get(item.id))
  chartOptions.value.set(item.id, option)
}

function parseData(data: history[]) {
  const result: Array<string[]> = []
  for (const h of data) {
    const val = []
    val.push(h.open)
    val.push(h.close)
    val.push(h.low)
    val.push(h.high)
    result.push(val)
  }
  return result
}

function getSeries(data: history[], range: number) {
  const series = [
    {
      data: parseData(data),
      type: 'line',
      smooth: 0.5,
      lineStyle: {
        color: getLineColor(range),
        width: 2,
      },
      symbol: 'none',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: range === 1 ? 'rgba(252,108,107,1)' : 'rgba(25,192,154, 1)',
          }, {
            offset: 1,
            color: range === 1 ? 'rgba(252,108,107,0)' : 'rgba(25,192,154, 0)',
          }],
          globalCoord: false,
        },
      },
    },
  ]

  const test = getOption({
    grid,
    series,
  } as Props)
  return test
}

function getLineColor(state: number): string {
  return state === 1 ? '#FC6C6B' : '#19C09A'
}

async function go(key: number) {
  router.push(`/fund/${key}`)
}

function handleImageError(that: EventTarget | null) {
  (that as HTMLImageElement).src = icon
}

function getSrc(uri: string) {
  return `${baseUrl}/${uri}`
}

async function __init() {
  const { data } = await getIndexProduct(0)
  if (data.value.code !== 200)
    clearInterval(timer.value)

  // 对每个产品检查价格变化
  data.value.data.forEach((product: indexProduct) => {
    const id = product.id
    const prevPrice = prevPrices.value.get(id)
    if (prevPrice !== undefined) {
      if (product.price < prevPrice) {
        priceChanges.value.set(id, 'up_card')
        icons.value.set(id, true)
        styles.value.set(id, 1)
      }
      else if (product.price > prevPrice) {
        priceChanges.value.set(id, 'down_card')
        icons.value.set(id, false)
        styles.value.set(id, -1)
      }
    }
    prevPrices.value.set(product.id, product.price)
    // 设置延时恢复到默认状态
    setTimeout(() => {
      priceChanges.value.set(
        id,
        product.diff > 0 ? 'up_card' : 'down_card',
      )
      icons.value.set(id, product.diff > 0)
      styles.value.set(id, product.diff > 0 ? 1 : -1)
      updateChartOption(product)
    }, 500)
    updateChartOption(product)
  })

  list.value = data.value.data
  list.value.sort((a: indexProduct, b: indexProduct) => a.sort - b.sort)
}

onMounted(async () => {
  loading.value = true
  await __init()
  timer.value = setInterval(async () => {
    await __init()
  }, 3000)
  loading.value = false
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <table mt4.5>
    <thead text="13px">
      <tr>
        <th w="2/4" />
        <th w="1/4">
          <span color="#FC6C6B">最高 </span>
          <span color="#121826">/</span>
          <span color="#19C09A"> 最低</span>
        </th>
        <th max-w="1.5/4" color="#121826">
          当前值
        </th>
        <th w="1/4" text-end>
          <span color="#121826">涨/跌幅</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in list" :key="key" h15 @click="go(item.id)">
        <td flex="~ gap3">
          <img h12 w12 rounded-full :src="getSrc(item.logo)" @error="handleImageError($event.target)">
          <div text-left class="c1">
            <div w-full>
              {{ item.product_name }}
            </div>
            <div w-full class="stosx">
              STOSX
            </div>
          </div>
        </td>
        <td text="12px center">
          <span> {{ format(item.high, 3) }} </span>
          <br>
          <span> {{ format(item.low, 3) }} </span>
        </td>
        <td text-right>
          <div :class="priceChanges.get(item.id)">
            {{ format(item.price, 3) }}
          </div>
        </td>
        <td class="bfb">
          <div flex="~" items-center justify-end>
            <img v-if="icons.get(item.id)" src="../../assets/images/index/up.png" class="up_icon">
            <img v-else src="../../assets/images/index/down.png" class="up_icon">
            {{ format(item.diff_rate, 2) }}%
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
td {
  vertical-align: middle;
}

th {
  font-weight: normal;
}

.stosx {
  font-size: 10px;
  font-weight: normal;
  line-height: 12px;
  letter-spacing: 0em;
  color: #8F92A1;
}

.bfb {
  /* margin-top: 9px; */
  font-size: 12px;
  font-weight: normal;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0px;
  font-variation-settings: "opsz" auto;
  color: #353535;
}

.down_card {
  height: 24px;
  border-radius: 6px;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px 7px;

  background: #19C09A;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: 0em;

  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
}

.up_card {
  height: 24px;
  border-radius: 6px;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px 7px;

  background: #FC6C6B;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: 0em;

  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
}

.c1 {
  display: inline-flex;
  flex-wrap: wrap;
  align-content: space-around;
}
</style>
