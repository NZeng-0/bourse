<script setup lang="ts">
import {
  getUserInfo,
  submitWithdrawAccount,
} from '~/api'
import type { binding } from '~/api/types'
import { useUser } from '~/store/useUser'

const { t } = useI18n()
const router = useRouter()
const userStore = useUser()

const bank_info = reactive(userStore.data.bank_info)

const wait = ref(false)
const infos = ref<binding>({
  bank_name: bank_info?.bank_name || '',
  bank_branch_name: bank_info?.bank_branch_name || '',
  bank_account: bank_info?.bank_account || '',
})

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

async function after() {
  const { data } = await getUserInfo()
  userStore.data = data.value.data
  router.push('/binding/bank')
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
  await after()
  wait.value = false
}
</script>

<template>
  <div h-screen bg-trading>
    <TheBindHead :title="t('assets.withdrawal.bank.title')" />
    <div px6 pt5 class="text-#121826">
      <div :class="getClass()" flex="~">
        <div w="1/2" opacity59>
          {{ t('assets.withdrawal.method') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img src="../../assets/images/assets/bank.png" h4.25 w4.25>
          <div ml1.25>
            {{ t('assets.recharge.bank.use') }}
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <input
        type="text" :placeholder="t('assets.withdrawal.bank.name')" mt3.25 h10.25 w-full rounded-xl px-3.25 text-sm
        opacity59
      >
      <input
        v-model="infos.bank_name" type="text" :placeholder="t('assets.withdrawal.bank.bank_name')" mt3.25 h10.25
        w-full rounded-xl px-3.25 text-sm opacity59
      >
      <input
        v-model="infos.bank_branch_name" type="text" :placeholder="t('assets.withdrawal.bank.bank_of_deposit')"
        mt3.25 h10.25 w-full rounded-xl px-3.25 text-sm opacity59
      >
      <input
        v-model="infos.bank_account" type="text" :placeholder="t('assets.withdrawal.bank.bank_card_number')" mt3.25
        h10.25 w-full rounded-xl px-3.25 text-sm opacity59
      >
    </div>
    <div flex="~" mt17 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white @click="submit()">
        {{ t('assets.withdrawal.submit') }}
      </button>
    </div>
  </div>
</template>
