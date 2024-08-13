<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import { downColor, upColor } from '~/composables/candlestickChart'
import type { indexProduct } from '~/api/types'
import { useProduct } from '~/store/useProduct'
import { getProductDetail } from '~/api'
import type { historyType } from '~/types'

const key = useRoute('/trading/year/[key]').params.key

const productStore = useProduct()

const product = ref<indexProduct>()

const rawData = ref<Array<Array<string>>>()

provide('currentKey', key)

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
  if (productStore.data) {
    product.value = productStore.data
  }
  else {
    const { data } = await getProductDetail(key, '1year')
    productStore.data = data.value.data
    product.value = data.value.data
  }

  const res = parseData(product.value!.history_list)
  rawData.value = res
})
</script>

<template>
  <div>
    <TheTrading :select="3">
      <TheCharts v-if="rawData?.length! > 0" :dom="getRandom()" :option="getOption()" />
    </TheTrading>
  </div>
</template>
