<script setup lang="ts">
import { messageProps } from './type'

const props = defineProps(messageProps)

const visibled = ref(true)

// 打开消息
function startTimer() {
  setTimeout(() => {
    visibled.value = true
  }, 10)

  // 指定时间后移除消息
  if (props.duration !== 0) {
    setTimeout(() => {
      props.onClose!()
    }, props.duration)
  }
}

onMounted(() => {
  startTimer()
  visibled.value = true
})

defineExpose({
  visibled,
})
</script>

<template>
  <Transition name="slide-fade">
    <div v-show="visibled" flex="~" top="0" left="0" items-centr fixed z100 h-screen w-full justify-center pt7.5>
      <div flex="~" text="lg #595959" h10 items-center justify-center rounded-md bg-white px2 shadow-black:15 shadow-xl>
        {{ message }}
      </div>
    </div>
  </Transition>
</template>

<style>
.slide-fade-enter-active {
  transition: all .2s ease-out;
}

.slide-fade-leave-active {
  transition: all .2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
