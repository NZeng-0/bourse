<script setup lang="ts">
import type { history, indexProduct } from '~/api/types'
import { useProduct } from '~/store/useProduct'
import type { cardType } from '~/types'
import TheCharts from '~/components/TheCharts'
import { getProductDetail } from '~/api'

const store = useProduct()
const { data } = storeToRefs(store) as { data: Ref<indexProduct> }

const product = ref(data)
const rawData = ref<Array<Array<number>>>([])
const dataTime = ref<Array<string>>([])
const barData = ref<Array<string>>([])
const treadLine = ref<Array<string>>([])

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

async function choose(index: number, type: string) {
  select.value = index
  await loadData(type)
}

function calculateMA(dayCount: number, data: Array<Array<number>>) {
  const result = []
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-')
      continue
    }
    let sum = 0
    for (let j = 0; j < dayCount; j++)
      sum += +data[i - j][1]

    result.push(sum / dayCount)
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
        height: '65%',
      },
      {
        left: '12px',
        right: '17%',
        bottom: '10px',
        height: '20%',
      },
    ],
    xAxis: [
      {
        data: dataTime,
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
      {
        type: 'category',
        gridIndex: 1,
        data: dataTime,
        scale: true,
        show: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
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
      {
        type: 'value',
        scale: true,
        splitNumber: 2,
        alignTicks: true,
        gridIndex: 1,
        axisLabel: {
          formatter: '$' + '{value}',
          color: '#121826',
        },
        axisLine: { show: false },
        axisTick: { show: false },
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
        data: calculateMA(5, rawData.value!),
        smooth: false,
        showSymbol: false,
        lineStyle: {
          width: 1.5,
          color: '#0033FF',
        },
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: barData.value,
        width: 5,
        itemStyle: {
          color(params: any) {
            const index = params.dataIndex
            const kData = rawData.value?.[index]
            const open = kData![0]
            const close = kData![1]
            return close > open ? upColor : downColor
          },
        },
      },
      {
        name: 'name',
        type: 'line',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: treadLine.value,
        smooth: false,
        showSymbol: false,
        lineStyle: {
          width: 1.5,
          color: '#00D3FD',
        },
      },
    ],
  }
}

function getRandom() {
  return `canlestick${Number.parseInt(`${Math.random() * 100}`)}`
}

function parseData(data: history[]) {
  const result: Array<string[]> = []
  for (const h of data) {
    const val: Array<string> = []
    dataTime.value?.push(parseDate(h.date))
    val.push(h.open.toString())
    val.push(h.close.toString())
    val.push(h.low.toString())
    val.push(h.high.toString())
    barData.value.push(parseVolume(h.amount, h.vol, h.count))
    result.push(val)
  }
  const res = result.map((item) => {
    return [+item[0], +item[1], +item[2], +item[3]]
  })
  return res
}

function parseVolume(amount: number, vol: number, count: number) {
  treadLine.value?.push((((amount + vol) / count).toFixed(2)))
  return ((amount + vol) / count).toFixed(2)
}

function parseDate(unixTimestamp: number) {
  // 将时间戳转换为毫秒
  const date = new Date(unixTimestamp * 1000)

  // 获取北京时间
  const beijingTime = new Date(date.getTime() + 8 * 60 * 60 * 1000)

  // 格式化输出日期部分
  return beijingTime.toISOString().split('T')[0]
}

async function loadData(type: string) {
  const { data } = await getProductDetail(product.value.id, type)
  store.data = data.value.data
  product.value = data.value.data
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
      <TheSwitched :k="true" />
      <div :class="selected(0)" flex="~" w13 items-center justify-center rounded-xl @click="choose(0, '1day')">
        1D
      </div>
      <div :class="selected(1)" flex="~" w13 items-center justify-center rounded-xl @click="choose(1, '1day')">
        1W
      </div>
      <div :class="selected(2)" flex=" ~" w13 items-center justify-center rounded-xl @click="choose(2, '1mon')">
        1M
      </div>
      <div :class="selected(3)" flex=" ~" w13 items-center justify-center rounded-xl @click="choose(3, '1week')">
        1Y
      </div>
      <div :class="selected(4)" flex=" ~" w13 items-center justify-center rounded-xl @click="choose(4, '1year')">
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
