<script setup lang="ts">
import { getTotalMoneyAndYesterdayMoney, getUserInfo, transferIn } from '~/api'
import type { userTypes } from '~/store/useUser'
import type { YuEBao } from '~/types'
import { useUser } from '~/store/useUser'
import { useYuEBao } from '~/store/useYuEBao'
import { useMoney } from '~/store/useMoney'

const { t } = useI18n()
const route = useRouter()

const moneyStore = useMoney()
const userStore = useUser()
const YuEBaoStore = useYuEBao()
const user = shallowRef<userTypes>()
const YuEBaoData = shallowRef<YuEBao>()

const inMoney = ref('')

function back() {
  route.back()
}

async function onPlace() {
  if (inMoney.value === '') {
    showToast({
      message: t('YuEBao.input'),
    })
    return
  }

  if (Number.parseInt(inMoney.value) < 1) {
    showToast({
      message: t('YuEBao.less'),
    })
    return
  }

  if (useToNumber(inMoney.value).value > useToNumber(user.value!.now_money).value) {
    showToast({
      message: t('YuEBao.grater'),
    })
    return
  }

  const { data } = await transferIn(inMoney.value)
  showToast({
    message: data.value.msg,
  })

  // 金额置空
  inMoney.value = ''
  // 成功后更新 store
  await onRefresh()
}

async function onRefresh() {
  const { data } = await getUserInfo()
  userStore.data = data.value.data
  await updateMoney()
  init()
}

async function updateMoney() {
  const { data } = await getTotalMoneyAndYesterdayMoney()
  moneyStore.money = data.value.data
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
            {{ user?.now_money }}
          </div>
        </div>
        <div mt1.25 text-base class="text-#121826">
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              {{ t('yuEBao') }}
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                {{ moneyStore.money.total_money }}
              </div>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <input v-model="inMoney" type="text" w="2/3" :placeholder="t('fortune.transfer_in.amount')" opacity68>
          </div>
          <div mt3.5 h9.5 />
        </div>
        <div flex="~" mt8.75 items-center justify-center>
          <button h10.5 min-w37.5 rounded-lg bg-btn-select px1 text-lg text-white @click="onPlace">
            {{ t('fortune.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
