<script setup lang="ts">
import { getUserInfo, submitWithdrawAccount } from '~/api'
import type { binding } from '~/api/types'
import { useUser } from '~/store/useUser'

const userStore = useUser()
const { t } = useI18n()
const router = useRouter()

const bank_info = reactive(userStore.data.bank_info)

const wait = ref(false)
const infos = ref<binding>({
  wallet_address: bank_info?.wallet_address || '',
})

async function after() {
  const { data } = await getUserInfo()
  userStore.data = data.value.data
  router.push('/binding/usdt')
}

async function submit() {
  if (infos.value.wallet_address === '')
    return
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
  await after()
}
</script>

<template>
  <div h-screen bg-trading>
    <TheBindHead :title="t('assets.withdrawal.usdt.title')" />
    <div px6 pt5 class="text-#121826">
      <input
        v-model="infos.wallet_address" type="text" :placeholder="t('assets.withdrawal.usdt.wallet_account')" mt3.75
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
