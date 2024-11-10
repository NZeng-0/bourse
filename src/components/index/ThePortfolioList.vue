<script setup lang="ts">
import {
  getProductTakeList,
} from '~/api'
import type { indexProduct } from '~/api/types'

const router = useRouter()
const list: Ref<indexProduct[]> = ref([])
const timer = ref()

async function go(key: number) {
  router.push(`/fund/${key}`)
}

function handleImageError(key: number) {
  list.value[key].logo = icon
}

function getSrc(uri: string) {
  return `${baseUrl}/${uri}`
}

function isUp(state: number) {
  return state === 1
}

async function init() {
  const { data } = await getProductTakeList()
  list.value = data.value.data
  list.value.sort((a: indexProduct, b: indexProduct) => a.sort - b.sort)
}

onMounted(async () => {
  await init()
  timer.value = setInterval(async () => {
    await init()
  }, 5000)
})

onUnmounted(() => {
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
              <img v-if="isUp(e.profit_status)" src="../../assets/images/index/up.png" class="up_icon">
              <img v-else src="../../assets/images/index/down.png" class="up_icon">
              {{ e.diff }}%
            </div>
          </div>
        </div>
      </div>
      <div flex="~">
        <div ml-4.5 mt-4 h12 w12 />
        <div w="60%" ml2 :class="isUp(e.profit_status) ? 'up_card' : 'down_card'">
          {{ e.price }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bfb {
  font-size: 12px;
  font-weight: normal;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0px;
  font-variation-settings: "opsz" auto;
  color: #353535;
}

.down_card {
  width: 91px;
  height: 30px;
  border-radius: 6px;
  margin-top: 20px;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  background: #19C09A;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
}
.up_card {
  width: 91px;
  height: 30px;
  border-radius: 6px;
  margin-top: 20px;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  background: #FC6C6B;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
}
</style>
