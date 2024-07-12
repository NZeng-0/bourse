<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div mx6 mt4 h45 wfull rounded-2xl bg-white px4 pb4 pl4>
    <p mt-5 text-lg>
      {{ t('trading.real_time') }}
    </p>
    <div flex="~ wrap" wfull justify-between>
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.avg') }}
        </div>
        <div style="color:#121826" text-lg>
          160.32
        </div>
      </div>
      <div w="1/5" />
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.max') }}
        </div>
        <div style="color:#121826" text-lg>
          160.36
        </div>
      </div>
      <div w="1/5" />
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.min') }}
        </div>
        <div style="color:#121826" text-lg>
          130.68
        </div>
      </div>
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.vloume') }}
        </div>
        <div style="color:#121826" text-lg>
          160.32
        </div>
      </div>
      <div w="1/5" />
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.avg_vol') }}
        </div>
        <div style="color:#121826" text-lg>
          160.32
        </div>
      </div>
      <div w="1/5" />
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          {{ t('trading.market') }}
        </div>
        <div style="color:#121826" text-lg>
          160.32
        </div>
      </div>
    </div>
  </div>
</template>
