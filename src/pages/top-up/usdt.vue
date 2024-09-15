<script setup lang="ts">
import { submitRecharge } from '~/api'
import type { recharge } from '~/api/types'
import message from '~/components/message'

const route = useRouter()
const { t } = useI18n()

const text = ref('09191278302wixnmhdgabisjng')
const wait = ref(false)
const infos = ref<recharge>({
  money: '',
  type: 2,
  pay_storageImage: 'storageImage',
  pay_type: 2,
  wallet_name: text.value,
  wallet_address: text.value,
  remark: '',
})

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

function go() {
  route.push(`/top-up/bank`)
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
    <TheAssetsHead :title="t('assets.recharge.title')" to="/menu/top-up" />
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
        <div pl3.5 pr5.75 text-base>
          <input
            v-model="infos.money" type="text" :placeholder="t('assets.recharge.transfer_amount')"
            class="border border-#f4f4f4" mt2.5 h11.25 wfull rounded-xl pl4.75
          >
          <button class="border border-#f4f4f4" flex="~" mt2.5 h11.25 wfull items-center justify-center rounded-xl>
            <img src="../../assets/images/assets/shot.png" h8.5 w8.5>
            {{ t('assets.recharge.upload_credentials') }}
          </button>
        </div>
      </div>
      <Serve />
    </div>

    <div class="custom-fixed" flex="~" mt5.25 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white @click="onRecharge()">
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

.custom-fixed {
  position: fixed;
  bottom: 113px
}
</style>
