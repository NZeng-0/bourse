<script setup lang="ts">
const { dom, option } = defineProps<{
  dom: string
  option: object
}>()

let myChart: any

function init() {
  const internalInstance = getCurrentInstance()
  const echarts = internalInstance!.appContext.config.globalProperties.$echarts
  const _dom = document.querySelector(`.${dom}`)
  myChart = echarts.init(_dom)
  myChart.setOption(option, true)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

function dispose() {
  window.removeEventListener('resize', myChart.resize)
  myChart.dispose()
}

function updateChart() {
  if (myChart)
    myChart.setOption(option, true)
}

watch(
  () => option,
  () => {
    updateChart()
  },
  { deep: true },
)

onMounted(() => {
  init()
  document.querySelector(`.${dom}`)?.setAttribute('_echarts_instance_', '')
})

onBeforeUnmount(() => {
  dispose()
})
</script>

<template>
  <div :class="dom" style="height: 100%; width: 100%" />
</template>

<style scoped></style>
