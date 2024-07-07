<script setup lang="ts">
import TheCharts from '~/components/TheCharts'
import { getOption, setIndex } from '~/composables/candlestickChart'

defineProps<{
  range: number
  url: string
  presentValue: number
  ud: number
}>()

const selected = ref(2)
const option = ref()
function onSelected(tar: number, idx: number) {
  setIndex(idx)
  selected.value = tar
}

watchEffect(() => {
  option.value = getOption()
})

function getBg(idx: number) {
  return selected.value === idx ? 'bg-btn-select' : 'bg-btn-default'
}

function getRandom() {
  return `canlestick${Number.parseInt(`${Math.random() * 100}`)}`
}

onBeforeUnmount(() => {
  // dispose()
})
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
    <div :class="getBg(0)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(0, 1)">
      1D
    </div>
    <div :class="getBg(1)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(1, 7)">
      1W
    </div>
    <div :class="getBg(2)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(2, 14)">
      1M
    </div>
    <div :class="getBg(3)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(3, 25)">
      1Y
    </div>
    <div :class="getBg(4)" flex="~" h8 w13 items-center justify-center rounded-xl text-sm @click="onSelected(4, 37)">
      5Y
    </div>
  </div>
  <div h65 w-full>
    <TheCharts :dom="getRandom()" :option />
  </div>
</template>
