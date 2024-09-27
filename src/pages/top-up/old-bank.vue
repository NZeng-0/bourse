<script setup lang="ts">
const route = useRouter()

const data = ref({
  openingBank: '',
  address: '',
  account: '',
  name: '',
})

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

function getCommonStyle() {
  return 'border-#f4f4f4 mt6.25 h7.5 items-center justify-between border rounded-xl py1.75 pl4.75 pr1.75'
}

function go() {
  route.push(`/top-up/usdt`)
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
          <img src="../../assets/images/assets/bank.png" h4.25 w4.25>
          <div class="text-#121826" ml1.25 @click="go()">
            银行卡
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <div mt6 h-full rounded-2.5 bg-white pb4.25 pt3.75>
        <div mt7.5 pl3.5 pr5.75 text-base>
          <div class="border-#f4f4f4" flex="~" h7.5 items-center justify-between border rounded-xl py1.75 pl4.75 pr1.75>
            <input v-model="data.openingBank" type="text" placeholder="开户银行">
            <div class="bank" :data-clipboard-text="data.openingBank" @click="useClipboard('bank')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <input v-model="data.address" type="text" placeholder="开户网点">
            <div class="address" :data-clipboard-text="data.address" @click="useClipboard('address')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <input v-model="data.account" type="text" placeholder="收款账号">
            <div class="account" :data-clipboard-text="data.account" @click="useClipboard('account')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <input v-model="data.name" type="text" placeholder="收款姓名">
            <div class="name" :data-clipboard-text="data.name" @click="useClipboard('name')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <input type="text" placeholder="转账金额" class="border border-#f4f4f4" mt6.25 h11.25 wfull rounded-xl pl4.75>
          <input type="text" placeholder="转账附言" class="border border-#f4f4f4" mt6.25 h11.25 wfull rounded-xl pl4.75>
          <button class="border border-#f4f4f4" flex="~" mt6.25 h11.25 wfull items-center justify-center rounded-xl>
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
