<script setup lang="ts">
import { dispose, init } from 'klinecharts'
import type { TooltipShowRule } from 'klinecharts'
import { useFund } from '~/hook/useFund'
import type { indexProduct } from '~/api/types'
import type { cardType } from '~/types'

const {
  getSrc,
  getTimes,
  actuator,
  parseData,
  handleImageError,
} = useFund()

const id = useToNumber(useRoute('/fund/[id]').params.id).value
const product = ref<indexProduct>()
const select = ref(0)
const period = ref('1day')
const timer = ref()
let chart

function _in(current: number) {
  return select.value === current
    ? 'color-6A3BF6 w13 items-center justify-center rounded-xl'
    : 'color-999999 w13 items-center justify-center rounded-xl'
}

const card = ref<cardType>({
  count: '',
  amount: '',
  high: '',
  low: '',
  vol: '',
})

async function choose(index: number, type: string) {
  dispose('chart')
  select.value = index
  period.value = type
  product.value = await actuator(id, period.value)
  const data = parseData(product.value!.history_list)
  initChart()
  chart!.applyNewData(data)
}

function initChart() {
  chart = init('chart')
  chart!.createIndicator('MA', true, { id: 'candle_pane' })
  chart!.createIndicator('VOL')
  chart!.setStyles({
    candle: {
      tooltip: { showRule: 'none' as TooltipShowRule },
      priceMark: {
        low: { show: false },
        high: { show: false },
        last: { show: false },
      },
    },
    indicator: { tooltip: { showRule: 'none' as TooltipShowRule } },
    // xAxis: { tickText: { show: false } },
    // yAxis: { axisLine: { show: true }, tickLine: { show: true }, tickText: { show: true } },
    crosshair: {
      // vertical: { text: { show: false } },
      horizontal: {
        text: {
          color: '#fff',
          backgroundColor: '#6A3BF6',
        },
      },
    },
  })
}

function loadChart(cb: Function = () => { }) {
  card.value = {
    count: product.value!.count,
    amount: product.value!.amount,
    high: product.value!.high,
    low: product.value!.low,
    vol: product.value!.vol,
  }

  if (cb)
    cb()

  const data = parseData(product.value!.history_list)
  initChart()
  chart!.applyNewData(data!)
}

function isUp(state: number) {
  return state === 1
}

onMounted(async () => {
  product.value = await actuator(id, period.value)
  loadChart()
  timer.value = setInterval(async () => {
    product.value = await actuator(id, period.value)
    const data = parseData(product.value!.history_list)
    chart!.applyNewData(data)
  }, 10000)
})

onUnmounted(() => {
  dispose('chart')
  clearInterval(timer.value)
})
</script>

<template>
  <TheHead back="/" :title="product?.product_name || ' '" />
  <div h-screen overflow-y-scroll border="0.1" bg-trading>
    <div flex="~" mt5.5 wfull justify-between px-4>
      <div flex="~" items-center>
        <div :class="isUp(product?.profit_status || 0) ? 'up_card' : 'down_card' ">
          <!-- 当前价格 -->
          {{ product?.price || 0 }}
        </div>
        <div flex="~" ml-4 items-center text-xs>
          <img v-if="isUp(product?.profit_status || 0)" src="../../assets/images/index/up.png" class="up_icon_2">
          <img v-else src="../../assets/images/index/down.png" class="up_icon_2">
          <div class="bfb">
            {{ product?.diff }}%
          </div>
        </div>
      </div>
      <div mr-2.5>
        <img h12 w12 rounded-full :src="getSrc(product?.logo || ' ')" @error="handleImageError($event.target)">
      </div>
    </div>
    <div flex="~" mt3 justify-between px4 text-sm>
      <TheSwitched :id :k="true" />
      <div v-for="(e, key) in getTimes()" :key cursor-pointer :class="_in(key)" flex="~" @click="choose(key, e.key)">
        {{ e.value }}
      </div>
    </div>
    <div mt3.2 h70 w-full>
      <div id="chart" style="width:100%;height:100%" />
    </div>
    <div flex="~" justify-center>
      <TheTradingCard :card />
    </div>
    <div flex="~" my4 justify-between px5.5>
      <TheBuy :id selected="bg-btn-select" />
    </div>
    <div h30 />
  </div>
  <TheFooter :index="0" />
</template>

<style scoped>
.color-6A3BF6 {
  color: #6A3BF6;
  font-size: 14px;
  font-weight: normal;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0em;
}

.bfb {
  font-size: 16px;
  font-weight: normal;
  line-height: 23px;
  text-align: right;
  letter-spacing: 0px;
  font-variation-settings: "opsz" auto;
  color: #353535;
}

.color-999999 {
  color: #999999;
  font-size: 14px;
  font-weight: normal;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0em;
}

.up_card {
  min-width: 120px;
  height: 45px;
  border-radius: 8px;
  background: #19C09A;
  font-size: 28px;
  font-weight: normal;
  line-height: 28px;
  text-align: right;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.down_card {
  min-width: 120px;
  height: 45px;
  border-radius: 8px;
  background: #FC6C6B;
  font-size: 28px;
  font-weight: normal;
  line-height: 28px;
  text-align: right;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
