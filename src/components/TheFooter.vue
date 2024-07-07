<script setup lang="ts">
import { data } from '~/composables/footerData'

defineProps<{
  index: number
}>()
</script>

<template>
  <div flex="~" absolute fixed inset-x-0 bottom-0 z10 h16.5 w-full items-center justify-around border-y bg-white>
    <div v-for="(item, key) in data" :key>
      <RouterLink :to="item.pointTo">
        <div flex="~" items-center justify-center>
          <img v-if="!item.onlyIcon" :src="item.icon" h4.5 w4.5>
          <img v-else :src="item.icon" h11 w11>
        </div>
        <div flex="~" mt1 items-center justify-center text-xs :style="{ color: index === key ? '#4400FF' : '#9EA3AE' }">
          {{ item.name }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>
