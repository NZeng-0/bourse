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
    <div flex="~ wrap" wfull justify-between px-5>
      <div mt2.5>
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.open') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ card.open }}
        </div>
      </div>
      <div mt2.5>
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.close') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ card.close }}
        </div>
      </div>
    </div>
    <div flex="~ wrap" wfull justify-between px-5>
      <div mt2.5>
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.max') }}
        </div>
        <div style="color:#121826" text-lg>
          {{ card.high }}
        </div>
      </div>
      <div mt2.5>
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.min') }}
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
