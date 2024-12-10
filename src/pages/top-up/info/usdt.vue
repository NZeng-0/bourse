<script setup lang="ts">
import type { DropdownMenuInstance } from 'vant'
import { getPayModeList, submitRecharge, upload } from '~/api'
import type { recharge } from '~/api/types'
import { useUser } from '~/store/useUser'
import type { payModelType } from '~/types'

const { t } = useI18n()
const route = useRouter()
const userStore = useUser()
const menuRef = ref<DropdownMenuInstance>()
const typeRef = ref<DropdownMenuInstance>()

const usdt = new URL('~/assets/images/USDT.png', import.meta.url).href
const qrCode = new URL('~/assets/images/assets/qr-code.png', import.meta.url).href
const copy = new URL('~/assets/images/assets/copy.png', import.meta.url).href
const uploadIcon = new URL('~/assets/images/assets/shot.png', import.meta.url).href
const qrBg = {
  backgroundImage: `url(${new URL('~/assets/images/assets/qr-bg.png', import.meta.url).href})`,
}

const proof = ref([])
const froms = new FormData()

const { wallet_name, wallet_address } = userStore.data.bank_info
const infos = ref<recharge>({
  money: '',
  type: 2,
  pay_storageImage: '',
  pay_type: 2,
  wallet_name,
  wallet_address,
  remark: '',
})

const wait = ref(false)

const value1 = t('assets.recharge.usdt.use')
const value2 = t('assets.recharge.bank.use')
const payList = reactive<payModelType[]>([])
const pay = ref<payModelType>({
  id: 0,
  bank_user_name: '',
  bank_account: '',
  bank_branch_name: '',
  pay_name: '',
  type: 0,
  status: 0,
  link_url: '',
  explain: '',
  qrcode: '',
  create_time: '',
})

function choosePay(id: number) {
  const temp = toRaw(payList).find((e: payModelType) => e.id === id) as payModelType
  pay.value = temp
  typeRef.value?.close()
}

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

function go() {
  route.push(`/top-up/info/bank`)
}

async function read(file: any) {
  froms.append('file', file.file)
  infos.value.pay_storageImage = await onUpload()
}

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

  if (!infos.value.pay_storageImage) {
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
  if (data.value.code === 200)
    route.push('/menu/top-up')
}

onMounted(async () => {
  const { data } = await getPayModeList()
  data.value.data.forEach((e: payModelType) => {
    if (e.type === 1)
      payList.push(e)
  })
})
</script>

<template>
  <TheAssetsHead :title="t('assets.recharge.title')" to="/menu/top-up" />
  <div h-screen overflow-y-scroll bg-trading>
    <div px6 pt3>
      <div :class="getClass()" flex="~">
        <div w="1/2" class="text-#121826">
          {{ t('assets.recharge.method') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img :src="usdt" h4.25 w4.25>
          <div class="text-#121826" ml1.25>
            <van-dropdown-menu ref="menuRef" active-color="#323233">
              <van-dropdown-item :title="value1">
                <van-cell v-model="value1" center text-center :title="value1" @click="menuRef!.close()" />
                <van-cell v-model="value2" center text-center :title="value2" @click="go" />
              </van-dropdown-item>
            </van-dropdown-menu>
          </div>
          <div ml0.75>
            <img src="../../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>

      <div mt5 :class="getClass()" flex="~">
        <div w="1/2" class="text-#121826">
          {{ t('assets.recharge.type') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <div ml1.25 w-full>
            <van-dropdown-menu ref="typeRef" active-color="#323233">
              <van-dropdown-item :title="pay?.pay_name">
                <van-cell v-for="(e, key) in payList" :key :title="e.pay_name" text-center @click="choosePay(e.id)" />
              </van-dropdown-item>
            </van-dropdown-menu>
          </div>
          <div ml0.75>
            <img src="../../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>

      <div mt6 h-full rounded-2.5 bg-white pb4.25 pt2>
        <div flex="~" align-center wfull justify-center>
          <div class="bg" :style="qrBg" h57.25 w57.35 flex="~" items-center justify-center>
            <img :src="pay.qrcode || qrCode" h47.5 w47.5>
          </div>
        </div>
        <div mt7.5 pl3.5 pr5.75 text-base>
          <div class="border-#f4f4f4" flex="~" h7.5 items-center justify-between border rounded-xl py1.75 pl4.75 pr1.75>
            <input v-model="pay.link_url" readonly class="copy w-90%" type="text">
            <div class="bank" :data-clipboard-text="pay.link_url" @click="useClipboard('bank', t('copySuccess'))">
              <img :src="copy" h4.25 w4.25>
            </div>
          </div>

          <div flex="~" class="border border-#f4f4f4" mt6.25 h11.25 wfull items-center rounded-xl pl4.75>
            <div>{{ t('assets.recharge.transfer_amount') }}</div>
            <input v-model="infos.money" text-right type="text">
          </div>
          <div flex="~" class="border border-#f4f4f4" mt6.25 h11.25 wfull items-center rounded-xl pl4.75>
            <div>{{ t('assets.recharge.transfer_remarks') }}</div>
            <input v-model="infos.remark" text-right type="text">
          </div>

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
    <div h50 />
  </div>
</template>

<style>
.bg {
  background-size: cover;
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
  margin-top: 0.714rem;
}

.van-image__img {
  margin-top: 0.714rem;
}

.van-dropdown-menu__title--down:after {
  display: none;
}

.van-dropdown-menu__title:after {
  display: none;
}

.van-dropdown-menu__bar {
  height: none;
  background: none;
  box-shadow: none;
}

.copy {
  color: #767676;
}
</style>
