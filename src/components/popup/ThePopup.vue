<script setup lang="ts">
import { popupProps } from './type'

const props = defineProps(popupProps)

const isShow = ref(true)

function close() {
  props.onClose!()
}

onMounted(() => {
  isShow.value = true
})

defineExpose({
  isShow,
})
</script>

<template>
  <div v-if="isShow" top="0" left="0" flex="~" fixed z100 h-screen wfull items-center justify-center bg-black:70 p6>
    <div w-full rounded-2xl bg-white px3 pb7.5>
      <div flex="~" relative mt4.5 w-full justify-center text-center>
        <div text-center class="text-5.5 font-['youshe']" font-normal>
          {{ props.title }}
        </div>
        <div absolute right="0" flex="~" items-center justify-end @click="close()">
          <img src="../../assets/images/close.png" h6 w6>
        </div>
      </div>
      <div mt9.25 text="center lg" v-html="props.message" />
      <div mt10 wfull flex="~" justify-center>
        <button h7.5 w25 rounded-lg bg-btn-select text-white @click="close()">
          {{ props.submit }}
        </button>
      </div>
    </div>
  </div>
</template>
