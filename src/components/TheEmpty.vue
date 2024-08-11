<script setup lang="ts">
const empty = new URL('~/assets/images/order/empty.png', import.meta.url).href
</script>

<template>
  <div flex="~ wrap" mt15 justify-center>
    <img :src="empty" class="empty" h50 w50 border-dashed>
    <div wfull text-center text-xs leading-4.5 class="text-#A7A7A7">
      暂无数据
    </div>
  </div>
</template>
