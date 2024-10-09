<script setup lang="ts">
import type { swipeType } from '~/types'

const { swipe } = defineProps<{
  swipe: swipeType[]
}>()
</script>

<template>
  <div overflow-hidden rounded-2xl>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, key) in swipe" :key>
        <img :src="item.value">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 200px;
    text-align: center;
    background-color: #39a9ed;
    height: 200px;
  }
</style>
