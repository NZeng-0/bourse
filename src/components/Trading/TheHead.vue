<script setup lang="ts">
defineProps<{
  title: string
  back: string
}>()

const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
</script>

<template>
  <div flex="~" position-absolute z-10 h16 w-full items-center justify-between bg-white px-4>
    <RouterLink :to="back">
      <img :src="backUrl" h6.25 w6.25>
    </RouterLink>
    <div text-xl text-trading-title>
      {{ title }}
    </div>
    <div h10 w10 />
  </div>
  <div h16 />
</template>
