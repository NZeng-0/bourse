<script setup lang="ts">
const route = useRouter()
const { t } = useI18n()

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
        {{ t('assets.recharge.title') }}
      </div>
      <RouterLink to="/menu/top-up">
        <div class="border-#4D58C0" flex="~" h6.5 w11.25 items-center justify-center border rounded-xl text-sm>
          {{ t('assets.head') }}
        </div>
      </RouterLink>
    </div>
    <div px6 pt5>
      <div :class="getClass()" flex="~">
        <div w="1/2" class="text-#121826">
          {{ t('assets.recharge.method') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img src="../../assets/images/assets/bank.png" h4.25 w4.25>
          <div class="text-#121826" ml1.25 @click="go()">
            {{ t('assets.recharge.bank.use') }}
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <div mt6 h-full rounded-2.5 bg-white pb4.25 pt3.75>
        <div mt7.5 pl3.5 pr5.75 text-base>
          <div class="border-#f4f4f4" flex="~" h7.5 items-center justify-between border rounded-xl py1.75 pl4.75 pr1.75>
            <div>
              {{ t('assets.recharge.bank.bank_of_deposit') }}
            </div>
            <input v-model="data.openingBank" type="text">
            <div class="bank" :data-clipboard-text="data.openingBank" @click="useClipboard('bank')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <div>
              {{ t('assets.recharge.bank.account_opening_branch') }}
            </div>
            <input v-model="data.address" type="text">
            <div class="address" :data-clipboard-text="data.address" @click="useClipboard('address')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <div>
              {{ t('assets.recharge.bank.account') }}
            </div>
            <input v-model="data.account" type="text">
            <div class="account" :data-clipboard-text="data.account" @click="useClipboard('account')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <div>
              {{ t('assets.recharge.bank.name') }}
            </div>
            <input v-model="data.name" type="text">
            <div class="name" :data-clipboard-text="data.name" @click="useClipboard('name')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <input type="text" :placeholder="t('assets.recharge.transfer_amount')" class="border border-#f4f4f4" mt2.5 h11.25 wfull rounded-xl pl4.75>
          <input type="text" :placeholder="t('assets.recharge.transfer_remarks')" class="border border-#f4f4f4" mt2.5 h11.25 wfull rounded-xl pl4.75>
          <button class="border border-#f4f4f4" flex="~" mt6.25 h11.25 wfull items-center justify-center rounded-xl>
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
