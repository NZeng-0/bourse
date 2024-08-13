<script setup lang="ts">
defineProps<{
  title: string
  back: string
}>()

const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
</script>

<template>
  <div h25 flex="~" items-center justify-between>
    <RouterLink :to="back">
      <img :src="backUrl" h10 w10>
    </RouterLink>
    <div text-xl text-trading-title>
      {{ title }}
    </div>
    <div h10 w10 />
  </div>
</template>
