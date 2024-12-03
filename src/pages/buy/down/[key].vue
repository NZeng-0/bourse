<script setup lang="ts">
import { countProductEarningsMoney, getUserInfo, submitProductOrder } from '~/api'
import { useUser } from '~/store/useUser'
import { useConf } from '~/store/useConf'
import { useFund } from '~/hook'
import type { configlist, earningsMoney } from '~/types'
import type { indexProduct, timeList } from '~/api/types'

const id = useToNumber(useRoute('/buy/down/[key]').params.key).value

const {
  actuator,
} = useFund()

const { t } = useI18n()
const route = useRouter()

const product = ref<indexProduct>()
const conf = useConf()
const user = useUser()
const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
const timeIndex = ref(-1)
const moneyIndex = ref(-1)

const times = ref<timeList[]>()
const moneyList = ref()

const create_order_max_money = ref()
const create_order_min_money = ref()
const profit_status = ref()
const low_status = ref()
const earning = ref(0)

const auth = conf.data.find((item: configlist) => {
  return item.key === 'auth_open'
}).value === '1'

const submitData = ref<earningsMoney>({
  product_id: id,
  money: 0,
  type: 2,
  scheme_id: -1,
})

function getTimeStyle(time: number) {
  return timeIndex.value === time
    ? 'bg-btn-select text-white rounded-lg mt4 p2.5'
    : 'bg-white rounded-lg mt4 p2.5'
}

function getMoneyStyle(index: number) {
  return moneyIndex.value === index
    ? ' px0.5 m0.5 h8.5 min-w12.5 items-center justify-center bg-btn-select text-white rounded-xl'
    : ' px0.5 m0.5 h8.5 min-w12.5 items-center justify-center bg-white rounded-xl'
}

function selectTime(index: number, profit: string, id: number) {
  if (timeIndex.value === index) {
    submitData.value.scheme_id = -1
    timeIndex.value = -1
  }
  else {
    submitData.value.scheme_id = id
    timeIndex.value = index
  }
  times.value?.forEach((e: timeList) => {
    create_order_max_money.value = e.max_invest_money
    create_order_min_money.value = e.min_invest_money
  })
}

function selectMoney(money: number, index: number) {
  if (moneyIndex.value === index) {
    moneyIndex.value = -1
    submitData.value.money = 0
  }
  else {
    submitData.value.money = money
    moneyIndex.value = index
  }
}

function subClass() {
  return 'text-#707070 ml-6.8 h8.5 w25 rounded-xl bg-white pl4 text-lg'
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

async function getEarnings() {
  const { data } = await countProductEarningsMoney(submitData.value)
  earning.value = data.value.data.predict_earnings_money

  times.value?.forEach((e: timeList) => {
    if (e.id === submitData.value.scheme_id) {
      e.loss_rate = data.value.data.loss_rate.split('-')[1]
      e.profit_rate = data.value.data.profit_rate.split('-')[0]
    }
  })
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

async function updateUserInfo() {
  const { data } = await getUserInfo()
  user.data = data.value.data
}

onMounted(async () => {
  await updateUserInfo()
  product.value = await actuator(id, '5min')
  profit_status.value = product.value!.profit_status
  low_status.value = product.value!.low_status
  times.value = product.value?.time_scheme_list
  setTimeout(() => {
    moneyList.value = product.value?.investment_money_list
  }, 1000)
})
</script>

<template>
  <div flex="~" h16 items-center justify-between rounded-b-2xl bg-white px4>
    <img :src="backUrl" h6.25 w6.25 @click="back()">
    <div text-xl text-trading-title>
      {{ t('trading.buy_to_fall') }}
    </div>
    <div h10 w10 />
  </div>
  <div hscreen overflow-x-scroll bg-trading>
    <div mt5 px6.8>
      <div text-lg>
        {{ t('trading.buy.settlement_time') }}
      </div>
      <div mt3.5 flex="~ wrap" justify-between>
        <!-- h15 -->
        <template v-for="(e, key) in times" :key>
          <div w="47.25%" flex="~ wrap" :class="getTimeStyle(key)" @click="selectTime(key, e.profit_rate, e.id)">
            <div wfull flex="~" justify-center>
              <div text-2xl font-black leading-6 class="font-['Alibaba-PuHuiTi']">
                {{ e.time }}
              </div>
              <span self-end text-xl>s</span>
            </div>
            <div flex="~" mt4 wfull justify-center text-sm :text="timeIndex === key ? 'white' : '#969696'">
              <div v-if="profit_status === 1">
                {{ t('trading.buy.up') }}: {{ e.profit_rate }}%
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
      <button h8.5 min-w25 rounded-xl bg-white px2 text-lg @click="all()">
        {{ t('trading.buy.all') }}
      </button>
      <input v-model="submitData.money" type="text" :placeholder="t('trading.buy.other')" :class="subClass()">
    </div>
    <div mt4 pl7.5 pr6 text-black opacity-69>
      <div flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div> {{ t('trading.buy.breed') }}</div>
        <div>{{ product?.product_name || '' }}</div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div> {{ t('trading.buy.real_price') }}</div>
        <div>{{ product?.price || ' ' }}</div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div> {{ t('trading.buy.amount') }}</div>
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
      <button mt7.5 h10.5 min-w37.5 rounded-lg bg-btn-select px2 text-lg text-white @click="submit">
        {{ t('trading.submit') }}
      </button>
    </div>
    <div h40 />
  </div>
  <TheFooter :index="0" />
</template>

<style scoped>
input::placeholder {
  color: #707070;
}
</style>
