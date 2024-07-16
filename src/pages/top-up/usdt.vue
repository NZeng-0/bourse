<script setup lang="ts">
const route = useRouter()
const { t } = useI18n()

const text = ref('09191278302wixnmhdgabisjng')

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

function go() {
  route.push(`/top-up/bank`)
}
</script>

<template>
  <div h-screen bg-trading>
    <TheAssetsHead :title="t('assets.recharge.title')" back="/assets" to="/menu/top-up" />
    <div px6 pt5>
      <div :class="getClass()" flex="~">
        <div w="1/2" class="text-#121826">
          {{ t('assets.recharge.method') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img src="../../assets/images/USDT.png" h4.25 w4.25>
          <div class="text-#121826" ml1.25 @click="go()">
            {{ t('assets.recharge.usdt.use') }}
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <div mt6 h-full rounded-2.5 bg-white pb4.25 pt3.75>
        <div flex="~" align-center wfull justify-center>
          <div class="bg" h57.25 w57.35 flex="~" items-center justify-center>
            <img src="../../assets/images/assets/qr-code.png" h47.5 w47.5>
          </div>
        </div>
        <div mt7.5 pl3.5 pr5.75 text-base>
          <div class="border-#f4f4f4" flex="~" h7.5 items-center justify-between border rounded-xl py1.75 pl4.75 pr1.75>
            <div>
              {{ text }}
            </div>
            <div class="copy" :data-clipboard-text="text" @click="useClipboard('copy')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <input
            type="text" :placeholder="t('assets.recharge.transfer_amount')" class="border border-#f4f4f4" mt2.5
            h11.25 wfull rounded-xl pl4.75
          >
          <input
            type="text" :placeholder="t('assets.recharge.transfer_remarks')" class="border border-#f4f4f4" mt2.5
            h11.25 wfull rounded-xl pl4.75
          >
          <button class="border border-#f4f4f4" flex="~" mt2.5 h11.25 wfull items-center justify-center rounded-xl>
            <img src="../../assets/images/assets/shot.png" h8.5 w8.5>
            {{ t('assets.recharge.upload_credentials') }}
          </button>
        </div>
      </div>
    </div>
    <div flex="~" mt5.25 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
        {{ t('assets.recharge.submit') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background: url(../../assets/images/assets/qr-bg.png);
  background-size: cover;
}
</style>
