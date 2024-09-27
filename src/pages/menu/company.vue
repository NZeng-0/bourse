<script setup lang="ts">
import { useCompnay } from '~/store/useCompany'

const { t } = useI18n()

const company = useCompnay()
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('company.title')" />
    <div h-screen overflow-x-scroll px5>
      <div v-html="company.data.value" />
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
