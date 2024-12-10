<script setup lang="ts">
import { getIndexProductAll } from '~/api'
import type { indexProduct } from '~/api/types'

const router = useRouter()

const list: Ref<indexProduct[]> = ref([])
const loading = ref(false)
const timer = ref()
const prevPrices = ref(new Map())
const priceChanges = ref(new Map())
const styles = ref(new Map())
const icons = ref<Map<number, boolean>>(new Map())

async function go(key: number) {
  router.push(`/fund/${key}`)
}

function handleImageError(that: EventTarget | null) {
  (that as HTMLImageElement).src = icon
}

function getSrc(uri: string) {
  return `${baseUrl}/${uri}`
}

async function init() {
  const { data } = await getIndexProductAll()
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
  await init()
  timer.value = setInterval(async () => {
    await init()
  }, 5000)
  loading.value = false
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <TheHead back="/" title="股市交易" />
  <div h-screen overflow-y-scroll bg-trading px-4>
    <TheEmpty v-if="loading" />
    <table m-auto>
      <tbody>
        <tr v-for="(item, key) in list" :key="key" h20 class="item" @click="go(item.id)">
          <td>
            <div flex="~ gap2" w="2/4">
              <img h12 w12 rounded-full :src="getSrc(item.logo)" @error="handleImageError($event.target)">
              <div class="c1" text-left>
                <div truncate class="sub_title">
                  {{ item.product_name }}
                </div>
                <div w-full flex="~" items-end class="stosx">
                  STOSX
                </div>
              </div>
            </div>
          </td>
          <td>
            <div flex="~" items-center justify-between>
              <div w="1/2" :class="priceChanges.get(item.id)">
                {{ format(item.price, 2) }}
              </div>
              <div w="1/2" ml1 class="bfb">
                <img v-if="icons.get(item.id)" src="../assets/images/index/up.png" class="up_icon">
                <img v-else src="../assets/images/index/down.png" class="up_icon">
                {{ format(item.diff, 2) }}%
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div h70 />
  </div>
  <TheFooter :index="0" />
</template>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 1.071rem; /* 0 水平间隔，10px 垂直间隔 */
}
td {
  vertical-align: middle;
}
.item {
  border-radius: 1.094rem;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 0.071rem solid rgba(255, 255, 255, 1);
  width: 100%;
}

.item td:first-child {
  border-top-left-radius: 1.094rem;
  border-bottom-left-radius: 1.094rem;
  padding: 0.714rem;
}

.item td:last-child {
  padding: 0.714rem;
  border-top-right-radius: 1.094rem;
  border-bottom-right-radius: 1.094rem;
}

.bfb {
  font-size: 0.857rem;
  font-weight: normal;
  line-height: 1rem;
  text-align: right;
  letter-spacing: 0rem;
  font-variation-settings: "opsz" auto;
  color: #353535;
  justify-content: end;
  display: flex;
  justify-content: center;
  align-items: center;
}

.down_card {
  min-width: 5.357rem;
  height: 2.143rem;
  border-radius: 0.571rem;
  background: #19C09A;
  font-size: 1rem;
  font-weight: normal;
  line-height: 0.857rem;
  text-align: right;
  letter-spacing: 0em;

  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.357rem;
}

.up_card {
  min-width: 5.357rem;
  height: 2.143rem;
  border-radius: 0.571rem;
  background: #FC6C6B;
  font-size: 1rem;
  font-weight: normal;
  line-height: 0.857rem;
  text-align: right;
  letter-spacing: 0em;

  font-variation-settings: "opsz" auto;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.357rem;
}

.stosx {
  font-size: 0.874rem;
  font-weight: normal;
  color: #575B66;
}

.sub_title {
  font-size: 1.166rem;
  font-weight: 500;
  line-height: 1.643rem;
}

.c1 {
  display: inline-flex;
  flex-wrap: wrap;
  align-content: space-between;
}
</style>
