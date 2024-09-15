<script setup lang="ts">
const props = defineProps<{
  current: number
  k: boolean
}>()

const { t } = useI18n()
const { current, k } = props

const router = useRouter()

function style(isShow: boolean) {
  return isShow ? 'bg-menu-selected text-white' : ''
}

function toTrading(current: number) {
  router.push(`/trading/week/${current}`)
}

function fluctuation(current: number) {
  router.push(`/fluctuation/week/${current}`)
}
</script>

<template>
  <!-- <div flex="~" justify-center> -->
  <div flex="~" h6.5 rounded-full bg-menu text-sm>
    <div :class="style(k)" flex="~" w10 items-center justify-center rounded-full @click="toTrading(current)">
      {{ t('trading.k_line') }}
    </div>
    <div :class="style(!k)" w10 flex="~" items-center justify-center rounded-full @click="fluctuation(current)">
      {{ t('trading.undulate') }}
    </div>
  </div>
  <!-- </div> -->
</template>
