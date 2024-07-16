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
  <div flex="~" h30 items-center justify-between rounded-b-2xl bg-white px6>
    <img src="../../assets/images/trading/back.png" h10 w10 @click="back()">
    <div class="text-5.5" text-center text-trading-title>
      {{ title }}
    </div>
    <div h10 w10 />
  </div>
</template>
