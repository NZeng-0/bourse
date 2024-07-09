<script setup lang="ts">
const props = defineProps<{
  index: string
  selected: string
}>()

const route = useRouter()

function go(uri: string) {
  route.push(`/buy/${uri}/${props.index}`)
}
</script>

<template>
  <button h10 w37.5 rounded-lg :class="props.selected" text-base text-white @click="go('up')">
    买涨
  </button>
  <button h10 w37.5 rounded-lg bg-btn text-base text-btn @click="go('down')">
    买跌
  </button>
</template>
