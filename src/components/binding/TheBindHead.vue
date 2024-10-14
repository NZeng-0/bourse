<script setup lang="ts">
defineProps<{
  title: string
}>()

const route = useRouter()

function back() {
  route.push('/me')
}
</script>

<template>
  <div flex="~" h16 items-center justify-between rounded-b-2xl bg-white px6>
    <div w="1/8">
      <img src="../../assets/images/trading/back.png" h6.25 w6.25 @click="back()">
    </div>
    <div w="6/8" text-center>
      <div class="text-5.5" text-trading-title>
        {{ title }}
      </div>
    </div>
    <div w="1/8" />
  </div>
</template>
