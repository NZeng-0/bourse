<script setup lang="ts">
import TheCharts from './TheCharts'
import { list } from '~/composables/portfolioListData'

const grid = {
  height: '80%',
  bottom: '10%',
  cursor: 'pointer',
}

function getOptions(data: number[], range: number) {
  return [
    {
      data,
      type: 'line',
      smooth: 0.5,
      lineStyle: {
        color: getLineColor(range),
        width: 2,
      },
      symbol: 'none',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: range < 0 ? 'rgba(252,108,107,0)' : 'rgba(25,192,154, 0)',
          }, {
            offset: 1,
            color: range < 0 ? 'rgba(252,108,107,1)' : 'rgba(25,192,154, 1)',
          }],
          globalCoord: false,
        },
      },
    },
  ]
}

function getLineColor(range: number): string {
  return range > 0 ? '#19C09A' : '#FC6C6B'
}
</script>

<template>
  <div mt4.5 h80 overflow-y-scroll>
    <div v-for="(item, key) in list" :key :class="key !== 0 ? key === (list.length - 1) ? 'mt8 mb42' : 'mt8' : ''">
      <div flex="~ gap2" justify-between>
        <div flex="~ gap2" w="2/4">
          <img h-12 w-12 :src="item.icon">
          <div text-left>
            <div>{{ item.nameEN }}</div>
            <div>{{ item.nameZN }}</div>
          </div>
        </div>
        <div flex="~" justify-between w="2/4">
          <div h-full w-19>
            <TheCharts :grid :series="getOptions(item.chart, item.range)" :dom="`list-${key}`" />
          </div>
          <div>
            <div>￥{{ item.presentValue }}</div>
            <div flex="~" w-full justify-between text-right text-xs>
              <div
                :class="item.range > 0 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'"
                :style="{ color: item.range > 0 ? '#19c09a' : '#fc6c6b' }" ml h-1.2rem w-1.2rem
              />
              <div :style="{ color: item.range > 0 ? '#19c09a' : '#fc6c6b' }">
                {{ item.range }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
