<script setup lang="ts">
import { submitRecharge, upload } from '~/api'
import type { recharge } from '~/api/types'
import { useUser } from '~/store/useUser'

const { t } = useI18n()
const route = useRouter()
const userStore = useUser()

const text = ref('09191278302wixnmhdgabisjng')
const usdt = new URL('~/assets/images/USDT.png', import.meta.url).href
const right = new URL('~/assets/images/me/menu/right.png', import.meta.url).href
const qrCode = new URL('~/assets/images/assets/qr-code.png', import.meta.url).href
const copy = new URL('~/assets/images/assets/copy.png', import.meta.url).href
const uploadIcon = new URL('~/assets/images/assets/shot.png', import.meta.url).href
const qrBg = {
  backgroundImage: `url(${new URL('~/assets/images/assets/qr-bg.png', import.meta.url).href})`,
}

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

function go() {
  route.push(`/top-up/info/bank`)
}

const proof = ref([])
const froms = new FormData()

function read(file: any) {
  froms.append('file', file.file)
}

const bank = userStore.data.bank_info
const infos = ref<recharge>({
  money: '',
  type: 2,
  pay_storageImage: '',
  pay_type: 2,
  wallet_name: bank.wallet_name,
  wallet_address: bank.wallet_address,
  remark: '',
})

const wait = ref(false)

async function onUpload() {
  const { data, error } = await upload(froms)
  if (error.value)
    return null
  else
    return data.value.data.file
}

function successAfter() {
  proof.value = []
  froms.append('file', ' ')
  infos.value.money = ''
  infos.value.remark = ''
}

async function onRecharge() {
  if (wait.value) {
    showToast({
      message: t('assets.tips'),
    })
    return wait.value = false
  }

  wait.value = true

  if (!/^\d+$/.test(infos.value.money)) {
    showToast({
      message: t('top-up.tips'),
    })
    return wait.value = false
  }

  infos.value.pay_storageImage = await onUpload()
  if (infos.value.pay_storageImage === null) {
    showToast({
      message: t('top-up.img'),
    })
    wait.value = false
    return
  }
  const { data } = await submitRecharge(infos.value)
  showToast({
    message: data.value.msg,
  })
  wait.value = false
  successAfter()
  route.push('/menu/top-up')
}
</script>

<template>
  <div h-screen bg-trading>
    <TheAssetsHead :title="t('assets.recharge.title')" to="/menu/top-up" />
    <div px6 pt3>
      <div :class="getClass()" flex="~">
        <div w="1/2" class="text-#121826">
          {{ t('assets.recharge.method') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img :src="usdt" h4.25 w4.25>
          <div class="text-#121826" ml1.25 @click="go()">
            {{ t('assets.recharge.usdt.use') }}
          </div>
          <div ml0.75>
            <img :src="right" h4.25 w4.25>
          </div>
        </div>
      </div>
      <div mt6 h-full rounded-2.5 bg-white pb4.25 pt2>
        <div flex="~" align-center wfull justify-center>
          <div class="bg" :style="qrBg" h57.25 w57.35 flex="~" items-center justify-center>
            <img :src="qrCode" h47.5 w47.5>
          </div>
        </div>
        <div mt7.5 pl3.5 pr5.75 text-base>
          <div class="border-#f4f4f4" flex="~" h7.5 items-center justify-between border rounded-xl py1.75 pl4.75 pr1.75>
            <div>
              {{ text }}
            </div>
            <div class="copy" :data-clipboard-text="text" @click="useClipboard('copy')">
              <img :src="copy" h4.25 w4.25>
            </div>
          </div>
          <input
            v-model="infos.money" type="text" :placeholder="t('assets.recharge.transfer_amount')"
            class="border border-#f4f4f4" mt2.5 h11.25 wfull rounded-xl pl4.75
          >
          <input
            v-model="infos.remark" type="text" :placeholder="t('assets.recharge.transfer_remarks')"
            class="border border-#f4f4f4" mt2.5 h11.25 wfull rounded-xl pl4.75
          >
          <van-uploader v-model="proof" wfull :after-read="read">
            <div class="border border-#f4f4f4" flex="~" mt3 h11.25 wfull items-center justify-center rounded-xl>
              <img :src="uploadIcon" h8.5 w8.5>
              {{ t('assets.recharge.upload_credentials') }}
            </div>
          </van-uploader>
        </div>
      </div>
    </div>
    <div flex="~" mt5.25 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white @click="onRecharge">
        {{ t('assets.recharge.submit') }}
      </button>
    </div>
  </div>
</template>

<style>
.bg {
  background-size: cover;
}

.custom-fixed {
  position: fixed;
  bottom: 113px
}

.van-uploader__wrapper {
  width: 100% !important;
}

.van-uploader__input {
  width: 100% !important;
}

.van-uploader__input-wrapper {
  width: 100%;
}

.van-uploader__preview-delete {
  margin-top: 10px
}

.van-image__img {
  margin-top: 10px;
}
</style>
