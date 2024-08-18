<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('company.title')" />
    <div h-screen overflow-x-scroll px5>
      {{ t('company.content') }}
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
