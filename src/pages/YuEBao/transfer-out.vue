<script setup lang="ts">
import { outMoneyInvestment } from '~/api'
import type { userTypes } from '~/store/useUser'
import { useUser } from '~/store/useUser'
import { useMoney } from '~/store/useMoney'

const userStore = useUser()

const route = useRouter()
const { t } = useI18n()
const user = shallowRef<userTypes>()
const moneyStore = useMoney()
const outMoney = ref('')

function back() {
  route.back()
}

function all() {
  outMoney.value = moneyStore.money.total_money
}

async function out() {
  if (outMoney.value === '') {
    showToast({
      message: t('YuEBao.input'),
    })
    return
  }

  if (Number.parseInt(outMoney.value) < 1) {
    showToast({
      message: t('YuEBao.less'),
    })
    return
  }

  if (outMoney.value > moneyStore.money.total_money) {
    showToast({
      message: t('YuEBao.grater'),
    })
    return
  }

  const { data } = await outMoneyInvestment({
    money: outMoney.value,
  })
  showToast({
    message: data.value.msg,
  })

  // 成功后更新 store
  // TODO 转出更改后更新
  await onRefresh()
}

function init() {
  user.value = userStore.data
  // YuEBaoData.value = YuEBaoStore.data
}

onMounted(() => {
  init()
})
</script>

<template>
  <div h-screen bg-trading>
    <div flex="~" h27 items-center justify-between rounded-b-2xl bg-white px6>
      <img src="../../assets/images/trading/back.png" h10 w10 @click="back()">
      <div class="text-5.5" text-trading-title>
        {{ t('fortune.transfer_out.title') }}
      </div>
      <div h6.5 w11.25 />
    </div>
    <div mt2.75 px6>
      <div h76.75 rounded-2xl bg-white px5>
        <div flex="~" h12.75 items-center justify-between border-b text-base class="text-#121826">
          <div>
            {{ t('fortune.current_balance') }}
          </div>
          <div>
            {{ moneyStore.money.total_money }}
          </div>
        </div>
        <div mt1.25 text-base class="text-#121826">
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              {{ t('fortune.transfer_out.transferable_balance') }}
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                {{ moneyStore.money.total_money }}
              </div>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              {{ t('fortune.transfer_out.title') }}
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                {{ t('fortune.transfer_out.to') }}
              </div>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <input v-model="outMoney" type="text" w="2/3" :placeholder="t('fortune.transfer_in.amount')" opacity68>
            <div w="1/3" mr.5 pl2.5 text-right text-sm @click="all()">
              <span h-full w-1 border-l pl3 opacity68 />
              {{ t('fortune.all') }}
            </div>
          </div>
        </div>
        <div flex="~" mt8.75 items-center justify-center>
          <button h10.5 min-w37.5 rounded-lg bg-btn-select px1 text-lg text-white @click="out()">
            {{ t('fortune.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
