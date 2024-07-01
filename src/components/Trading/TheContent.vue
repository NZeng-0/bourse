<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import { getOption, splitData } from '~/composables/candlestickChart'
import { data as rawData } from '~/composables/candlestickData'

const data = splitData(rawData)

const selected = ref(0)
const url = new URL('~/assets/images/BTC.png', import.meta.url).href
const range = ref(11)
</script>

<template>
  <div h-full bg-trading>
    <div flex="~" wfull justify-center>
      <div flex="~" mt5 h6.5 w40 rounded-full bg-menu text-sm>
        <div
          :class="selected === 0 ? 'bg-menu-selected' : ''" w="1/2" flex="~" items-center justify-center rounded-full
          :style="{ color: selected === 0 ? '#F9FAFB' : '#121826' }" @click="selected = 0"
        >
          K线
        </div>
        <div
          w="1/2" flex="~" items-center justify-center rounded-full :class="selected === 1 ? 'bg-menu-selected' : ''"
          :style="{ color: selected === 1 ? '#F9FAFB' : '#121826' }" @click="selected = 1"
        >
          波动
        </div>
      </div>
    </div>
    <div flex="~" mt5.5 wfull justify-between px-4>
      <div>
        <div text-3xl>
          326,23
        </div>
        <div
          flex="~" text-xs
          :style="{ color: range > 0 ? '#19c09a' : '#fc6c6b' }"
        >
          <div :class="range > 0 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'" h-1.2rem w-1.2rem />
          <div>65.63 (76.32%)</div>
        </div>
      </div>
      <div mr-2.5>
        <img :src="url" h12 w12>
      </div>
    </div>
    <div flex="~" mt3 justify-between px4>
      <div bg="#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl text-sm>
        1D
      </div>
      <div bg="#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl text-sm>
        1W
      </div>
      <div bg="#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl text-sm>
        1M
      </div>
      <div bg="#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl text-sm>
        1Y
      </div>
      <div bg="#CBBCFB" flex="~" h8 w13 items-center justify-center rounded-xl text-sm>
        5Y
      </div>
    </div>
    <div h65 w-full>
      <TheCharts dom="canlestick" :option="getOption(data)" />
    </div>
  </div>
</template>
