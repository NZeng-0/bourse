<script setup lang="ts">
import type { indexProduct } from '~/api/types'
import { getIndexProduct } from '~/api'
import { useConf } from '~/store/useConf'
import type { configlist } from '~/types'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const list = shallowRef<indexProduct[]>([])
const timer = ref()
const prevPrices = ref(new Map())
const priceChanges = ref(new Map())
const styles = ref(new Map())
const icons = ref<Map<number, boolean>>(new Map())
const requestTime = getTimestamp()

function getTimestamp() {
  const conf = useConf().data
  if (conf)
    return conf.find((e: configlist) => e.key === 'index_list_request_time')?.value
  return 5
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
    }, 500)
  })

  list.value = data.value.data
  list.value.sort((a: indexProduct, b: indexProduct) => a.sort - b.sort)
}

onMounted(async () => {
  loading.value = true
  await __init()
  timer.value = setInterval(async () => {
    await __init()
  }, 1000 * Number(requestTime) || 5)
  loading.value = false
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <table mt4.5>
    <thead text="1rem">
      <tr>
        <th w="2/4" />
        <th w="1/4">
          <span color="#FC6C6B">{{ t('trading.max') }} </span>
          <span color="#121826">/</span>
          <span color="#19C09A"> {{ t('trading.min') }}</span>
        </th>
        <th max-w="1.5/4" color="#121826">
          {{ t('current') }}
        </th>
        <th w="1/4" text-end>
          <span color="#121826">{{ t('rate') }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in list" :key="key" h15 @click="go(item.id)">
        <td flex="~ gap3">
          <img h12 w12 rounded-full :src="getSrc(item.logo)" @error="handleImageError($event.target)">
          <div text-left class="c1">
            <div wfull>
              {{ item.product_name }}
            </div>
            <div w-full class="stosx">
              STOSX
            </div>
          </div>
        </td>
        <td text="sm center">
          <span color="#FC6C6B"> {{ format(item.high, 3) }} </span>
          <br>
          <span color="#19C09A"> {{ format(item.low, 3) }} </span>
        </td>
        <td text-right>
          <div :class="priceChanges.get(item.id)">
            {{ format(item.price, 4) }}
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
  <div h10 />
</template>

<style scoped>
td {
  vertical-align: middle;
}

th {
  font-weight: normal;
}

.stosx {
  font-size: 0.714rem;
  font-weight: normal;
  line-height: 0.857rem;
  letter-spacing: 0em;
  color: #8F92A1;
}

.bfb {
  /* margin-top: 9px; */
  font-size: 0.857rem;
  font-weight: normal;
  line-height: 1rem;
  text-align: right;
  letter-spacing: 0rem;
  font-variation-settings: "opsz" auto;
  color: #353535;
}

.down_card {
  height: 1.714rem;
  border-radius: 0.429rem;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.214rem 0.5rem;

  background: #19C09A;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.286rem;
  letter-spacing: 0em;

  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
}

.up_card {
  height: 1.714rem;
  border-radius: 0.429rem;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.214rem 0.5rem;

  background: #FC6C6B;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.286rem;
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
