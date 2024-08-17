<script setup lang="ts">
import type { cardType } from '~/types'

const { card } = defineProps<{
  card: cardType
}>()

const { t } = useI18n()
</script>

<template>
  <div mx6 mt4 h45 wfull rounded-2xl bg-white px4 pb4 pl4>
    <p mt-5 text-lg>
      {{ t('trading.real_time') }}
    </p>
    <div flex="~ wrap" wfull justify-between>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.avg') }}
        </div>
        <div style="color:#121826" text-lg class="text" w="4/5">
          {{ Number.parseInt(card.count) / Number.parseInt(card.amount) }}
        </div>
      </div>
      <div w="1/3" mt2.5>
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.max') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ card.high }}
        </div>
      </div>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.min') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ card.low }}
        </div>
      </div>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.vloume') }}
        </div>
        <div style="color:#121826" class="text" w="4/5">
          {{ card.vol }}
        </div>
      </div>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.avg_vol') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ card.high }}
        </div>
      </div>
      <div mt2.5 w="1/3">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.market') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ card.low }}
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
