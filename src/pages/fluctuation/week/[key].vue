<script setup lang="ts">
import { getProductDetail } from '~/api'
import TheCharts from '~/components/TheCharts'
import { useProduct } from '~/store/useProduct'
import type { historyType, productType } from '~/types'

const key = useRoute('/trading/day/[key]').params.key

const productStore = useProduct()
const product = ref<productType>()

const chartData = ref<string[]>([])

provide('currentKey', key)

function getOption() {
  return {
    animation: false,
    grid: {
      left: '0px',
      right: '13%',
      top: '12px',
      height: '85%',
    },
    tooltip: {
      trigger: 'axis',
      className: 'custom',
      textStyle: {
        color: '#3B82F6',
      },
      formatter: (params: any) => {
        let dom: string = ``
        params.forEach((item: any) => {
          dom += `<div">${item.value}</div>`
        })
        return dom
      },
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 12,
        align: 'left',
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      show: true,
      type: 'value',
      splitLine: {
        show: false,
      },
      position: 'right',
    },
    series: [
      {
        data: chartData.value,
        type: 'line',
        smooth: 0.3,
        lineStyle: {
          color: '#7751f1',
          width: 3,
        },
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#3B82F6',
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#fff',
              },
              {
                offset: 0,
                color: '#fff',
              },
            ],
            global: false,
          },
          borderWidth: 12,
        },
      },
      {
        data: chartData.value.map(e => e + 10),
        type: 'line',
        smooth: 0.5,
        tooltip: {
          show: false,
        },
        lineStyle: {
          color: '#7751f1',
          width: 0,
        },
        itemStyle: {
          show: false,
        },
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops:
              [
                {
                  offset: 0,
                  color: 'rgba(59, 130, 246, 0)',
                },
                {
                  offset: 1,
                  color: 'rgba(59, 130, 246, 0.2)',
                },
              ],
            globalCoord: false,
          },
        },
      },
    ],
    graphic: [],
  }
}

function getRandom() {
  return `canlestick${Number.parseInt(`${Math.random() * 100}`)}`
}

const select = ref(1)
function selected(current: number) {
  return select.value === current ? 'bg-#7751f1' : 'bg-#CBBCFB'
}

function go(index: number) {
  select.value = index
}

function parseData(data: historyType[]) {
  const result: string[] = []
  for (const h of data) {
    const val = []
    val.push(h.close)
    result.push(...val)
  }
  return result
}

onMounted(async () => {
  if (productStore.data) {
    product.value = productStore.data
  }
  else {
    const { data } = await getProductDetail(key, '1week')
    productStore.data = data.value.data
    product.value = data.value.data
  }

  const res = parseData(product.value!.history_list)
  chartData.value = res
})
</script>

<template>
  <div v-if="product">
    <div p="x-4">
      <TheHead back="/" :title="product?.product_name" />
    </div>
    <div h170 overflow-y-scroll bg-trading>
      <TheSwitched :k="false" :current="Number.parseInt(key)" />
      <section mt5.5 rounded-bl-3xl rounded-br-3xl bg-white>
        <div flex="~" wfull justify-between px-4 pt4.5>
          <div>
            <div text-3xl>
              1111
              <!-- {{ presentValue }} -->
            </div>
            <div flex="~" text-xs :style="{ color: product!.profit_status > 0 ? '#19c09a' : '#fc6c6b' }">
              <div
                :class="product!.profit_status > 0 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'" h-1.2rem
                w-1.2rem
              />
              <div>{{ product?.profit_status }} ({{ product?.profit_status }}%)</div>
            </div>
          </div>
          <div mr-2.5>
            <img :src="icon" h12 w12>
          </div>
        </div>
        <div flex="~" mt3 justify-between px4 text-sm>
          <div :class="selected(0)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go(0)">
            1D
          </div>
          <div :class="selected(1)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go(1)">
            1W
          </div>
          <div :class="selected(2)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go(2)">
            1M
          </div>
          <div :class="selected(3)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go(3)">
            1Y
          </div>
          <div :class="selected(4)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go(4)">
            5Y
          </div>
        </div>
        <div mt3.2 h65 w-full>
          <TheCharts v-if="chartData.length > 0" :dom="getRandom()" :option="getOption()" />
        </div>
      </section>
      <div flex="~" justify-center>
        <TheTradingCard />
      </div>
      <div flex="~" my4 justify-between px5.5>
        <TheBuy :index="Number.parseInt(key)" selected="bg-#9D82F4" />
      </div>
    </div>
    <TheFooter :index="0" />
  </div>
</template>
