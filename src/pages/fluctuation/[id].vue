<script setup lang="ts">
import type { CandleType, TooltipShowRule } from 'klinecharts'
import { dispose, init } from 'klinecharts'
import type { cardType } from '~/types'
import type { indexProduct } from '~/api/types'
import { useFund } from '~/hook/useFund'

const id = useToNumber(useRoute('/fluctuation/[id]').params.id).value

const {
  getSrc,
  getIcon,
  getTimes,
  actuator,
  parseData,
  handleImageError,
} = useFund()

const product = ref<indexProduct>()
const select = ref(0)
const period = ref('1day')
const timer = ref()
const card = ref<cardType>({
  count: '',
  amount: '',
  high: '',
  low: '',
  vol: '',
})
let chart

function _in(current: number) {
  return select.value === current
    ? 'color-6A3BF6 w13 items-center justify-center rounded-xl'
    : 'color-999999 w13 items-center justify-center rounded-xl'
}

async function choose(index: number, type: string) {
  select.value = index
  period.value = type
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

onMounted(async () => {
  product.value = await actuator(id, period.value)
  updateChart()
  timer.value = setInterval(async () => {
    product.value = await actuator(id, period.value)
    chart!.updateData({ close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76 })
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
        <div>
          <div text-3xl>
            <!-- 当前价格 -->
            {{ product?.price || 0 }}
          </div>
          <div flex="~" text-xs :style="{ color: product?.profit_status || 0 > 0 ? '#19c09a' : '#fc6c6b' }">
            <div :class="getIcon(product?.profit_status || 0)" h-1.2rem w-1.2rem />
            <div>{{ product?.profit_status }} ({{ product?.fkzdbdz }}%)</div>
          </div>
        </div>
        <div mr-2.5>
          <img :src="getSrc(product?.logo || ' ')" h12 w12 rounded-full @error="handleImageError($event.target)">
        </div>
      </div>
      <div flex="~" mt3 justify-between px4 text-sm>
        <TheSwitched :id :k="false" />
        <div v-for="(e, key) in getTimes()" :key :class="_in(key)" flex="~" @click="choose(key, e.key)">
          {{ e.value }}
        </div>
      </div>
      <div mt3.2 h70 w-full>
        <div id="chart" style="width:100%;height:100%" />
      </div>
    </section>
    <div flex="~" mt0.25 justify-around text-xs>
      <span>
        13:00
      </span>
      <span>
        14:00
      </span>
      <span>
        15:00
      </span>
      <span>
        16:00
      </span>
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

.color-999999 {
  color: #999999;
  font-size: 14px;
  font-weight: normal;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0em;
}
</style>
