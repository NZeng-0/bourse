<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import { useProduct } from '~/store/useProduct'
import type { cardType } from '~/types'
import loading from '~/components/loading'
import type { history, indexProduct } from '~/api/types'
import { getProductDetail } from '~/api'

const { t } = useI18n()
const router = useRouter()

const store = useProduct()
const { data } = storeToRefs(store) as { data: Ref<indexProduct> }

const product: Ref<indexProduct> = ref(data)

const chartData = ref<string[]>([])

const card = ref<cardType>({
  count: '',
  amount: '',
  high: '',
  low: '',
  vol: '',
})

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

function parseData(data: history[]) {
  const result: string[] = []
  for (const h of data) {
    const val = []
    val.push(h.close)
    result.push(...val)
  }
  return result
}

onMounted(async () => {
  loading.show()
  const { data } = await getProductDetail(product.value.id, '1week')
  store.data = data.value.data
  product.value = data.value.data
  const { count, amount, high, low, vol } = data.value.data
  card.value = { count, amount, high, low, vol }

  chartData.value = parseData(product.value!.history_list)
  loading.close()
})

const idx = ref(0)
function selected(current: number) {
  return current === idx.value ? 'bg-#7751f1' : 'bg-#CBBCFB'
}

function loadImg() {
  product.value!.logo = icon
}

function style(isShow: boolean) {
  return isShow ? 'bg-menu-selected text-white' : ''
}

function go(url: string) {
  router.push(url)
}
</script>

<template>
  <div p="x-4">
    <TheHead back="/" :title="product?.product_name" />
  </div>
  <div h170 overflow-y-scroll bg-trading>
    <div flex="~" wfull justify-center>
      <div flex="~" mt5 h6.5 w40 rounded-full bg-menu text-sm>
        <div :class="style(false)" flex="~" w="1/2" items-center justify-center rounded-full @click="go('fund')">
          {{ t('trading.k_line') }}
        </div>
        <div :class="style(true)" w="1/2" flex="~" items-center justify-center rounded-full @click="go('fluctuation')">
          {{ t('trading.undulate') }}
        </div>
      </div>
    </div>
    <section>
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
        <div :class="selected(0)" flex="~" h8 w13 items-center justify-center rounded-xl @click="idx = 0">
          1D
        </div>
        <div :class="selected(1)" flex="~" h8 w13 items-center justify-center rounded-xl @click="idx = 1">
          1W
        </div>
        <div :class="selected(2)" flex="~" h8 w13 items-center justify-center rounded-xl @click="idx = 2">
          1M
        </div>
        <div :class="selected(3)" flex="~" h8 w13 items-center justify-center rounded-xl @click="idx = 3">
          1Y
        </div>
        <div :class="selected(4)" flex="~" h8 w13 items-center justify-center rounded-xl @click="idx = 4">
          5Y
        </div>
      </div>
      <div mt3.2 h65 w-full>
        <TheCharts v-if="chartData.length > 0" :dom="getRandom()" :option="getOption()" />
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
      <TheBuy :index="product?.id" selected="bg-btn-select" />
    </div>
  </div>
  <TheFooter :index="0" />
</template>
