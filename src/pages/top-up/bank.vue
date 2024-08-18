<script setup lang="ts">
import { submitRecharge } from '~/api'
import type { recharge } from '~/api/types'
import message from '~/components/message'

const route = useRouter()
const { t } = useI18n()

const wait = ref(false)
const infos = ref<recharge>({
  money: '',
  type: 2,
  pay_storageImage: 'storageImage',
  pay_type: 1,
  receive_name: '',
  bank_name: '',
  bank_branch_name: '',
  bank_account: '',
  remark: '',
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

async function onRecharge() {
  if (wait.value) {
    message({
      message: t('assets.tips'),
      duration: 1500,
    })
    return
  }

  wait.value = true

  if (!/^\d+$/.test(infos.value.money)) {
    message({
      message: t('top-up.tips'),
      duration: 1500,
    })
    return
  }
  const { data } = await submitRecharge(infos.value)
  message({
    message: data.value.msg,
    duration: 1500,
  })
  wait.value = false
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
            <input
              v-model="infos.bank_name" :placeholder="t('assets.recharge.bank.bank_of_deposit')" type="text"
              w="4/5"
            >
            <div class="bank" :data-clipboard-text="infos.bank_name" @click="useClipboard('bank')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <input
              v-model="infos.bank_branch_name" :placeholder="t('assets.recharge.bank.account_opening_branch')" type="text"
              w="4/5"
            >
            <div class="address" :data-clipboard-text="infos.bank_branch_name" @click="useClipboard('address')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <input v-model="infos.bank_account" :placeholder="t('assets.recharge.bank.account')" type="text" w="4/5">
            <div class="account" :data-clipboard-text="infos.bank_account" @click="useClipboard('account')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <div :class="getCommonStyle()" flex="~">
            <input v-model="infos.receive_name" :placeholder="t('assets.recharge.bank.name')" type="text" w="4/5">
            <div class="name" :data-clipboard-text="infos.receive_name" @click="useClipboard('name')">
              <img src="../../assets/images/assets/copy.png" h4.25 w4.25>
            </div>
          </div>
          <input
            v-model="infos.money"
            type="text" :placeholder="t('assets.recharge.transfer_amount')" class="border border-#f4f4f4" mt2.5
            h11.25 wfull rounded-xl pl4.75
          >
          <input
            v-model="infos.remark"
            type="text" :placeholder="t('assets.recharge.transfer_remarks')" class="border border-#f4f4f4" mt2.5
            h11.25 wfull rounded-xl pl4.75
          >
          <button class="border border-#f4f4f4" flex="~" mt6.25 h11.25 wfull items-center justify-center rounded-xl>
            <img src="../../assets/images/assets/shot.png" h8.5 w8.5>
            {{ t('assets.recharge.upload_credentials') }}
          </button>
        </div>
      </div>
    </div>
    <div flex="~" mt5.25 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white @click="onRecharge()">
        {{ t('assets.recharge.submit') }}
      </button>
    </div>
  </div>
</template>
