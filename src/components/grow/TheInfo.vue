<script setup lang="ts">
const bg = new URL('../../assets/images/grow/cardd.png', import.meta.url).href
</script>

<template>
  <div mt6 wfull text-center text-3xl>
    理财
  </div>
  <div class="bg" relative mx7 mt5.5 h68 w80 overflow-hidden rounded-2xl text-white>
    <div ml6 mt8 text-base>
      总余额
    </div>
    <div flex="~" ml6 mt2.8 items-center justify-between text-3xl>
      54329.08
      <div>
        <img :src="bg" mr6.5 h7>
      </div>
    </div>
    <div flex="~" mt11 justify-between>
      <div ml6 text-sm>
        昨日收益
        <div mt3.5 text-center>
          6500
        </div>
      </div>
      <div text-sm>
        累计收益
        <div mt3.5 text-center>
          6500
        </div>
      </div>
      <div mr7 text-sm>
        昨日余额
        <div mt3.5 text-center>
          6500
        </div>
      </div>
    </div>
    <div flex="~" mt-5 justify-around>
      <RouterLink to="/YuEBao/transfer-in">
        <div flex="~" h8.8 w25.6 items-center justify-center border rounded-lg>
          转入
        </div>
      </RouterLink>
      <RouterLink to="/YuEBao/transfer-out">
        <div flex="~" h8.8 w25.6 items-center justify-center border rounded-lg>
          转出
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background: url(../../assets/images/grow/bg.png);
  background-size: cover;
}
</style>
