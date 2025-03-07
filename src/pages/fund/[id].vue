<script setup lang="ts">
import { dispose, init } from 'klinecharts'
import type { TooltipShowRule } from 'klinecharts'
import { useFund } from '~/hook/useFund'
import type { indexProduct } from '~/api/types'
import type { cardType, configlist, price } from '~/types'
import { useConf } from '~/store/useConf'

const {
  getSrc,
  getTimes,
  actuator,
  parseData,
  handleImageError,
  getProductPrice,
} = useFund()

const id = useToNumber(useRoute('/fund/[id]').params.id).value
const product = ref<indexProduct>()
const pPrice = ref<price>()
const select = ref(0)
const period = ref('1min')
const timer = ref()
const t1 = ref()
let chart
const prevPrice = ref<number>()
const priceChange = ref<'up_card' | 'down_card'>('up_card')
const icon_type = ref(true)

const priceTime = useConf().data.find((e: configlist) => e.key === 'product_price_request_time')?.value
const kLineTime = useConf().data.find((e: configlist) => e.key === 'product_kdata_request_time')?.value

function _in(current: number) {
  return select.value === current
    ? 'color-6A3BF6 w13 items-center justify-center rounded-xl'
    : 'color-999999 w13 items-center justify-center rounded-xl'
}

const card = ref<cardType>({
  high: '',
  low: '',
  open: '',
  close: '',
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
  chart!.setPriceVolumePrecision(4, 0)
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
  if (cb)
    cb()

  const data = parseData(product.value!.history_list)
  initChart()
  chart!.applyNewData(data!)
}

function onSuccess() {
  if (prevPrice.value && product.value?.price) {
    if (product.value.price < prevPrice.value) {
      priceChange.value = 'up_card'
      icon_type.value = true
    }
    else if (product.value.price > prevPrice.value) {
      priceChange.value = 'down_card'
      icon_type.value = false
    }
  }
  prevPrice.value = product.value?.price

  const timer = setTimeout(() => {
    priceChange.value = product.value!.diff > 0 ? 'up_card' : 'down_card'
    icon_type.value = product.value!.diff > 0
    clearTimeout(timer)
  }, 500)
}

async function getInfo() {
  const data = await getProductPrice(id)
  pPrice.value = data
  card.value = {
    open: format(data.open, 2),
    close: format(data.close, 2),
    high: format(data.high, 2),
    low: format(data.low, 2),
  }
}

function timers() {
  t1.value = setInterval(async () => {
    getInfo()
  }, 1000 * (Number(priceTime) || 3))
  // 每一分钟刷新一次
  timer.value = setInterval(async () => {
    product.value = await actuator(id, period.value)
    const data = parseData(product.value!.history_list)
    onSuccess()
    chart!.updateData(data)
  }, 1000 * (Number(kLineTime) || 60))
}

onMounted(async () => {
  getInfo()
  product.value = await actuator(id, period.value)
  priceChange.value = product.value!.diff > 0 ? 'up_card' : 'down_card'
  icon_type.value = product.value!.diff > 0
  loadChart()
  timers()
})

onUnmounted(() => {
  dispose('chart')
  clearInterval(timer.value)
  clearInterval(t1.value)
})
</script>

<template>
  <TheHead back="/" :title="product?.product_name || ' '" />
  <div h-screen overflow-y-scroll border="0.1" bg-trading>
    <div flex="~" mt5.5 wfull justify-between px-4>
      <div flex="~" items-center>
        <div :class="priceChange">
          <!-- 当前价格 -->
          {{ format(pPrice?.price || 0, 4) }}
        </div>

        <div flex="~" ml-4 items-center text-xs>
          <img v-if="icon_type" src="../../assets/images/index/up.png" class="up_icon_2">
          <img v-else src="../../assets/images/index/down.png" class="up_icon_2">
          <div class="bfb">
            {{ format(pPrice?.diff_rate, 2) }}%
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
    <div h70 />
  </div>
  <TheFooter :index="0" />
</template>

<style scoped>
.color-6A3BF6 {
  color: #6A3BF6;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1rem;
  text-align: center;
  letter-spacing: 0em;
}

.bfb {
  font-size: 1.143rem;
  font-weight: normal;
  line-height: 1.643rem;
  text-align: right;
  letter-spacing: 0rem;
  font-variation-settings: "opsz" auto;
  color: #353535;
}

.color-999999 {
  color: #999999;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1rem;
  text-align: center;
  letter-spacing: 0em;
}

.down_card {
  min-width: 8.571rem;
  height: 3.214rem;
  border-radius: 0.571rem;
  background: #19C09A;
  font-size: 2rem;
  font-weight: normal;
  line-height: 2rem;
  text-align: right;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
  padding: 0.714rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.up_card {
  min-width: 8.571rem;
  height: 3.214rem;
  border-radius: 0.571rem;
  background: #FC6C6B;
  font-size: 2rem;
  font-weight: normal;
  line-height: 2rem;
  text-align: right;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #FFFFFF;
  padding: 0.714rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
