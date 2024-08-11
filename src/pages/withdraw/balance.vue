<script setup lang="ts">
import { submitWithdraw } from '~/api'
import { useUser } from '~/store/useUser'
import message from '~/components/message'
import type { withdraw } from '~/api/types'

const route = useRouter()
const { t } = useI18n()
const user = useUser()
const infos = ref<withdraw>({
  withdraw_money: '',
  type: 1,
  bank_branch_name: '',
  bank_name: '',
  bank_account: '',
})
const banding = ref(user.data.bank_info !== undefined)
const wait = ref(false)

function getCommonStyle() {
  return 'border-box border-##f4f4f4 mt5.5 h11.25 items-center justify-start rounded-xl bg-white pl4.625'
}

function go() {
  route.push(`/binding/usdt`)
}

async function submit() {
  if (wait.value) {
    message({
      message: '请勿重复提交',
      duration: 1500,
    })
    return
  }

  wait.value = true

  if (!/^\d+$/.test(infos.value.withdraw_money)) {
    message({
      message: '请输入0以上的数字',
      duration: 1500,
    })
    return
  }

  if (infos.value.withdraw_money > user.data.now_money) {
    message({
      message: '余额不足',
      duration: 1500,
    })
    return
  }

  if (!banding.value) {
    go()
    return
  }

  await submitWithdraw(infos.value)

  const { data } = await submitWithdraw(infos.value)
  message({
    message: data.value.msg,
    duration: 1500,
  })
  wait.value = false
}
</script>

<template>
  <div h-screen bg-trading>
    <TheAssetsHead :title="t('assets.withdrawal.title')" back="/assets" to="/menu/withdraw" />
    <div px7 pt5 class="text-#030319" text-base>
      <div flex="~" h20.5 items-center justify-between class="rounded-4.5" bg-white p4>
        <div>
          {{ t('assets.withdrawal.balance') }}
        </div>
        <div mr7.75>
          {{ user.data.now_money }}
        </div>
      </div>
      <div flex="~" :class="getCommonStyle()">
        <input v-model="infos.withdraw_money" type="text" :placeholder="t('assets.withdrawal.amount')" opacity69>
      </div>
      <div flex="~" :class="getCommonStyle()">
        <input type="passwrod" :placeholder="t('assets.withdrawal.password')" opacity69>
      </div>
      <div mt5.25 pl4.625 text-sm>
        {{ t('assets.withdrawal.service_charge') }}: {{ user.data.user_withdraw_rate }}
      </div>
      <div flex="~" :class="getCommonStyle()" mt3.25>
        <div v-if="!banding" flex="~" wfull items-center justify-center text-sm opacity69>
          {{ t('assets.withdrawal.binding') }}
        </div>
        <div v-else flex="~" wfull items-center justify-between text-sm>
          <div w="1/3">
            {{ t('assets.withdrawal.account') }}
          </div>
          <div w="2/3" text-left>
            {{ user.data.bank_info.bank_account }}
          </div>
        </div>
      </div>
    </div>
    <div flex="~" mt32.25 w-full justify-center>
      <button v-if="!banding" h10.5 min-w37.5 rounded-lg bg-btn-select px-1 text-lg text-white @click="go()">
        {{ t('assets.withdrawal.btn') }}
      </button>
      <button v-else h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white @click="submit()">
        {{ t('assets.withdrawal.title') }}
      </button>
    </div>
    <div class="text-#030319" mt21.75 px7 text-sm opacity52>
      <div>
        1. {{ t('assets.withdrawal.tips.1') }}: 100~500000000
      </div>
      <div>
        2. {{ t('assets.withdrawal.tips.2') }}: 09.30~21.30
      </div>
      <div>
        3. {{ t('assets.withdrawal.tips.3') }}
      </div>
    </div>
  </div>
</template>
