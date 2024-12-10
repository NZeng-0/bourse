<script setup lang="ts">
import {
  countWithdrawDeductMoney,
  getConfigList,
  submitWithdraw,
} from '~/api'
import { useUser } from '~/store/useUser'
import type { withdraw } from '~/api/types'
import type { withdrawMethodType } from '~/types'

const { t } = useI18n()
const route = useRouter()
const user = useUser()
const all = ref(false)
const isBank = ref(false)

const infos = ref<withdraw>({
  withdraw_money: 0,
  type: 1,
  bank_branch_name: '',
  bank_name: '',
  bank_account: '',
  wallet_name: '',
  wallet_address: '',
  operation_pwd: '',
})

const bindUsdt = ref(user.data.bank_info.wallet_address)
const bindBank = ref(user.data.bank_info.bank_account)
const wait = ref(false)
const method = ref<withdrawMethodType[]>()
const withdrawRate = ref(0)

function getCommonStyle() {
  return 'border-box border-##f4f4f4 mt5.5 h11.25 items-center justify-start rounded-xl bg-white pl4.625'
}

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10.25 items-center justify-between text-sm'
}

function go() {
  route.push(`/menu/payment`)
}

async function submit() {
  if (wait.value) {
    showToast({
      message: t('assets.tips'),
    })
    wait.value = false
    return
  }

  wait.value = true

  if (!/^\d+$/.test(infos.value.withdraw_money.toString())) {
    showToast({
      message: t('top-up.tips'),
    })
    wait.value = false
    return
  }

  if (useToNumber(infos.value.withdraw_money).value > useToNumber(user.data.now_money).value) {
    showToast({
      message: t('top-up.no'),
    })
    wait.value = false
    return
  }

  const { data } = await submitWithdraw(infos.value)
  showToast({
    message: data.value.msg,
  })
  wait.value = false
}

onMounted(async () => {
  const { data } = await getConfigList()
  method.value = data.value.data

  const temp = method.value!.filter((e: withdrawMethodType) => e.key === 'withdraw_money_type')[0]

  if (temp.value === 'RMB和USDT')
    all.value = true
  else if (temp.value === 'RMB')
    isBank.value = true

  const bank = user.data.bank_info
  infos.value.bank_name = bank.bank_name
  infos.value.bank_branch_name = bank.bank_branch_name
  infos.value.bank_account = bank.bank_account
  infos.value.wallet_name = bank.wallet_name
  infos.value.wallet_address = bank.wallet_address
})

watchEffect(() => {
  isBank.value ? infos.value.type = 1 : infos.value.type = 2
})

async function getRate() {
  const { data } = await countWithdrawDeductMoney(infos.value.withdraw_money)
  if (data.value.data)
    withdrawRate.value = data.value.data.deduct_money
  else
    withdrawRate.value = 0
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
        <input
          v-model.number="infos.withdraw_money" type="text" :placeholder="t('assets.withdrawal.amount')" opacity69
          @blur="getRate"
        >
      </div>
      <div flex="~" :class="getCommonStyle()">
        <input v-model="infos.operation_pwd" type="password" :placeholder="t('assets.withdrawal.password')" opacity69>
      </div>
      <div mt5.25 pl1 text-sm>
        {{ t('assets.withdrawal.service_charge') }}: {{ withdrawRate }}
      </div>
      <div v-if="bindBank || bindUsdt" mt5 :class="getClass()" flex="~">
        <template v-if="all">
          <div w="1/2" opacity59>
            {{ t('assets.withdrawal.method') }}
          </div>
          <div w="1/2" flex="~" items-center justify-end @click="isBank = !isBank">
            <img v-if="isBank" src="../../assets/images/assets/bank.png" h4.25 w4.25>
            <img v-else src="../../assets/images/assets/USDT.png" h4.25 w4.25>
            <div ml1.25>
              {{ isBank ? t('assets.recharge.bank.use') : 'USDT' }}
            </div>
            <div ml0.75>
              <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
            </div>
          </div>
        </template>
        <template v-else>
          <div w="1/2" opacity59>
            {{ t('assets.withdrawal.method') }}
          </div>
          <div w="1/2" flex="~" items-center justify-end>
            <img v-if="isBank" src="../../assets/images/assets/bank.png" h4.25 w4.25>
            <img v-else src="../../assets/images/assets/USDT.png" h4.25 w4.25>
            <div ml1.25>
              {{ isBank ? t('assets.recharge.bank.use') : 'USDT' }}
            </div>
            <div ml0.75>
              <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
            </div>
          </div>
        </template>
      </div>
      <div flex="~" :class="getCommonStyle()" mt3.25>
        <div v-if="(isBank && !bindBank) || (!isBank && !bindUsdt)" flex="~" wfull items-center justify-center text-sm opacity69>
          {{ t('assets.withdrawal.binding') }}
        </div>
        <div v-else flex="~" wfull items-center justify-between text-sm>
          <div w="1/3">
            {{ t('assets.withdrawal.account') }}
          </div>
          <div w="2/3" overflow-hidden text-left>
            {{ isBank ? infos.bank_account : infos.wallet_address }}
          </div>
        </div>
      </div>
    </div>
    <div flex="~" mt15.25 w-full justify-center>
      <button v-if="(isBank && !bindBank) || (!isBank && !bindUsdt)" h10.5 min-w37.5 rounded-lg bg-btn-select px-1 text-lg text-white @click="go()">
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
