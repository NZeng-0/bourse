<script setup lang="ts">
const { t } = useI18n()
const route = useRouter()

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10.25 items-center justify-between text-sm'
}

function go() {
  route.push(`/binding/bank`)
}

function back() {
  route.push('/assets')
}
</script>

<template>
  <div h-screen bg-trading>
    <div flex="~" h30 items-center justify-between rounded-b-2xl bg-white px6>
      <img src="../../assets/images/trading/back.png" h10 w10 @click="back()">
      <div class="text-5.5" text-trading-title>
        {{ t('assets.withdrawal.usdt.title') }}
      </div>
      <div h6.5 w11.25 />
    </div>
    <div px6 pt5 class="text-#121826">
      <div :class="getClass()" flex="~">
        <div w="1/2" opacity59>
          {{ t('assets.withdrawal.method') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img src="../../assets/images/assets/USDT.png" h4.25 w4.25>
          <div ml1.25 @click="go()">
            USDT
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <input type="text" :placeholder="t('assets.withdrawal.usdt.wallet_account')" mt3.75 h10.25 w-full rounded-xl px-3.25 text-sm opacity59>
    </div>
    <div flex="~" mt7 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
        {{ t('assets.withdrawal.submit') }}
      </button>
    </div>
  </div>
</template>
