<script setup lang="ts">
const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
</script>

<template>
  <div h25 flex="~" items-center justify-between>
    <img :src="backUrl" h10 w10>
    <div text-trading-title text-xl>
      <!-- TODO title -->
      BTC/USDT
    </div>
    <div h10 w10 />
  </div>
</template>
