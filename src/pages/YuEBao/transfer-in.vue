<script setup lang="ts">
import { buyMoneyInvestment, getUserInfo } from '~/api'
import type { userTypes } from '~/store/useUser'
import type { YuEBao } from '~/types'
import { useUser } from '~/store/useUser'
import { useYuEBao } from '~/store/useYuEBao'
import message from '~/components/message'

const { t } = useI18n()
const route = useRouter()

const userStore = useUser()
const YuEBaoStore = useYuEBao()
const user = shallowRef<userTypes>()
const YuEBaoData = shallowRef<YuEBao>()
const buy = ref({
  money: '',
  id: 0,
})

function back() {
  route.back()
}

async function onPlace() {
  buy.value.id = YuEBaoData.value!.id

  if (buy.value.money === '') {
    message({
      message: t('YuEBao.input'),
      duration: 1500,
    })
    return
  }

  if (Number.parseInt(buy.value.money) < 1) {
    message({
      message: t('YuEBao.less'),
      duration: 1500,
    })
    return
  }

  if (buy.value.money > user.value!.now_money) {
    message({
      message: t('YuEBao.grater'),
      duration: 1500,
    })
    return
  }

  const { data } = await buyMoneyInvestment(buy.value)
  message({
    message: data.value.msg,
    duration: 1500,
  })

  // 成功后更新 store
  await onRefresh()
}

async function onRefresh() {
  const { data } = await getUserInfo()
  userStore.data = data.value.data
  init()
}

function init() {
  user.value = userStore.data
  YuEBaoData.value = YuEBaoStore.data
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
        {{ t('fortune.transfer_in.title') }}
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
            {{ user?.investment_money }}
          </div>
        </div>
        <div mt1.25 text-base class="text-#121826">
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              {{ t('fortune.transfer_in.plan') }}
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                {{ YuEBaoData?.name }}
              </div>
              <img src="../../assets/images/me/menu/right.png" h3.5 w2>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              {{ t('fortune.annualized_income') }}
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                {{ YuEBaoData?.rate }}%
              </div>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <input v-model="buy.money" type="text" w="2/3" :placeholder="t('fortune.transfer_in.amount')" opacity68>
            <div w="1/3" mr.5 pl2.5 text-right text-sm @click="() => buy.money = user!.now_money">
              <span h-full w-1 border-l pl3 opacity68 />
              {{ t('fortune.all') }}
            </div>
          </div>
        </div>
        <div flex="~" mt8.75 items-center justify-center>
          <button h10.5 min-w37.5 rounded-lg bg-btn-select px1 text-lg text-white @click="onPlace()">
            {{ t('fortune.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
