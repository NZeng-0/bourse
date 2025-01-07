<script setup lang="ts">
import {
  getProductTakeList,
} from '~/api'
import type { indexProduct } from '~/api/types'
import { useConf } from '~/store/useConf'
import type { configlist } from '~/types'

const router = useRouter()
const list: Ref<indexProduct[]> = ref([])
const timer = ref()
const prevPrices = ref(new Map())
const priceChanges = ref(new Map())
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

function handleImageError(key: number) {
  list.value[key].logo = icon
}

function getSrc(uri: string) {
  return `${baseUrl}/${uri}`
}

async function init() {
  const { data } = await getProductTakeList()
  if (data.value.code !== 200)
    clearInterval(timer.value)

  data.value.data.forEach((product: indexProduct) => {
    const id = product.id
    const prevPrice = prevPrices.value.get(id)
    if (prevPrice !== undefined) {
      if (product.price > prevPrice) {
        priceChanges.value.set(id, 'up_card')
        icons.value.set(id, true)
      }
      else if (product.price < prevPrice) {
        priceChanges.value.set(id, 'down_card')
        icons.value.set(id, false)
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
    }, 500)
  })

  list.value = data.value.data
  list.value.sort((a: indexProduct, b: indexProduct) => a.sort - b.sort)
}

onMounted(async () => {
  await init()
  timer.value = setInterval(async () => {
    await init()
  }, 1000 * Number(requestTime))
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div flex="~ gap2 nowrap" mt-4 w-full items-start overflow-y-hidden>
    <div v-for="(e, key) in list" :key mr-4 w51 shrink-0 rounded-2xl bg-zinc-100 p1 @click="go(e.id)">
      <div flex="~">
        <div ml-4.5 mt-4>
          <img h12 w12 rounded-full :src="getSrc(e.logo)" @error="handleImageError(key)">
        </div>
        <div ml-2 mt-5 text-left w="60%">
          <div text-sm text-portolio-primary font-normal>
            {{ e.product_name }}
          </div>
          <div flex="~" mt-2 justify-between text-xs text-portolio font-normal>
            STOSX
            <div flex="~" class="bfb">
              <img v-if="icons.get(e.id)" src="../../assets/images/index/up.png" class="up_icon">
              <img v-else src="../../assets/images/index/down.png" class="up_icon">
              {{ format(e.diff_rate, 2) }}%
            </div>
          </div>
        </div>
      </div>
      <div flex="~">
        <div ml-4.5 mt-4 h12 w12 />
        <div w="60%" ml2 :class="priceChanges.get(e.id)">
          {{ format(e.price, 4) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bfb {
  font-size: 0.857rem;
  font-weight: normal;
  line-height: 1rem;
  text-align: right;
  letter-spacing: 0rem;
  font-variation-settings: "opsz" auto;
  color: #353535;
}

.down_card {
  width: 6.5rem;
  height: 2.143rem;
  border-radius: 0.429rem;
  margin-top: 1.071rem;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.429rem 1rem;
  background: #19C09A;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.286rem;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
}

.up_card {
  width: 6.5rem;
  height: 2.143rem;
  border-radius: 0.429rem;
  margin-top: 1.071rem;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.429rem 1rem;
  background: #FC6C6B;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.286rem;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
}
</style>
