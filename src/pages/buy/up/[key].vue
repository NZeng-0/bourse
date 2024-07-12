<script setup lang="ts">
import { list } from '~/composables/portfolioListData'

const { t } = useI18n()
const key = useRoute('/buy/up/[key]').params.key

const data = list[Number.parseInt(key)]

const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
const route = useRouter()

const selectTime = ref(1)
function getTimeStyle(time: number) {
  return selectTime.value === time ? 'bg-btn-select text-white' : 'bg-white'
}

const selectMoney = ref(1)
function getMoneyStyle(index: number) {
  return selectMoney.value === index ? 'bg-btn-select text-white rounded-xl' : 'bg-white rounded-xl'
}

function subClass() {
  return 'text-#707070 ml-6.8 h8.5 w25 rounded-xl bg-white pl4 text-lg'
}

function back() {
  route.back()
}
</script>

<template>
  <div hscreen bg-trading>
    <div flex="~" h30 items-center justify-between rounded-b-2xl bg-white px4>
      <img :src="backUrl" h10 w10 @click="back()">
      <div text-xl text-trading-title>
        {{ t('trading.buy_up') }}
      </div>
      <div h10 w10 />
    </div>
    <div mt5 px6.8>
      <div text-lg>
        {{ t('trading.buy.settlement_time') }}
      </div>
      <div mt3.5 flex="~" justify-between>
        <div flex="~" h11.5 w16 items-center justify-center rounded-lg :class="getTimeStyle(0)" @click="selectTime = 0">
          <div text-2xl font-black leading-6 class="font-['Alibaba-PuHuiTi']">
            30
          </div>
          <span self-end text-xl>s</span>
        </div>
        <div flex="~" h11.5 w16 items-center justify-center rounded-lg :class="getTimeStyle(1)" @click="selectTime = 1">
          <div text-2xl font-black leading-6 class="font-['Alibaba-PuHuiTi']">
            60
          </div>
          <span self-end text-xl>s</span>
        </div>
        <div flex="~" h11.5 w16 items-center justify-center rounded-lg :class="getTimeStyle(2)" @click="selectTime = 2">
          <div text-2xl font-black leading-6 class="font-['Alibaba-PuHuiTi']">
            90
          </div>
          <span self-end text-xl>s</span>
        </div>
        <div flex="~" h11.5 w16 items-center justify-center rounded-lg :class="getTimeStyle(3)" @click="selectTime = 3">
          <div text-2xl font-black leading-6 class="font-['Alibaba-PuHuiTi']">
            120
          </div>
          <span self-end text-xl>s</span>
        </div>
      </div>
      <div mt5.5 text-lg>
        {{ t('trading.buy.amount') }}
      </div>
      <div mt3.5 flex="~" justify-between text-lg>
        <div flex="~" h8.5 w12.5 items-center justify-center :class="getMoneyStyle(0)" @click="selectMoney = 0">
          100
        </div>
        <div flex="~" h8.5 w12.5 items-center justify-center :class="getMoneyStyle(1)" @click="selectMoney = 1">
          500
        </div>
        <div flex="~" h8.5 w15 items-center justify-center :class="getMoneyStyle(2)" @click="selectMoney = 2">
          1000
        </div>
        <div flex="~" h8.5 w15 items-center justify-center :class="getMoneyStyle(3)" @click="selectMoney = 3">
          2000
        </div>
        <div flex="~" h8.5 w15 items-center justify-center :class="getMoneyStyle(4)" @click="selectMoney = 4">
          5000
        </div>
      </div>
    </div>
    <div mt4 pl5.8>
      <button h8.5 w25 rounded-xl bg-white text-lg>
        {{ t('trading.buy.all') }}
      </button>
      <input type="text" :placeholder="t('trading.buy.orther')" :class="subClass()">
    </div>
    <div mt4 pl7.5 pr6 text-black opacity-69>
      <div flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.breed') }}</div>
        <div>{{ data.nameEN }}</div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.real_price') }}</div>
        <div>{{ data.presentValue }}</div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.amount') }}</div>
        <div>200</div>
      </div>
      <div mt5 flex="~" h12.3 items-center justify-between rounded-2xl bg-white px5 pr1.8>
        <div>{{ t('trading.buy.anticipated_yield') }}</div>
        <div class="text-#5425EB">
          168.00
        </div>
      </div>
      <div mt6.5 flex="~" items-center justify-between>
        <div>
          {{ t('trading.buy.amount_available') }}
          <span ml7 class="text-#5425EB">218</span>
        </div>
        <div>
          {{ t('trading.buy.service_charge') }} &nbsp;&nbsp;
          <span class="text-#5425EB">0% </span>
        </div>
      </div>
    </div>
    <div flex="~" justify-center>
      <button mt7.5 h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
        {{ t('trading.submit') }}
      </button>
    </div>
  </div>
  <TheFooter :index="0" />
</template>

<style scoped>
input::placeholder {
  color: #707070;
}
</style>
