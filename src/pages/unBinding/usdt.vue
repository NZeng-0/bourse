<script setup lang="ts">
import { submitWithdrawAccount } from '~/api'
import type { binding } from '~/api/types'
import { useUser } from '~/store/useUser'

const userStore = useUser()
const { t } = useI18n()
const route = useRouter()

// {
//     "id": 1,
//     "uid": 1,
//     "bank_user_name": "",
//     "bank_name": "招商银行2",
//     "bank_branch_name": "西安支行2",
//     "bank_account": "6132",
//     "wallet_name": "钱包名称",
//     "wallet_address": "钱包地址",
//     "ip": null,
//     "create_time": "2024-06-24 14:49:27"
// }

const bank_info = reactive(userStore.data.bank_info)

const wait = ref(false)
const infos = ref<binding>({
  wallet_address: bank_info?.wallet_address || '',
})

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10.25 items-center justify-between text-sm'
}

function go() {
  route.push(`/binding/bank`)
}

async function submit() {
  if (wait.value) {
    showToast({
      message: t('assets.tips'),
    })
    return
  }

  wait.value = true
  const { data } = await submitWithdrawAccount(infos.value)
  showToast({
    message: data.value.msg,
  })
  wait.value = false
}
</script>

<template>
  <div h-screen bg-trading>
    <TheBindHead :title="t('assets.withdrawal.usdt.title')" />
    <div px6 pt5 class="text-#121826">
      <div :class="getClass()" flex="~">
        <div w="1/2" opacity59>
          {{ t('assets.withdrawal.method') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img src="../../assets/images/assets/USDT.png" h4.25 w4.25>
          <div ml1.25 @click="go()">
            USDT
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <input
        v-model="infos.wallet_address" :readonly="bank_info.wallet_address !== ''" type="text" :placeholder="t('assets.withdrawal.usdt.wallet_account')" mt3.75
        h10.25 w-full rounded-xl px-3.25 text-sm opacity59
      >
    </div>
    <div flex="~" mt7 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white @click="submit()">
        {{ t('assets.withdrawal.submit') }}
      </button>
    </div>
  </div>
</template>
