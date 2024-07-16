<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import { list } from '~/composables/portfolioListData'

const route = useRouter()
const key = useRoute('/trading/day/[key]').params.key
const data = list[Number.parseInt(key)]
const { range, icon, presentValue, ud } = data

const chartData = [113.67, 134.32, 125.85, 153.85, 139.03, 126.88, 176.96, 165.7]

function getOption() {
  return {
    animation: false,
    grid: {
      left: '0%',
      right: '15%',
      height: '60%',
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
        data: chartData,
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
        data: chartData.map(e => e + 10),
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

function go(custom: string) {
  route.push(`/fluctuation/${custom}/${key}`)
}

function getRandom() {
  return `canlestick${Number.parseInt(`${Math.random() * 100}`)}`
}
</script>

<template>
  <div>
    <div>
      <div p="x-4">
        <TheHead back="/" :title="data.nameEN" />
      </div>
      <div h170 overflow-y-scroll bg-trading>
        <TheSwitched :k="false" :current="key" />
        <section mt5.5 rounded-bl-3xl rounded-br-3xl bg-white>
          <div flex="~" wfull justify-between px-4 pt4.5>
            <div>
              <div text-3xl>
                {{ presentValue }}
              </div>
              <div flex="~" text-xs :style="{ color: range > 0 ? '#19c09a' : '#fc6c6b' }">
                <div :class="range > 0 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'" h-1.2rem w-1.2rem />
                <div>{{ ud }} ({{ range }}%)</div>
              </div>
            </div>
            <div mr-2.5>
              <img :src="icon" h12 w12>
            </div>
          </div>
          <div flex="~" mt3 justify-between px4 text-sm>
            <div class="bg-#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl>
              1D
            </div>
            <div class="bg-#7751f1" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('week')">
              1W
            </div>
            <div class="bg-#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl>
              1M
            </div>
            <div class="bg-#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl>
              1Y
            </div>
            <div class="bg-#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl>
              5Y
            </div>
          </div>
          <div mt3.2 h65 w-full>
            <TheCharts :dom="getRandom()" :option="getOption()" />
          </div>
        </section>
        <div flex="~" justify-center>
          <TheTradingCard />
        </div>
        <div flex="~" my4 justify-between px5.5>
          <TheBuy :index="key" selected="bg-#9D82F4" />
        </div>
      </div>
      <TheFooter :index="0" />
    </div>
  </div>
</template>
