<script setup lang="ts">
defineProps<{
  index: number
}>()

const { t } = useI18n()

const data = [
  {
    icon: new URL('~/assets/images/footer/home.png', import.meta.url).href,
    selectIcon: new URL('~/assets/images/footer/select/home.png', import.meta.url).href,
    name: t('footer.index'),
    pointTo: '/',
  },
  {
    icon: new URL('~/assets/images/footer/hold.png', import.meta.url).href,
    selectIcon: new URL('~/assets/images/footer/select/hold.png', import.meta.url).href,
    name: t('footer.assets'),
    pointTo: '/menu/order/to-hold',
  },
  {
    icon: new URL('~/assets/images/footer/serve.png', import.meta.url).href,
    selectIcon: new URL('~/assets/images/footer/select/serve.png', import.meta.url).href,
    name: '客服',
    pointTo: '/menu/serve',
  },
  {
    icon: new URL('~/assets/images/footer/financing.png', import.meta.url).href,
    selectIcon: new URL('~/assets/images/footer/select/financing.png', import.meta.url).href,
    name: t('footer.fortune'),
    pointTo: '/grow/solution',
  },
  {
    icon: new URL('~/assets/images/footer/me.png', import.meta.url).href,
    selectIcon: new URL('~/assets/images/footer/select/me.png', import.meta.url).href,
    name: t('footer.me'),
    pointTo: '/me',
  },
]
</script>

<template>
  <div flex="~" absolute fixed inset-x-0 bottom--1 z10 h16.5 w-full items-center justify-around border-y bg-white>
    <div v-for="(item, key) in data" :key>
      <RouterLink :to="item.pointTo">
        <div flex="~" items-center justify-center>
          <img v-if="index === key" :src="item.selectIcon" h4.5 w4.5>
          <img v-else :src="item.icon" h4.5 w4.5>
        </div>
        <div flex="~" mt1 items-center justify-center text-xs :style="{ color: index === key ? '#4400FF' : '#9EA3AE' }">
          {{ item.name }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>
