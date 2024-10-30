<script setup lang="ts">
import { getFrontMenuConfig } from '~/api'
import type { menuType } from '~/types'
import home from '~/assets/images/footer/select/home.png'
import hold from '~/assets/images/footer/select/hold.png'
import serve from '~/assets/images/footer/select/serve.png'
import financing from '~/assets/images/footer/select/financing.png'
import me from '~/assets/images/footer/select/me.png'

defineProps<{
  index: number
}>()

interface item {
  icon: string
  selectIcon: string
  name: string
  pointTo: string
}

const { t } = useI18n()
const icons = ref<menuType[]>([])
const list = ref<item[]>([])

const keys = [
  'front_menu_bottom_sy',
  'front_menu_bottom_cz',
  'front_menu_bottom_cc',
  'front_menu_bottom_kf',
  'front_menu_bottom_wd',
  'front_menu_bottom_tg',
]

async function getConf() {
  const { data } = await getFrontMenuConfig()
  const temp = data.value.data

  temp.forEach((e: menuType) => {
    if (keys.includes(e.key))
      icons.value.push(e)
  })

  list.value = [
    {
      icon: new URL('~/assets/images/footer/home.png', import.meta.url).href,
      selectIcon: getIcon('front_menu_bottom_sy') || home,
      name: t('footer.index'),
      pointTo: '/',
    },
    {
      icon: new URL('~/assets/images/footer/hold.png', import.meta.url).href,
      selectIcon: getIcon('front_menu_bottom_cc') || hold,
      name: t('footer.assets'),
      pointTo: '/menu/order/to-hold',
    },
    {
      icon: new URL('~/assets/images/footer/serve.png', import.meta.url).href,
      selectIcon: getIcon('front_menu_bottom_kf') || serve,
      name: '客服',
      pointTo: '/menu/serve',
    },
    {
      icon: new URL('~/assets/images/footer/financing.png', import.meta.url).href,
      selectIcon: getIcon('front_menu_bottom_lc') || financing,
      name: t('footer.fortune'),
      pointTo: '/grow/solution',
    },
    {
      icon: new URL('~/assets/images/footer/me.png', import.meta.url).href,
      selectIcon: getIcon('front_menu_bottom_wd') || me,
      name: t('footer.me'),
      pointTo: '/me',
    },
  ]
}

function getIcon(key: string) {
  let res = ''
  icons.value.forEach((e: menuType) => {
    if (e.key === key)
      res = `${baseUrl}/${e.value}`
  })
  return res
}

onMounted(async () => {
  await getConf()
})
</script>

<template>
  <div flex="~" absolute fixed inset-x-0 bottom--1 z10 h16.5 w-full items-center justify-around border-y bg-white>
    <div v-for="(item, key) in list" :key>
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
