<script setup lang="ts">
import { submitRecharge } from '~/api'
import type { recharge } from '~/api/types'

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

function go() {
  route.push(`/top-up/usdt`)
}

async function onRecharge() {
  if (wait.value) {
    showToast({
      message: t('assets.tips'),
    })
    return
  }

  wait.value = true

  if (!/^\d+$/.test(infos.value.money)) {
    showToast({
      message: t('top-up.tips'),
    })
    return
  }
  const { data } = await submitRecharge(infos.value)
  showToast({
    message: data.value.msg,
  })
  wait.value = false
}
</script>

<template>
  <div h-screen bg-trading>
    <TheAssetsHead :title="t('assets.recharge.title')" to="/menu/top-up" />
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
        <div pl3.5 pr5.75 text-base>
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
      <Serve />
    </div>
    <div class="custom-fixed" flex="~" mt2.25 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white @click="onRecharge()">
        {{ t('assets.recharge.submit') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-fixed {
  position: fixed;
  bottom: 113px
}
</style>
