<script setup lang="ts">
import { countProductEarningsMoney, getUserInfo, submitProductOrder } from '~/api'
import { useUser } from '~/store/useUser'
import { useConf } from '~/store/useConf'
import type { configlist, earningsMoney } from '~/types'
import { useFund } from '~/hook'
import type { indexProduct, timeList } from '~/api/types'

const id = useToNumber(useRoute('/buy/up/[key]').params.key).value

const {
  actuator,
} = useFund()

const { t } = useI18n()
const route = useRouter()

const product = ref<indexProduct>()

const conf = useConf()
const user = useUser()
const timeIndex = ref(-1)
const moneyIndex = ref(-1)
const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
const times = ref<timeList[]>()
const moneyList = ref()
const earning = ref(0)
const create_order_max_money = ref()
const create_order_min_money = ref()
const profit_status = ref()
const low_status = ref()
const auth = conf.data.find((item: configlist) => {
  return item.key === 'auth_open'
}).value === '1'

const submitData = ref<earningsMoney>({
  product_id: id,
  money: 0,
  type: 1,
  scheme_id: -1,
})

async function selectTime(index: number, profit: string, id: number) {
  if (timeIndex.value === index) {
    submitData.value.scheme_id = -1
    timeIndex.value = -1
  }
  else {
    submitData.value.scheme_id = id
    timeIndex.value = index
    // if (submitData.value.money !== 0)
    // await getEarnings()
  }
  times.value?.forEach((e: timeList) => {
    create_order_max_money.value = e.max_invest_money
    create_order_min_money.value = e.min_invest_money
  })
}

function getTimeStyle(time: number) {
  return timeIndex.value === time
    ? 'bg-btn-select text-white rounded-lg mt4 p2.5'
    : 'bg-white rounded-lg mt4 p2.5'
}

async function selectMoney(money: number, index: number) {
  if (moneyIndex.value === index) {
    moneyIndex.value = -1
    submitData.value.money = 0
  }
  else {
    submitData.value.money = money
    moneyIndex.value = index
    // if (submitData.value.scheme_id !== -1)
    //   await getEarnings()
  }
}

async function getEarnings() {
  const { data } = await countProductEarningsMoney(submitData.value)
  earning.value = data.value.data.predict_earnings_money

  if (product.value!.mode_type === 1)
    return

  times.value?.forEach((e: timeList) => {
    if (e.id === submitData.value.scheme_id) {
      e.loss_rate = data.value.data.loss_rate
      e.profit_rate = data.value.data.profit_rate
    }
  })
}

function getMoneyStyle(index: number) {
  return moneyIndex.value === index
    ? ' px0.5 m0.5 h8.5 min-w12.5 items-center justify-center bg-btn-select text-white rounded-xl'
    : ' px0.5 m0.5 h8.5 min-w12.5 items-center justify-center bg-white rounded-xl'
}

function subClass() {
  return 'text-#707070 px-2 ml-6.8 h8.5 w25 rounded-xl bg-white text-lg'
}

function back() {
  route.back()
}

// function toNumber(value: any) {
//   return Number.parseInt(value)
// }

function all() {
  submitData.value.money = product.value!.usable_money || 0
}

async function submit() {
  if (submitData.value.scheme_id === -1) {
    return showToast({
      message: `${t('buy_tips.time')}`,
    })
  }

  // if (toNumber(submitData.value.money) < toNumber(create_order_min_money.value)) {
  //   return showToast({
  //     message: `${t('buy_tips.min')}${create_order_min_money.value}`,
  //   })
  // }

  // if (toNumber(submitData.value.money) > toNumber(create_order_max_money.value)) {
  //   return showToast({
  //     message: `${t('buy_tips.max')}${create_order_max_money.value}`,
  //   })
  // }

  if (auth && user.data.auth_status !== 1) {
    return showToast({
      message: `${t('buy_tips.auth')}`,
    })
  }

  const { data } = await submitProductOrder(submitData.value)
  showToast({
    message: data.value.msg,
  })
  if (data.value.code !== 200)
    return
  route.replace('/menu/order/to-hold')
}

async function updateUserInfo() {
  const { data } = await getUserInfo()
  user.data = data.value.data
}

