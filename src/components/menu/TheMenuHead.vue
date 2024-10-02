<script setup lang="ts">
defineProps<{
  title: string
}>()

const route = useRouter()

function back() {
  route.back()
}
</script>

<template>
  <div flex="~" h16 items-center justify-between rounded-b-2xl bg-white px6>
    <img src="../../assets/images/trading/back.png" h6.25 w6.25 @click="back()">
    <div text="center lg" text-trading-title>
      {{ title }}
    </div>
    <div h10 w10 />
  </div>
</template>
