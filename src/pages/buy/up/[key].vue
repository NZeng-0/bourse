<script setup lang="ts">
import { submitProductOrder } from '~/api'
import { useProduct } from '~/store/useProduct'
import { useUser } from '~/store/useUser'
import message from '~/components/message'

const { t } = useI18n()
const route = useRouter()

const store = useProduct()
const user = useUser()
const timeIndex = ref(-1)
const moneyIndex = ref(-1)
const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
const timeList = store.data.time_scheme_list
const moneyList = store.data.investment_money_list

const { create_order_max_money, create_order_min_money } = store.data

const submitData = ref({
  product_id: store.data.id,
  time: 0,
  money: 0,
  type: 1,
})

function selectTime(time: number, index: number) {
  submitData.value.time = time
  timeIndex.value = index
}

function getTimeStyle(time: number) {
  return timeIndex.value === time
    ? 'bg-btn-select text-white rounded-lg mt4 p2.5'
    : 'bg-white rounded-lg mt4 p2.5'
}

function selectMoney(money: number, index: number) {
  submitData.value.money = money
  moneyIndex.value = index
}

function getMoneyStyle(index: number) {
  return moneyIndex.value === index
    ? ' px0.5 m0.5 h8.5 min-w12.5 items-center justify-center bg-btn-select text-white rounded-xl'
    : ' px0.5 m0.5 h8.5 min-w12.5 items-center justify-center bg-white rounded-xl'
}

function subClass() {
  return 'text-#707070 ml-6.8 h8.5 w25 rounded-xl bg-white pl4 text-lg'
}

function back() {
  route.back()
}

function toNumber(value: any) {
  return Number.parseInt(value)
}

function all() {
  submitData.value.money = store.data.usable_money
}

async function submit() {
  if (toNumber(submitData.value.money) < toNumber(create_order_min_money)) {
    return message({
      message: `${t('buy_tips.min')}${create_order_min_money}`,
      duration: 1500,
    })
  }

  if (toNumber(submitData.value.money) > toNumber(create_order_max_money)) {
    return message({
      message: `${t('buy_tips.max')}${create_order_max_money}`,
      duration: 1500,
    })
  }

  const { data } = await submitProductOrder(submitData.value)
  message({
    message: data.value.msg,
    duration: 1500,
  })
}
</script>

<template>
  <div flex="~" h30 items-center justify-between rounded-b-2xl bg-white px4>
    <img :src="backUrl" h10 w10 @click="back()">
    <div text-xl text-trading-title>
      {{ t('trading.buy_up') }}
    </div>
    <div h10 w10 />
  </div>
  <div hscreen overflow-x-scroll bg-trading>
    <div mt5 px6.8>
      <div text-lg>
        {{ t('trading.buy.settlement_time') }}
      </div>
      <div flex="~ wrap" justify-between>
        <!-- h15 -->
        <div
          v-for="(e, key) in timeList" :key w="47.25%" flex="~ wrap" :class="getTimeStyle(key)"
          @click="selectTime(e.time, key)"
        >
          <div wfull flex="~" justify-center>
            <div text-2xl font-black leading-6 class="font-['Alibaba-PuHuiTi']">
              {{ e.time }}
            </div>
            <span self-end text-xl>s</span>
          </div>
          <div flex="~" mt1 wfull justify-center :text="timeIndex === key ? 'white' : '#969696'">
            <div>{{ t('trading.buy.up') }}: 5%</div>
            <div>{{ t('trading.buy.down') }}: 5%</div>
          </div>
        </div>
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
      <span v-if="!submitData.money" :class="subClass()">{{ t('trading.buy.other') }}</span>
      <input v-else v-model="submitData.money" type="text" :placeholder="t('trading.buy.other')" :class="subClass()">
    </div>
    <div mt4 pl7.5 pr6 text-black opacity-69>
      <div flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.breed') }}</div>
        <div>{{ store.data.product_name }}</div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.real_price') }}</div>
        <div>{{ store.data.price }}</div>
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
          {{ toNumber(submitData.money) + toNumber(submitData.money * .5) }}
        </div>
      </div>
      <div mt6.5 flex="~" items-center justify-between>
        <div>
          {{ t('trading.buy.amount_available') }}
          <span class="text-#5425EB">
            {{ store.data.usable_money }}
          </span>
        </div>
        <div>
          {{ t('trading.buy.service_charge') }}
          <span class="text-#5425EB">
            {{ user.data.user_withdraw_rate }}%
          </span>
        </div>
      </div>
    </div>
    <div flex="~" justify-center>
      <button mt7.5 h10.5 min-w37.5 rounded-lg bg-btn-select px2 text-lg text-white @click="submit()">
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
</style>
