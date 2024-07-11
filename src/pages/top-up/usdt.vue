<script setup lang="ts">
const route = useRouter()

const text = ref('09191278302wixnmhdgabisjng')

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

function go() {
  route.push(`/top-up/bank`)
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
        充值
      </div>
      <RouterLink to="/menu/top-up">
        <div class="border-#4D58C0" flex="~" h6.5 w11.25 items-center justify-center border rounded-xl text-sm>
          记录
        </div>
      </RouterLink>
    </div>
    <div px6 pt5>
      <div :class="getClass()" flex="~">
        <div w="1/2" class="text-#121826">
          请选择支付方式
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img src="../../assets/images/USDT.png" h4.25 w4.25>
          <div class="text-#121826" ml1.25 @click="go()">
            USDT
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
          <input type="text" placeholder="转账金额" class="border border-#f4f4f4" mt2.5 h11.25 wfull rounded-xl pl4.75>
          <input type="text" placeholder="转账附言" class="border border-#f4f4f4" mt2.5 h11.25 wfull rounded-xl pl4.75>
          <button class="border border-#f4f4f4" flex="~" mt2.5 h11.25 wfull items-center justify-center rounded-xl>
            <img src="../../assets/images/assets/shot.png" h8.5 w8.5>
            上传凭证
          </button>
        </div>
      </div>
    </div>
    <div flex="~" mt5.25 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
        提交订单
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
