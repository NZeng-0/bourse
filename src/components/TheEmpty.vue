<script setup lang="ts">
const empty = new URL('~/assets/images/order/empty.png', import.meta.url).href
const { t } = useI18n()
</script>

<template>
  <div flex="~ wrap" mt15 justify-center>
    <img :src="empty" class="empty" h50 w50 border-dashed>
    <div wfull text-center text-xs leading-4.5 class="text-#A7A7A7">
      {{ t('isEmpty') }}
    </div>
  </div>
</template>
