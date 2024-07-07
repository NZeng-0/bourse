import type { DataType } from './candlestickData'
import { data as rawData } from '~/composables/candlestickData'

const upColor = '#2EA21C'
const downColor = '#DD4646'
const index = ref(14)

export function setIndex(value: number) {
  index.value = value
}

const data = ref<optionData>()
watchEffect(() => {
  data.value = splitData(rawData.slice(0, index.value))
})

export interface optionData {
  categoryData: number[]
  values: object[]
}

export function splitData(rawData: DataType[]): optionData {
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

export function getOption() {
  return {
    animation: false,
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
        type: 'category',
        data: data.value!.categoryData,
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
        name: 'Dow-Jones index',
        type: 'candlestick',
        data: data.value!.values,
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
