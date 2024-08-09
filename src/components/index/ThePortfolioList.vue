<script setup lang="ts">
import type { indexProduct } from '~/api/types'
import { getIndexProduct } from '~/api'

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)

const list: Ref<indexProduct[]> = ref([])

async function getProduct() {
  loading.value = true
  const { data } = await getIndexProduct()
  if (data.value.code !== 200)
    router.push('/login')
  list.value = data.value.data
  loading.value = false
}

onMounted(async () => {
  await getProduct()
})

function getIcon(range: number) {
  return range === 1 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'
}

function getColor(range: number) {
  return range === 1 ? '#19c09a' : '#fc6c6b'
}

function go(key: number) {
  router.push(`/trading/week/${key}`)
}

function handleImageError(key: number) {
  list.value[key].logo = icon
}
</script>

<template>
  <div flex="~ gap2 nowrap" mt-4 w-full items-start overflow-y-hidden>
    <div v-if="loading" h37 w51 shrink-0 rounded-2xl bg-zinc-100 class="animate-pulse" />
    <div v-for="(e, key) in list" :key mr-4 h37 w51 shrink-0 rounded-2xl bg-zinc-100 p1 @click="go(key)">
      <div flex="~">
        <div ml-4.5 mt-4>
          <img h12 w12 rounded-full :src="e.logo" @error="handleImageError(key)">
        </div>
        <div ml-2 mt-5 text-left>
          <div text-sm text-portolio-primary font-normal>
            {{ e.product_code }}
          </div>
          <div mt-2 text-xs text-portolio font-normal>
            {{ e.product_name }}
          </div>
        </div>
      </div>
      <div ml4 mt5 text-sm text-portolio font-normal>
        {{ t('index.rise_range') }}
      </div>
      <div flex="~ gap2" ml4 justify-between>
        <div text-left text-lg text-portolio-primary>
          ￥{{ e.sjbdfw }}
        </div>
        <div flex="~" mb5 mr1 h-8 w19 items-center justify-center rounded-xl bg-white>
          <div :class="getIcon(e.profit_status)" :style="{ color: getColor(e.profit_status) }" h-1.2rem w-1.2rem />
          <span text-xs :style="{ color: e.profit_status === 1 ? '#19c09a' : '#fc6c6b' }">
            {{ e.profit_status }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
}
</style>
