<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import type { optionData } from '~/composables/candlestickChart'
import { getOption, splitData } from '~/composables/candlestickChart'
import { data as rawData } from '~/composables/candlestickData'

defineProps<{
  range: number
  url: string
  presentValue: number
  ud: number
}>()

const index = ref(14)
const data = ref<optionData>()
const selected = ref(2)

function onSelected(tar: number, idx: number) {
  index.value = idx
  selected.value = tar
}

function getBg(idx: number) {
  return selected.value === idx ? '#7751F1' : '#CBBCFB'
}

const options = ref({})
watchEffect(() => {
  data.value = splitData(rawData.slice(0, index.value))
  options.value = getOption(data.value!)
})

function returnOption() {
  return options.value
}
provide('changeData', returnOption)
</script>

<template>
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
      <img :src="url" h12 w12>
    </div>
  </div>
  <div flex="~" mt3 justify-between px4>
    <div :bg="getBg(0)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(0, 1)">
      1D
    </div>
    <div :bg="getBg(1)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(1, 7)">
      1W
    </div>
    <div :bg="getBg(2)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(2, 14)">
      1M
    </div>
    <div :bg="getBg(3)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(3, 19)">
      1Y
    </div>
    <div :bg="getBg(4)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(4, 37)">
      5Y
    </div>
  </div>
  <div h65 w-full>
    <TheCharts dom="canlestick" />
  </div>
</template>
