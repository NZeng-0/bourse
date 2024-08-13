<script setup lang="ts">
import { getIndexProduct } from '~/api'
import type { currentType } from '~/types'
import { useCard } from '~/store/useTradingCard'

const key = inject('currentKey') as string
const { t } = useI18n()
const store = useCard()
const current = shallowRef<currentType>()

onMounted(async () => {
  const { data } = await getIndexProduct()
  for (const e of data.value.data) {
    if (e.id === Number.parseInt(key)) {
      if (store.data === undefined || store.data.id !== e.current.id) {
        store.data = e.current
        current.value = e.current
      }
      else {
        current.value = store.data
      }
    }
  }
})
</script>

<template>
  <div mx6 mt4 h45 wfull rounded-2xl bg-white px4 pb4 pl4>
    <p mt-5 text-lg>
      {{ t('trading.real_time') }}
    </p>
    <div v-if="current" flex="~ wrap" wfull justify-between>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.avg') }}
        </div>
        <div style="color:#121826" text-lg class="text" w="4/5">
          {{ current!.count / current!.amount }}
        </div>
      </div>
      <div w="1/3" mt2.5>
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.max') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ current!.high }}
        </div>
      </div>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.min') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ current!.low }}
        </div>
      </div>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.vloume') }}
        </div>
        <div style="color:#121826" class="text" w="4/5">
          {{ current!.vol }}
        </div>
      </div>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.avg_vol') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ current!.high }}
        </div>
      </div>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.market') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ current!.low }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
