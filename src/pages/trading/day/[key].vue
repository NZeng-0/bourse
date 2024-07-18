<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import { list } from '~/composables/portfolioListData'
import { downColor, upColor } from '~/composables/candlestickChart'
import type { optionData } from '~/composables/candlestickChart'

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
          show: false,
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

function getRandom() {
  return `canlestick${Number.parseInt(`${Math.random() * 100}`)}`
}
</script>

<template>
  <div>
    <TheTrading :index="key" :title="data.nameEN" :range :icon :present-value :ud :select="0">
      <TheCharts :dom="getRandom()" :option="getOption()" />
    </TheTrading>
  </div>
</template>
