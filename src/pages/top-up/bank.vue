<script setup lang="ts">
import type { DropdownMenuInstance } from 'vant'
import { getPayModeList, submitRecharge, upload } from '~/api'
import type { recharge } from '~/api/types'
import { useUser } from '~/store/useUser'
import type { payModelType } from '~/types'

const { t } = useI18n()
const route = useRouter()
const userStore = useUser()
const froms = new FormData()

const menuRef = ref<DropdownMenuInstance>()
const typeRef = ref<DropdownMenuInstance>()
const proof = ref([])
const wait = ref(false)
const { bank_name, bank_branch_name, bank_account } = userStore.data.bank_info
const infos = ref<recharge>({
  money: '',
  type: 2,
  pay_storageImage: '',
  pay_type: 1,
  receive_name: '',
  bank_name,
  bank_branch_name,
  bank_account,
  remark: '',
})

const value1 = t('assets.recharge.bank.use')
const value2 = t('assets.recharge.usdt.use')

const payList = reactive<payModelType[]>([])
const pay = ref<payModelType>()

function choosePay(id: number) {
  const temp = toRaw(payList).find((e: payModelType) => e.id === id)
  pay.value = temp
  typeRef.value?.close()
}

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

function go() {
  route.push(`/top-up/usdt`)
}

async function read(file: any) {
  // "file"表示给后台传的属性名字
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
    return wait.value = false
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
    if (e.type === 2)
      payList.push(e)
  })
})
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
          <div class="text-#121826" ml1.25>
            <van-dropdown-menu ref="menuRef" active-color="#323233">
              <van-dropdown-item :title="value1">
                <van-cell v-model="value2" center text-center :title="value2" @click="go" />
                <van-cell v-model="value1" center text-center text-all-list :title="value1" @click="menuRef!.close()" />
              </van-dropdown-item>
            </van-dropdown-menu>
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
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
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>

      <div mt6 h-full rounded-2.5 bg-white pb4.25 pt3.75>
        <div pl3.5 pr5.75 text-base>
          <div flex="~" class="border border-#f4f4f4" mt6.25 h11.25 wfull items-center rounded-xl pl4.75>
            <div>{{ t('assets.recharge.transfer_amount') }}</div>
            <input v-model="infos.money" text-right type="text">
          </div>
          <div flex="~" class="border border-#f4f4f4" mt6.25 h11.25 wfull items-center rounded-xl pl4.75>
            <div>{{ t('assets.recharge.transfer_remarks') }}</div>
            <input v-model="infos.remark" text-right type="text">
          </div>
          <van-uploader v-model="proof" wfull :after-read="read">
            <div class="border border-#f4f4f4" flex="~" mt6.25 h11.25 wfull items-center justify-center rounded-xl>
              <img src="../../assets/images/assets/shot.png" h8.5 w8.5>
              {{ t('assets.recharge.upload_credentials') }}
            </div>
          </van-uploader>
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

<style>
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

.van-dropdown-menu__item {
  justify-content: right;
}
</style>
