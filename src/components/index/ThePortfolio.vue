<script setup lang="ts">

</script>

<template>
  <div flex="~ gap2 wrap" mt-8 items-center justify-between>
    <div text-lg font-normal>
      股市交易
    </div>
    <div text-sm text-all-list font-normal>
      所有列表
    </div>
  </div>
  <ThePortfolioList />
  <div mt-5.5 text-left text-lg>
    数据分析
  </div>
  <TheList />
</template>
