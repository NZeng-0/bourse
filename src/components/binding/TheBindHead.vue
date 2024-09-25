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
    <div w="1/8">
      <img src="../../assets/images/trading/back.png" h10 w10 @click="back()">
    </div>
    <div w="6/8" text-center>
      <div class="text-5.5" text-trading-title>
        {{ title }}
      </div>
    </div>
    <div w="1/8" />
  </div>
</template>
