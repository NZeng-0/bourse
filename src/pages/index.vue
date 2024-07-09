<script setup lang="ts" generic="T extends any, O extends any">
const done = ref(false)
const loading = ref(true)
let hideLoadingTimer: NodeJS.Timeout

setTimeout(() => {
  done.value = true
  hideLoadingTimer = setTimeout(() => {
    loading.value = false
    if (hideLoadingTimer)
      clearTimeout(hideLoadingTimer)
  }, 1200)
}, 2500)

onUnmounted(() => {
  if (hideLoadingTimer)
    clearTimeout(hideLoadingTimer)
})
</script>

<template>
  <div p="x-4 y-10">
    <TheCard />
    <ThePortfolio />
    <TheFooter :index="0" />
    <div v-if="loading">
      <TheLoading :done />
    </div>
  </div>
</template>
