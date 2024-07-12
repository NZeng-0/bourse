<script setup lang="ts">
const props = defineProps<{
  index: string
  selected: string
}>()

const { t } = useI18n()

const route = useRouter()

function go(uri: string) {
  route.push(`/buy/${uri}/${props.index}`)
}
</script>

<template>
  <button h10 w37.5 rounded-lg :class="props.selected" text-base text-white @click="go('up')">
    {{ t('trading.buy_up') }}
  </button>
  <button h10 w37.5 rounded-lg bg-btn text-base text-btn @click="go('down')">
    {{ t('trading.buy_to_fall') }}
  </button>
</template>
