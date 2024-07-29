<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div flex="~ gap2 wrap" items-center justify-between>
    <div text-lg font-normal>
      {{ t('index.stock_market') }}
    </div>
    <div text-sm text-all-list font-normal>
      {{ t('index.more') }}
    </div>
  </div>
  <ThePortfolioList />
  <div mt-5.5 text-left text-lg>
    {{ t('index.analysis') }}
  </div>
  <TheList />
</template>
