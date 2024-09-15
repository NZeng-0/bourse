<script setup lang="ts">
import type { indexProduct } from '~/api/types'
import { useProduct } from '~/store/useProduct'
import type { cardType, historyType } from '~/types'
import TheCharts from '~/components/TheCharts'

const store = useProduct()
const { data } = storeToRefs(store) as { data: Ref<indexProduct> }

const product = ref(data)
const rawData = ref<Array<Array<string>>>()

const select = ref(0)
function selected(current: number) {
  return select.value === current ? 'color-6A3BF6' : 'color-999999'
}

const card = ref<cardType>({
  count: '',
  amount: '',
  high: '',
  low: '',
  vol: '',
})

function loadImg() {
  product.value!.logo = icon
}

function choose(index: number) {
  select.value = index
}

function calculateMA(dayCount: number, data: Array<Array<string>>) {
  const result = []
  for (const f1 of data) {
    if (f1.length < dayCount) {
      result.push('-')
      continue
    }
    let sum = 0
    for (const item of f1)
      sum += Number.parseInt(item)
    result.push(+(sum / dayCount).toFixed(3))
  }
  return result
}

function getOption() {
  return {
    animation: false,
    backgroundColor: '#F5F4F7',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        show: false,
        type: 'cross',
      },
      extraCssText: 'display: none;',
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all',
        },
      ],
      label: {
        backgroundColor: '#777',
      },
    },
    grid: [
      {
        top: '12px',
        left: '12px',
        right: '17%',
        bottom: '12px',
      },
    ],
    xAxis: [
      {
        show: false,
        type: 'category',
        boundaryGap: true,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#d4d3d6',
          },
        },
        axisLabel: {
          show: false,
        },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        alignTicks: true,
        splitArea: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter: '$' + '{value}',
          color: '#121826',
        },
        splitLine: {
          lineStyle: {
            color: '#d4d3d6 ',
          },
        },
        position: 'right',
      },
    ],
    series: [
      {
        name: 'index',
        type: 'candlestick',
        data: rawData.value,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upColor,
          borderColor0: downColor,
        },
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(rawData.value!.length, rawData.value!),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
    ],
  }
}

function getRandom() {
  return `canlestick${Number.parseInt(`${Math.random() * 100}`)}`
}

function parseData(data: historyType[]) {
  const result: Array<string[]> = []
  for (const h of data) {
    const val = []
    val.push(h.open)
    val.push(h.close)
    val.push(h.low)
    val.push(h.high)
    result.push(val)
  }
  return result
}

onMounted(async () => {
  card.value = {
    count: product.value.count,
    amount: product.value.amount,
    high: product.value.high,
    low: product.value.low,
    vol: product.value.vol,
  }
  rawData.value = parseData(product.value.history_list)
})
</script>

<template>
  <div px-4>
    <TheHead back="/" :title="product?.product_name" />
  </div>
  <div h-screen overflow-y-scroll bg-trading>
    <div flex="~" mt5.5 wfull justify-between px-4>
      <div>
        <div text-3xl>
          <!-- 当前价格 -->
          {{ product!.price }}
        </div>
        <div flex="~" text-xs :style="{ color: product!.profit_status > 0 ? '#19c09a' : '#fc6c6b' }">
          <div :class="product!.profit_status > 0 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'" h-1.2rem w-1.2rem />
          <div>{{ product?.profit_status }} ({{ product?.fkzdbdz }}%)</div>
        </div>
      </div>
      <div mr-2.5>
        <img :src="product!.logo" h12 w12 rounded-full @error="loadImg">
      </div>
    </div>
    <div flex="~" mt3 justify-between px4 text-sm>
      <TheSwitched :k="true" :current="product?.id" />
      <div :class="selected(0)" flex="~" w13 items-center justify-center rounded-xl @click="choose(0)">
        1D
      </div>
      <div :class="selected(1)" flex="~" w13 items-center justify-center rounded-xl @click="choose(1)">
        1W
      </div>
      <div :class="selected(2)" flex=" ~" w13 items-center justify-center rounded-xl @click="choose(2)">
        1M
      </div>
      <div :class="selected(3)" flex=" ~" w13 items-center justify-center rounded-xl @click="choose(3)">
        1Y
      </div>
      <div :class="selected(4)" flex=" ~" w13 items-center justify-center rounded-xl @click="choose(4)">
        5Y
      </div>
    </div>
    <div mt3.2 h65 w-full>
      <TheCharts v-if="rawData?.length! > 0" :dom="getRandom()" :option="getOption()" />
    </div>
    <div flex="~" mt2 justify-around text-xs>
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
      <TheBuy :index="product?.id" selected="bg-btn-select" />
    </div>
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
