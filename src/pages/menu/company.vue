<script setup lang="ts">
import { useCompnay } from '~/store/useCompany'

const { t } = useI18n()

const company = useCompnay()
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('company.title')" />
    <div h-screen overflow-x-scroll px5>
      <div mt-1 class="break-word">
        <div v-html="company.data.value" />
      </div>
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>

<style scoped>
.break-word {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
