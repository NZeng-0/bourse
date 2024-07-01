<script setup lang="ts">
import * as echarts from 'echarts'
import TheCharts from '~/components/TheCharts'
import { data as chartData } from '~/composables/cardChartData'
import type { Props } from '~/composables/indexChartOptions'
import { getOption } from '~/composables/indexChartOptions'

const url = new URL('~/assets/images/image.png', import.meta.url).href
const series = [
  {
    data: chartData,
    type: 'line',
    smooth: 0.5,
    // 线条渐变
    lineStyle: {
      normal: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: 'rgba(239, 246, 255, 0.102)',
          },
          {
            offset: 0.5,
            color: '#EFF6FF',
          },
          {
            offset: 1,
            color: 'rgba(239, 246, 255, 0.102)',
          },
        ]),
      },
    },
    // 渐变填充
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(239, 246, 255, 0.0)',
        }, {
          offset: 1,
          color: 'rgba(239, 246, 255, 0.0784)',
        }],
        globalCoord: false,
      },
    },
    // 拐点
    itemStyle: {
      normal: {
        color: '#fff',
        borderColor: '#000000',
        borderWidth: 16,
      },
      emphasis: {
        color: '#000000',
      },
    },
  },
]

const chartProps: Props = {
  grid: {
    left: '0',
    right: '0',
    top: '10%',
    containLabel: true,
  },
  series,
  graphic: [
    {
      type: 'image',
      id: 'bg',
      right: 'center',
      top: '0%',
      z: 0,
      bounding: 'all',
      style: {
        image: url,
        width: 300,
        height: 200,
      },
    },
  ],
}
</script>

<template>
  <div h-50 overflow-hidden rounded-2xl bg-card-color>
    <div flex="~ gap2 wrap" justify-between px-4>
      <div>
        <div mt-5 text-sm text-card>
          BTC/USDT
        </div>
        <div mt-4 text-left text-xl text-card>
          +8.23%
        </div>
      </div>
      <div w="87px" h="36px" flex="~" mr-4 mt-4 items-center justify-around rounded-lg bg-white:12 p3>
        <div text-xs text-card font-normal>
          较昨日
        </div>
        <div i-carbon:chevron-down h-1.5rem w-1.5rem bg-white />
      </div>
    </div>
    <div h-full overflow-hidden>
      <TheCharts :option="getOption(chartProps as Props)" dom="card-charts" />
    </div>
  </div>
</template>