watch(() => submitData.value.money, async () => {
  if (submitData.value.scheme_id === -1)
    return
  if (submitData.value.money <= 0)
    return
  await getEarnings()
})

watch(() => submitData.value.scheme_id, async () => {
  if (submitData.value.money !== 0)
    await getEarnings()
})

onMounted(async () => {
  await updateUserInfo()
  product.value = await actuator(id, '1min')
  times.value = product.value?.time_scheme_list
  setTimeout(() => {
    moneyList.value = product.value?.investment_money_list
  }, 1000)
  profit_status.value = product.value!.profit_status
  low_status.value = product.value!.low_status
})
</script>

<template>
  <div flex="~" h16 items-center justify-between rounded-b-2xl bg-white px4>
    <img :src="backUrl" h6.25 w6.25 @click="back()">
    <div text-xl text-trading-title>
      {{ t('trading.buy_up') }}
    </div>
    <div h10 w10 />
  </div>
  <div hscreen overflow-x-scroll bg-trading>
    <div mt5 px3>
      <div text-lg>
        {{ t('trading.buy.settlement_time') }}
      </div>
      <div flex="~ wrap" justify-between>
        <!-- h15 -->
        <template v-for="(e, key) in times" :key>
          <div w="48%" flex="~ wrap" :class="getTimeStyle(key)" @click="selectTime(key, e.profit_rate, e.id)">
            <div wfull flex="~" justify-center>
              <div text-2xl font-black leading-6 class="font-['Alibaba-PuHuiTi']">
                {{ e.time }}
              </div>
              <span self-end text-xl>s</span>
            </div>
            <div flex="~" mt4 wfull justify-between text-sm :text="timeIndex === key ? 'white' : '#969696'">
              <div v-if="profit_status === 1">
                {{ t('trading.buy.up') }}: {{ e.profit_rate }} %
              </div>
              <div v-if="low_status === 1">
                {{ t('trading.buy.down') }}: {{ e.loss_rate }}%
              </div>
            </div>
          </div>
        </template>
      </div>
      <div mt5.5 text-lg>
        {{ t('trading.buy.amount') }}
      </div>
      <div mt3.5 flex="~" text-lg>
        <div v-for="(e, key) in moneyList" :key flex="~" :class="getMoneyStyle(key)" @click="selectMoney(e, key)">
          {{ e }}
        </div>
      </div>
    </div>
    <div mt4 pl5.8>
      <button h8.5 min-w25 border rounded-xl bg-white px2 text-lg @click="all()">
        {{ t('trading.buy.all') }}
      </button>
      <input v-model="submitData.money" type="text" :placeholder="t('trading.buy.other')" :class="subClass()">
    </div>
    <div mt4 pl7.5 pr6 text-black opacity-69>
      <div flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.breed') }}</div>
        <div>{{ product?.product_name || '' }}</div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.real_price') }}</div>
        <div>{{ product?.price || ' ' }}</div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.amount') }}</div>
        <div>
          {{ submitData.money }}
        </div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.anticipated_yield') }}</div>
        <div class="text-#5425EB">
          {{ earning }}
        </div>
      </div>
      <div mt6.5 flex="~" items-center justify-between>
        <div>
          {{ t('trading.buy.amount_available') }}
          <span class="text-#5425EB">
            {{ product?.usable_money || 0 }}
          </span>
        </div>
        <div>
          {{ t('trading.buy.service_charge') }}
          <span class="text-#5425EB">
            {{ user.data.create_order_rate }}%
          </span>
        </div>
      </div>
    </div>
    <div flex="~" justify-center>
      <button class="sub-btn" @click="submit()">
        {{ t('trading.submit') }}
      </button>
    </div>
    <div h50 />
  </div>
  <TheFooter :index="0" />
</template>

<style scoped>
input::placeholder {
  color: #707070;
}

.sub-btn {
  margin-top: 1.875rem;
  height: 2.625rem;
  min-width: 9.375rem;
  border-radius: 0.5rem;
  background-color: rgb(119 81 241 / var(--un-bg-opacity));
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: rgb(255 255 255 / var(--un-text-opacity));
}
</style>
