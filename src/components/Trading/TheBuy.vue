<script setup lang="ts">
const { id, selected } = defineProps<{
  id: number
  selected: string
}>()

const { t } = useI18n()

const route = useRouter()

function go(uri: string) {
  route.push(`/buy/${uri}/${id}`)
}
</script>

<template>
  <button h10 min-w37.5 rounded-lg px2 :class="selected" text-base text-white @click="go('up')">
    {{ t('trading.buy_up') }}
  </button>
  <button h10 min-w37.5 rounded-lg bg-btn px2 text-base text-btn @click="go('down')">
    {{ t('trading.buy_to_fall') }}
  </button>
</template>
