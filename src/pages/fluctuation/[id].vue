<script setup lang="ts">
import type { CandleType, TooltipShowRule } from 'klinecharts'
import { dispose, init } from 'klinecharts'
import type { cardType } from '~/types'
import type { indexProduct } from '~/api/types'
import { useFund } from '~/hook/useFund'

const id = useToNumber(useRoute('/fluctuation/[id]').params.id).value

const {
  getSrc,
  getTimes,
  actuator,
  parseData,
  handleImageError,
} = useFund()

const product = ref<indexProduct>()
const select = ref(0)
const period = ref('1min')
const timer = ref()
const card = ref<cardType>({
  high: '',
  low: '',
  open: '',
  close: '',
})
let chart
const prevPrice = ref<number>()
const priceChange = ref<'up_card' | 'down_card'>('up_card')
const icon_type = ref(true)

function _in(current: number) {
  return select.value === current
    ? 'color-6A3BF6 w13 items-center justify-center rounded-xl'
    : 'color-999999 w13 items-center justify-center rounded-xl'
}

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
  chart?.setStyles({
    candle: {
      type: 'area' as CandleType,
      tooltip: { showRule: 'none' as TooltipShowRule },
      priceMark: {
        low: { show: false },
        high: { show: false },
        last: { show: false },
      },
    },
    indicator: { tooltip: { showRule: 'none' as TooltipShowRule } },
    xAxis: { tickText: { show: false } },
    crosshair: {
      vertical: { text: { show: false } },
      horizontal: {
        text: {
          color: '#fff',
          backgroundColor: '#6A3BF6',
        },
      },
    },
  })
}

function updateChart(cb: Function = () => { }) {
  card.value = {
    open: product.value!.open,
    close: product.value!.close,
    high: product.value!.high,
    low: product.value!.low,
  }

  if (cb)
    cb()

  const data = parseData(product.value!.history_list)
  initChart()
  chart!.applyNewData(data!)
}

function onSuccess() {
  if (prevPrice.value && product.value?.price) {
    if (product.value.price > prevPrice.value) {
      priceChange.value = 'up_card'
      icon_type.value = true
    }
    else if (product.value.price < prevPrice.value) {
      priceChange.value = 'down_card'
      icon_type.value = false
    }
  }
  prevPrice.value = product.value?.price
  const timer = setTimeout(() => {
    priceChange.value = product.value?.profit_status === 1 ? 'up_card' : 'down_card'
    icon_type.value = product.value?.profit_status === 1
    clearTimeout(timer)
  }, 500)
}

onMounted(async () => {
  product.value = await actuator(id, period.value)
  updateChart()
  timer.value = setInterval(async () => {
    product.value = await actuator(id, period.value)
    const data = parseData(product.value!.history_list)
    onSuccess()
    chart!.applyNewData(data)
  }, 3000)
})

onUnmounted(() => {
  dispose('chart')
  clearInterval(timer.value)
})
</script>

<template>
  <TheHead back="/" :title="product?.product_name || ' '" />
  <div h-screen overflow-y-scroll border="0.1" bg-trading>
    <section>
      <div flex="~" mt5.5 wfull justify-between px-4>
        <div flex="~" items-center>
          <div :class="priceChange">
            <!-- 当前价格 -->
            {{ product?.price || 0 }}
          </div>
          <div flex="~" ml-4 items-center text-xs>
            <img v-if="icon_type" src="../../assets/images/index/up.png" class="up_icon_2">
            <img v-else src="../../assets/images/index/down.png" class="up_icon_2">
            <div class="bfb">
              {{ product?.diff_rate }}%
            </div>
          </div>
        </div>
        <div mr-2.5>
          <img :src="getSrc(product?.logo || ' ')" h12 w12 rounded-full @error="handleImageError($event.target)">
        </div>
      </div>
      <div flex="~" mt3 justify-between px4 text-sm>
        <TheSwitched :id :k="false" />
        <div v-for="(e, key) in getTimes()" :key cursor-pointer :class="_in(key)" flex="~" @click="choose(key, e.key)">
          {{ e.value }}
        </div>
      </div>
      <div mt3.2 h70 w-full>
        <div id="chart" style="width:100%;height:100%" />
      </div>
    </section>
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

.color-999999 {
  color: #999999;
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

.down_card {
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

.up_card {
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
