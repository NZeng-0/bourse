<script setup lang="ts">
import { useClipboard } from '~/composables/useClipboard'

const route = useRouter()
const { t } = useI18n()

const code = ref('ST0CK15')

function getCodeStyle() {
  return 'code text-#673BF6 items-center border-l pl3.75 text-sm'
}

function back() {
  route.back()
}
</script>

<template>
  <div>
    <div flex="~" h16 items-center justify-between bg-white px6>
      <img src="../../../assets/images/trading/back.png" h6.25 w6.25 @click="back()">
      <div class="text-5.5" text-center text-trading-title>
        {{ t('recommend.title') }}
      </div>
      <div h10 w10 />
    </div>
    <div mt8.75 px6 text-base>
      <div flex="~" justify-center>
        <div class="bg" flex="~" mt10 h50 w50 items-center justify-center>
          <img src="../../../assets/images/recommend/gift.png" h29 w24.975>
        </div>
      </div>
      <div mt10 class="text-5.5" text-center>
        {{ t('recommend.content') }}
      </div>
      <div mt3.75 text-center text-sm class="text-#9EA3AE">
        {{ t('recommend.first') }}
        <span class="text-#673BF6">
          {{ t('recommend.reward') }}
        </span>
        {{ t('recommend.last') }}
      </div>
      <div mt13.5>
        <div class="border-#eeeeee" flex="~" border-box h14 items-center justify-between border rounded-2xl px6>
          <div text-base class="text-#121826">
            {{ code }}
          </div>
          <div :class="getCodeStyle()" flex="~" :data-clipboard-text="code" @click="useClipboard('code', t('copySuccess'))">
            <img src="../../../assets/images/recommend/copy.png" mr2 h6 w6>
            {{ t('recommend.copy') }}
          </div>
        </div>
      </div>
      <div flex="~" mt4 justify-center>
        <button h14 wfull rounded-lg bg-btn-select text-white>
          {{ t('recommend.share') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background: url(../../../assets/images/recommend/bg.png);
  background-size: cover;
}
</style>
