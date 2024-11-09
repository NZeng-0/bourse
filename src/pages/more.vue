<script setup lang="ts">
import { getIndexProductAll } from '~/api'
import type { indexProduct } from '~/api/types'

const router = useRouter()

const list: Ref<indexProduct[]> = ref([])
const loading = ref(false)

function getIcon(range: number) {
  return range === 1 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'
}

async function go(key: number) {
  router.push(`/fund/${key}`)
}

function getColor(range: number) {
  return range === 1 ? '#19c09a' : '#fc6c6b'
}

function handleImageError(that: EventTarget | null) {
  (that as HTMLImageElement).src = icon
}

function getSrc(uri: string) {
  return `${baseUrl}/${uri}`
}

onMounted(async () => {
  loading.value = true
  const { data } = await getIndexProductAll()
  list.value = data.value.data
  list.value.sort((a: indexProduct, b: indexProduct) => a.sort - b.sort)
  loading.value = false
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
            <div text-left>
              <div>
                {{ item.product_name }}
              </div>
              <div class="stosx">
                STOSX
              </div>
            </div>
          </div>
          <div flex="~" justify-end w="2/4">
            <div text-right>
              <div>￥{{ item.price }}</div>
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
</style>
