<script setup lang="ts">
import { getProductDetail } from '~/api'
import type { indexProduct } from '~/api/types'
import { useProduct } from '~/store/useProduct'

const { t } = useI18n()
const router = useRouter()
const productStore = useProduct()

const list: Ref<indexProduct[]> = ref([])

function getIcon(range: number) {
  return range === 1 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'
}

function getColor(range: number) {
  return range === 1 ? '#19c09a' : '#fc6c6b'
}

async function go(key: number) {
  const { data } = await getProductDetail(key, '1week')
  productStore.data = data.value.data
  router.push('fund')
}

function handleImageError(key: number) {
  list.value[key].logo = icon
}

onMounted(async () => {
  list.value = await getProduct()
})
</script>

<template>
  <div flex="~ gap2 nowrap" mt-4 w-full items-start overflow-y-hidden>
    <div v-for="(e, key) in list" :key mr-4 h37 w51 shrink-0 rounded-2xl bg-zinc-100 p1 @click="go(e.id)">
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
          ￥{{ e.price }}
        </div>
        <div flex="~" mb5 mr1 h8 w19 items-center justify-center rounded-xl bg-white>
          <div :class="getIcon(e.profit_status)" :style="{ color: getColor(e.profit_status) }" h1.2rem w1.2rem />
          <span text-xs :style="{ color: e.profit_status === 1 ? '#19c09a' : '#fc6c6b' }">
            {{ e.diff_rate }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
