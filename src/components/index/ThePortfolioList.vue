<script setup lang="ts">
import { list } from '~/composables/portfolioListData'
</script>

<template>
  <div flex="~ gap2 nowrap" mt-4 w-full items-start overflow-x-scroll scroll-smooth>
    <div v-for="(item, key) in list" :key mr-4 h37 w51 shrink-0 rounded-2xl bg-zinc-100 p1>
      <div flex="~">
        <div ml-4.5 mt-4>
          <img h-12 w-12 :src="item.icon">
        </div>
        <div ml-2 mt-5 text-left>
          <div text-portolio-primary text-sm font-normal>
            {{ item.nameEN }}
          </div>
          <div text-portolio mt-2 text-xs font-normal>
            {{ item.nameZN }}
          </div>
        </div>
      </div>
      <div text-portolio ml-4 mt5 text-left text-sm font-normal>
        涨幅
      </div>
      <div flex="~ gap2 wrap">
        <div text-portolio-primary ml-4 text-left text-lg>
          ￥{{ item.presentValue }}
        </div>
        <div flex="~" h-8 w-19 items-center justify-center rounded-xl bg-white>
          <div :class="item.range > 0 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'" :style="{ color: item.range > 0 ? '#19c09a' : '#fc6c6b' }" h-1.2rem w-1.2rem />
          <span text-xs :style="{ color: item.range > 0 ? '#19c09a' : '#fc6c6b' }">
            {{ item.range }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
