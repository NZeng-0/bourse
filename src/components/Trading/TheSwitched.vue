<script setup lang="ts">
const { k, id } = defineProps<{
  k: boolean
  id: number
}>()

const { t } = useI18n()

const router = useRouter()

function style(isShow: boolean) {
  return isShow ? 'bg-menu-selected text-white' : ''
}

function go(url: string) {
  router.push(`/${url}/${id}`)
}
</script>

<template>
  <div flex="~" h6.5 rounded-full bg-menu text-sm>
    <div :class="style(k)" flex="~" w10 items-center justify-center rounded-full @click="go('fund')">
      {{ t('trading.k_line') }}
    </div>
    <div :class="style(!k)" w10 flex="~" items-center justify-center rounded-full @click="go('fluctuation')">
      {{ t('trading.undulate') }}
    </div>
  </div>
</template>
