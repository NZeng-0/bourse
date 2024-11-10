<script setup lang="ts">
import { getIndexProductAll } from '~/api'
import type { indexProduct } from '~/api/types'

const router = useRouter()

const list: Ref<indexProduct[]> = ref([])
const loading = ref(false)
const timer = ref()

async function go(key: number) {
  router.push(`/fund/${key}`)
}

function handleImageError(that: EventTarget | null) {
  (that as HTMLImageElement).src = icon
}

function getSrc(uri: string) {
  return `${baseUrl}/${uri}`
}

function isUp(state: number) {
  return state === 1
}

async function init() {
  const { data } = await getIndexProductAll()
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
    <template v-else>
      <div v-for="(item, key) in list" :key mt4>
        <div flex="~" justify-between class="item" @click="go(item.id)">
          <div flex="~ gap2" w="2/4">
            <img h12 w12 rounded-full :src="getSrc(item.logo)" @error="handleImageError($event.target)">
            <div class="c1" text-left>
              <div w="80%" truncate class="sub_title">
                {{ item.product_name }}
              </div>
              <div w-full flex="~" items-end class="stosx">
                STOSX
              </div>
            </div>
          </div>
          <div flex="~" w="60%" items-center justify-between>
            <div :class="isUp(item.profit_status) ? 'up_card' : 'down_card'">
              {{ item.price }}
            </div>
            <div class="bfb">
              <img v-if="isUp(item.profit_status)" src="../assets/images/index/up.png" class="up_icon">
              <img v-else src="../assets/images/index/down.png" class="up_icon">
              {{ item.diff }}%
            </div>
          </div>
        </div>
      </div>
    </template>
    <div h45 />
  </div>
  <TheFooter :index="0" />
</template>

<style scoped>
.item {
  border-radius: 15.31px;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 1);
  padding: 10px;
}

.bfb {
  font-size: 12px;
  font-weight: normal;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0px;
  font-variation-settings: "opsz" auto;
  color: #353535;
  justify-content: end;
  display: flex;
  justify-content: center;
  align-items: center;
}

.down_card {
  min-width: 75px;
  height: 30px;
  border-radius: 8px;
  background: #19C09A;
  font-size: 14px;
  font-weight: normal;
  line-height: 12px;
  text-align: right;
  letter-spacing: 0em;

  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.up_card {
  min-width: 75px;
  height: 30px;
  border-radius: 8px;
  background: #FC6C6B;
  font-size: 14px;
  font-weight: normal;
  line-height: 12px;
  text-align: right;
  letter-spacing: 0em;

  font-variation-settings: "opsz" auto;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.stosx {
  font-size: 12.24px;
  font-weight: normal;
  color: #575B66;
}

.sub_title {
  font-size: 16.33px;
  font-weight: 500;
  line-height: 23px;
}

.c1 {
  display: inline-flex;
  flex-wrap: wrap;
  align-content: space-between;
}
</style>
