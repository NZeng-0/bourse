<script setup lang=ts>

</script>

<template>
  <div>
    <div flex="~ wrap" justify-center pt11>
      <div ml8 mt6 wfull text-left text-3xl>
        我的钱包
      </div>
      <div class="bg" relative mx7 mt5.5 h50.5 w80 overflow-hidden rounded-2xl>
        <div class="text-#F7F7F7" relative z10 text-xs>
          <div flex="~" ml5 mt5 items-center justify-between>
            <div flex="~" items-center>
              总余额
              <img src="../assets/images/assets/eye.png" ml2 h6 w6>
            </div>
            <div>
              <img src="../assets/images/assets/aws.png" mr5.5 h4>
            </div>
          </div>
          <div ml5 mt7 text-7.5>
            &#165;5000.12
          </div>
          <div flex="~" ml5 mt13>
            <div mr4 flex="~" h8.3 w18.3 items-center justify-center rounded-lg bg-white text-base class="text-#4e53e6">
              重置
            </div>
            <div mr4 flex="~" h8.3 w18.3 items-center justify-center rounded-lg bg-white text-base class="text-#4e53e6">
              提现
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter :index="1" />
  </div>
</template>

<style scoped>
.bg {
  background: url(../assets/images/assets/bg.png);
  background-size: cover;
}
</style>
