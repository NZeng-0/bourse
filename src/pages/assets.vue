<script setup lang=ts>
const { t } = useI18n()

function getCommonStyle() {
  return 'mr4  rounded-lg bg-white text-#4e53e6'
}
</script>

<template>
  <div>
    <div flex="~ wrap" justify-center pt11>
      <div ml8 mt6 wfull text-left text-3xl>
        {{ t('assets.title') }}
      </div>
      <div class="bg" relative mx7 mt5.5 h50.5 w80 overflow-hidden rounded-2xl>
        <div class="text-#F7F7F7" relative z10 text-xs>
          <div flex="~" ml5 mt5 items-center justify-between>
            <div flex="~" items-center>
              {{ t('assets.amount') }}
              <img src="../assets/images/assets/eye.png" ml2 h6 w6>
            </div>
            <div>
              <img src="../assets/images/assets/aws.png" mr5.5 h4>
            </div>
          </div>
          <div ml5 mt7 text-7.5>
            &#165;5000.12
          </div>
          <div flex="~" ml5 mt13 text-base>
            <RouterLink to="/top-up/usdt">
              <div :class="getCommonStyle()" flex="~" h8.3 min-w18.3 items-center justify-center px2>
                {{ t('assets.recharge.title') }}
              </div>
            </RouterLink>
            <RouterLink to="/withdraw/balance">
              <div :class="getCommonStyle()" flex="~" h8.3 min-w18.3 items-center justify-center px2>
                {{ t('assets.withdrawal.title') }}
              </div>
            </RouterLink>
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
