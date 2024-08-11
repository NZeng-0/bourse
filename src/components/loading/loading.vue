<script setup lang="ts">
const currentIndex = ref(2)
const arr = [2, 0, 1, 3]
const index = ref(0)
const isShow = ref(false)

const timer = setInterval(() => {
  currentIndex.value = arr[index.value]
  index.value++
  if (index.value >= arr.length)
    index.value = 0
}, 100)

onUnmounted(() => {
  clearInterval(timer)
})

function getClass(current: number) {
  const res = currentIndex.value === current
  return res ? 'bg-#404fd7' : 'bg-#ecedfb'
}

function getBg() {
  return 'h27.5 w27.5 items-center justify-center rounded-2xl bg-white'
}

defineExpose({
  isShow,
})
</script>

<template>
  <div top="0" left="0" flex="~" fixed z100 h-screen wfull items-center justify-center bg-black:70>
    <div flex="~" :class="getBg()">
      <div v-if="isShow" flex="~ wrap" h11.5 w11.5 p0.6>
        <div m0.2 h4.5 w4.5 rounded-sm :class="getClass(0)" />
        <div m0.2 h4.5 w4.5 rounded-sm :class="getClass(1)" />
        <div m0.2 h4.5 w4.5 rounded-sm :class="getClass(2)" />
        <div m0.2 h4.5 w4.5 rounded-sm :class="getClass(3)" />
      </div>
      <div v-else flex="~ wrap" class="done" h11.5 w11.5 p0.6>
        <div m0.2 h4.5 w4.5 rounded-sm class="bg-#ecedfb" />
        <div m0.2 h4.5 w4.5 rounded-sm class="bg-#ecedfb" />
        <div m0.2 h4.5 w4.5 rounded-sm class="bg-#404fd7" />
        <div m0.2 h4.5 w4.5 rounded-sm class="bg-#ecedfb" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.done>div {
  animation: ball infinite both 0s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

.done>div:nth-child(1) {
  animation-delay: 0.51s;
}

.done>div:nth-child(2) {
  animation-delay: 0.68s;
}

.done>div:nth-child(3) {
  animation-delay: 0.34s;
}

.done>div:nth-child(4) {
  animation-delay: 0.85s;
}

@keyframes ball {
  0% {
    background-color: #ecedfb;
  }

  50% {
    background-color: #ecedfb;
  }

  100% {
    background-color: #404fd7;
  }
}
</style>
