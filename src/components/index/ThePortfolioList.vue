<script setup lang="ts">
import { menuData as list } from '~/composables/portfolioListData'

const router = useRouter()

function getIcon(range: number) {
  return range > 0 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'
}

function getColor(range: number) {
  return range > 0 ? '#19c09a' : '#fc6c6b'
}

function go(key: number) {
  router.push(`/trading/${key}`)
}
</script>

<template>
  <div flex="~ gap2 nowrap" mt-4 w-full items-start overflow-x-scroll overflow-y-hidden scroll-smooth>
    <div v-for="(item, key) in list" :key mr-4 h37 w51 shrink-0 rounded-2xl bg-zinc-100 p1 @click="go(key)">
      <div flex="~">
        <div ml-4.5 mt-4>
          <img h-12 w-12 :src="item.icon">
        </div>
        <div ml-2 mt-5 text-left>
          <div text-sm text-portolio-primary font-normal>
            {{ item.nameEN }}
          </div>
          <div mt-2 text-xs text-portolio font-normal>
            {{ item.nameZH }}
          </div>
        </div>
      </div>
      <div ml4 mt5 text-sm text-portolio font-normal>
        涨幅
      </div>
      <div flex="~ gap2 wrap" ml4 justify-between>
        <div text-left text-lg text-portolio-primary>
          ￥{{ item.presentValue }}
        </div>
        <div flex="~" mb5 mr1 h-8 w19 items-center justify-center rounded-xl bg-white>
          <div :class="getIcon(item.range)" :style="{ color: getColor(item.range) }" h-1.2rem w-1.2rem />
          <span text-xs :style="{ color: item.range > 0 ? '#19c09a' : '#fc6c6b' }">
            {{ item.range }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
