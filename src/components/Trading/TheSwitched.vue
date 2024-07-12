<script setup lang="ts">
const props = defineProps<{
  current: string
  k: boolean
}>()

const { t } = useI18n()
const { current, k } = props

const router = useRouter()

function style(isShow: boolean) {
  return isShow ? 'bg-menu-selected text-white' : ''
}

function toTrading(current: string) {
  router.push(`/trading/week/${current}`)
}

function fluctuation(current: string) {
  router.push(`/fluctuation/week/${current}`)
}
</script>

<template>
  <div flex="~" wfull justify-center>
    <div flex="~" mt5 h6.5 w40 rounded-full bg-menu text-sm>
      <div :class="style(k)" flex="~" w="1/2" items-center justify-center rounded-full @click="toTrading(current)">
        {{ t('trading.k_line') }}
      </div>
      <div :class="style(!k)" w="1/2" flex="~" items-center justify-center rounded-full @click="fluctuation(current)">
        {{ t('trading.undulate') }}
      </div>
    </div>
  </div>
</template>
