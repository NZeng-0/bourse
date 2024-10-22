<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import type { Props } from '~/composables/lineChartOption'
import { getOption } from '~/composables/lineChartOption'
import type { history, indexProduct } from '~/api/types'
import { useProduct } from '~/store/useProduct'
import { getIndexProduct, getProductDetail } from '~/api'

const router = useRouter()
const productStore = useProduct()

const grid = {
  height: '80%',
  bottom: '10%',
  cursor: 'pointer',
}

const loading = ref(false)
const list = shallowRef<indexProduct[]>([])

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
            color: range < 0 ? 'rgba(252,108,107,0)' : 'rgba(25,192,154, 0)',
          }, {
            offset: 1,
            color: range < 0 ? 'rgba(252,108,107,1)' : 'rgba(25,192,154, 1)',
          }],
          globalCoord: false,
        },
      },
    },
  ]
  return getOption({
    grid,
    series,
  } as Props)
}

function getIcon(state: number) {
  return state === 1 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'
}

function getColor(state: number) {
  return state === 1 ? '#19c09a' : '#fc6c6b'
}

function getLineColor(state: number): string {
  return state === 1 ? '#19C09A' : '#FC6C6B'
}

async function go(key: number) {
  const { data } = await getProductDetail(key, '1week')
  productStore.data = data.value.data
  router.push('fund')
}

function handleImageError(that: EventTarget | null) {
  (that as HTMLImageElement).src = icon
}

function getSrc(uri: string) {
  return `${baseUrl}/${uri}`
}

onMounted(async () => {
  loading.value = true
  const { data } = await getIndexProduct(0)
  list.value = data.value.data
  loading.value = false
})
</script>

<template>
  <div mt4.5>
    <div v-for="(item, key) in list" :key :class="key !== 0 ? key === (list.length - 1) ? 'mt8 mb42' : 'mt8' : ''">
      <div flex="~ gap2" justify-between @click="go(item.id)">
        <div flex="~ gap2" w="2/4">
          <img h12 w12 rounded-full :src="getSrc(item.logo)" @error="handleImageError($event.target)">
          <div text-left>
            <div>
              {{ item.product_name }}
            </div>
            <div class="stosx">
              STOSX
            </div>
          </div>
        </div>
        <div flex="~" justify-between w="2/4">
          <div h-full w-19>
            <TheCharts :option="getSeries(item.history_list, item.profit_status)" :dom="`list-${key}`" />
          </div>
          <div text-right>
            <div>{{ item.price }}</div>
            <div flex="~" w-full justify-between text-right text-xs>
              <div
                :class="getIcon(item.profit_status)" :style="{ color: getColor(item.profit_status) }" ml h-1.2rem
                w-1.2rem
              />
              <div :style="{ color: item.profit_status === 1 ? '#19c09a' : '#fc6c6b' }">
                {{ item.diff }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stosx {
  font-size: 10px;
  font-weight: normal;
  line-height: 12px;
  letter-spacing: 0em;
  color: #8F92A1;
}
</style>
