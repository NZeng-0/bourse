<script setup lang="ts">
defineProps<{
  index: number
}>()

const { t } = useI18n()

const data = [
  {
    icon: new URL('~/assets/images/footer/home.png', import.meta.url).href,
    name: t('footer.index'),
    pointTo: '/',
    onlyIcon: false,
  },
  {
    icon: new URL('~/assets/images/footer/assets.png', import.meta.url).href,
    name: t('footer.assets'),
    pointTo: '/order/to-hold',
    onlyIcon: false,
  },
  {
    icon: new URL('~/assets/images/footer/nav_item.png', import.meta.url).href,
    name: '',
    pointTo: '/',
    onlyIcon: true,
  },
  {
    icon: new URL('~/assets/images/footer/manage_money.png', import.meta.url).href,
    name: t('footer.fortune'),
    pointTo: '/grow/solution',
    onlyIcon: false,
  },
  {
    icon: new URL('~/assets/images/footer/me.png', import.meta.url).href,
    name: t('footer.me'),
    pointTo: '/me',
    onlyIcon: false,
  },
]
</script>

<template>
  <div flex="~" absolute fixed inset-x-0 bottom--1 z10 h16.5 w-full items-center justify-around border-y bg-white>
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
