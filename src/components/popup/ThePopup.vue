<script setup lang="ts">
import { popupProps } from './type'
import { usePopup } from '~/store/usePopupDay'

const { title, submit, message, onClose } = defineProps(popupProps)

const { t } = useI18n()

const proup = usePopup()

const isShow = ref(true)

function close() {
  onClose!()
}
function toDayUnDisplay() {
  proup.day = new Date(Date.now()).toISOString().split('T')[0]
  close()
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
    <div w-full rounded-2xl bg-white px3 pb7.5 text-black>
      <div flex="~" relative mt4.5 w-full justify-center text-center>
        <div text-center class="text-5.5 font-['youshe']" font-normal>
          {{ title }}
        </div>
        <div absolute right="0" flex="~" items-center justify-end @click="close()">
          <img src="../../assets/images/close.png" h6 w6>
        </div>
      </div>
      <div mt9.25 text="center lg" v-html="message" />
      <div mt10 wfull flex="~" justify-around>
        <button h7.5 w25 rounded-lg bg-btn-select text-white @click="close()">
          {{ submit }}
        </button>
        <button class="unDisplay" @click="toDayUnDisplay">
          {{ t('notShow') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unDisplay {
  width: 7.143rem;
  height: 2.143rem;
  border-radius: 0.571rem;
  opacity: 1;
  border: 0.071rem solid #7751F1;
  font-size: 1.286rem;
  font-weight: normal;
  line-height: 1.286rem;
  letter-spacing: 0rem;
  color: #7751F1;
  -webkit-text-stroke: rgba(0, 0, 0, 0) 0.071rem;
}
</style>
