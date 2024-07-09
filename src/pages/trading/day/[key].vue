<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import { list } from '~/composables/portfolioListData'
import { downColor, upColor } from '~/composables/candlestickChart'
import type { optionData } from '~/composables/candlestickChart'

const route = useRouter()
const key = useRoute('/trading/day/[key]').params.key
const data = list[Number.parseInt(key)]
const { range, icon, presentValue, ud } = data

const rawData = [
  ['2004-01-12', 10461.55, 10485.18, 10389.85, 10543.03, 197960000],
  ['2004-01-13', 10485.18, 10427.18, 10341.19, 10539.25, 197310000],
  ['2004-01-14', 10428.67, 10538.37, 10426.89, 10573.85, 186280000],
  ['2004-01-15', 10534.52, 10553.85, 10454.52, 10639.03, 260090000],
  ['2004-01-16', 10556.37, 10600.51, 10503.7, 10666.88, 254170000],
  ['2004-01-20', 10601.4, 10528.66, 10447.92, 10676.96, 224300000],
  ['2004-01-21', 10522.77, 10623.62, 10453.11, 10665.7, 214920000],
  ['2004-01-22', 10624.22, 10623.18, 10545.03, 10717.4, 219720000],
  ['2004-01-23', 10625.25, 10568.29, 10490.14, 10691.77, 234260000],
  ['2004-01-26', 10568, 10702.51, 10510.44, 10725.18, 186170000],
]

function splitData(rawData: any[]): optionData {
  const categoryData: number[] = []
  const values: object[] = []
  const volumes: object[] = []
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0])
    values.push(rawData[i])
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
  }

  return {
    categoryData,
    values,
  }
}

const chartData = splitData(rawData)

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
        left: '0%',
        right: '15%',
        height: '60%',
      },
    ],
    xAxis: [
      {
        show: false,
        type: 'category',
        data: chartData.categoryData,
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
          show: true,
          lineStyle: {
            color: '#d4d3d6',
          },
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
        data: chartData.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upColor,
          borderColor0: downColor,
        },
      },
    ],
  }
}

function go(custom: string) {
  route.push(`/trading/${custom}/${key}`)
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
        <TheSwitched :k="true" :current="key" />
        <section>
          <div flex="~" mt5.5 wfull justify-between px-4>
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
            <div class="bg-#7751f1" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('day')">
              1D
            </div>
            <div class="bg-#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('week')">
              1W
            </div>
            <div class="bg-#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('month')">
              1M
            </div>
            <div class="bg-#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('year')">
              1Y
            </div>
            <div class="bg-#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('five-year')">
              5Y
            </div>
          </div>
          <div mt3.2 h65 w-full>
            <TheCharts :dom="getRandom()" :option="getOption()" />
          </div>
        </section>
        <div flex="~" justify-around text-xs>
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
          <TheTradingCard />
        </div>
        <div flex="~" my4 justify-between px5.5>
          <TheBuy :index="key" selected="bg-btn-select" />
        </div>
      </div>
      <TheFooter :index="0" />
    </div>
  </div>
</template>
