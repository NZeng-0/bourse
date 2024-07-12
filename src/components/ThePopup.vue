<script setup lang="ts">
const { t } = useI18n()
const isShow = ref(true)

function close() {
  isShow.value = false
}
</script>

<template>
  <div v-if="isShow" top="0" left="0" flex="~" fixed z100 h-screen wfull items-center justify-center bg-black:70 p6>
    <div h59.3 w-full rounded-2xl bg-white px3 class="font-['PingFang_SC']">
      <div flex="~" mt4.5 w-full justify-between>
        <div w="1/3" />
        <div w="1/3" text-center class="text-5.5 font-['youshe']" font-normal>
          {{ t('popup.notice') }}
        </div>
        <div w="1/3" flex="~" items-center justify-end @click="close()">
          <img src="../assets/images/close.png" h6 w6>
        </div>
      </div>
      <div mt9>
        <p text-lg>
          {{ t('popup.content') }}
        </p>
      </div>
      <div mt10 wfull flex="~" justify-center>
        <button h7.5 w25 rounded-lg bg-btn-select text-white @click="close()">
          {{ t('popup.confrim') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  word-break: break-all;
  text-indent: 2em;
  font-variation-settings: "opsz" auto;
}
</style>
