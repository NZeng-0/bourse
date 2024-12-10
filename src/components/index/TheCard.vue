<script setup lang="ts">
import type { swipeType } from '~/types'

const { swipe } = defineProps<{
  swipe: swipeType[]
}>()

function error(id: number) {
  for (const item of swipe) {
    if (item.id === id)
      item.value = new URL('../../assets/images/swipe/1.png', import.meta.url).href
  }
}
</script>

<template>
  <div overflow-hidden rounded-2xl>
    <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="(item, key) in swipe" :key>
        <img :src="item.value" h-full w-full @error="error(item.id)">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style>
.my-swipe .van-swipe-item {
  font-size: 1.429rem;
  text-align: center;
  height: 12.5rem;
  background: #eee;
  width: 23.357rem;
}
</style>
