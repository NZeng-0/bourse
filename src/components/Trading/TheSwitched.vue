<script setup lang="ts">
const props = defineProps<{
  k: boolean
}>()

const { t } = useI18n()
const { k } = props

const router = useRouter()

function style(isShow: boolean) {
  return isShow ? 'bg-menu-selected text-white' : ''
}

function go(url: string) {
  router.push(url)
}
</script>

<template>
  <!-- <div flex="~" justify-center> -->
  <div flex="~" h6.5 rounded-full bg-menu text-sm>
    <div :class="style(k)" flex="~" w10 items-center justify-center rounded-full @click="go('fund')">
      {{ t('trading.k_line') }}
    </div>
    <div :class="style(!k)" w10 flex="~" items-center justify-center rounded-full @click="go('fluctuation')">
      {{ t('trading.undulate') }}
    </div>
  </div>
  <!-- </div> -->
</template>
