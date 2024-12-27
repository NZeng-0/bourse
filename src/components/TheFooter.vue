<script setup lang="ts">
import { getFrontMenuConfig } from '~/api'
import type { configlist, footerItem } from '~/types'
import { useBinding } from '~/store/useBinding'
import { useFooter } from '~/store/useFooter'

defineProps<{
  index: number
}>()

const { t } = useI18n()
const icons = ref<configlist[]>([])
const bindings = ref<configlist[]>([])
const list = ref<footerItem[]>([])
const bindStore = useBinding()

const keys = [
  'front_menu_bottom_sy',
  'front_menu_bottom_cz',
  'front_menu_bottom_cc',
  'front_menu_bottom_kf',
  'front_menu_bottom_wd',
  'front_menu_bottom_tg',
]

const binding_key = [
  'front_menu_bank_from_xm',
  'front_menu_bank_from_yhmc',
  'front_menu_bank_from_khh',
  'front_menu_bank_from_yhkh',
  'front_menu_bank_from_zfmm',
  'front_menu_bank_from_qrzfmm',
]

async function getConf() {
  const { data } = await getFrontMenuConfig()
  const temp = data.value.data

  temp.forEach((e: configlist) => {
    if (keys.includes(e.key))
      icons.value.push(e)
    if (binding_key.includes(e.key))
      bindings.value.push(e)
  })

  list.value = [
    {
      icon: getIcon('front_menu_bottom_sy'),
      selectIcon: getIcon('front_menu_bottom_sy'),
      sort: getSort('front_menu_bottom_sy'),
      name: t('footer.index'),
      pointTo: '/',
    },
    {
      icon: getIcon('front_menu_bottom_cz'),
      selectIcon: getIcon('front_menu_bottom_cz'),
      sort: getSort('front_menu_bottom_cz'),
      name: t('footer.assets'),
      pointTo: '/menu/order/to-hold',
    },
    {
      icon: getIcon('front_menu_bottom_cc'),
      selectIcon: getIcon('front_menu_bottom_cc'),
      sort: getSort('front_menu_bottom_cc'),
      name: t('footer.serve'),
      pointTo: '/menu/serve',
    },
    {
      icon: getIcon('front_menu_bottom_kf'),
      selectIcon: getIcon('front_menu_bottom_kf'),
      sort: getSort('front_menu_bottom_kf'),
      name: t('footer.fortune'),
      pointTo: '/grow/solution',
    },
    {
      icon: getIcon('front_menu_bottom_wd'),
      selectIcon: getIcon('front_menu_bottom_wd'),
      sort: getSort('front_menu_bottom_wd'),
      name: t('footer.me'),
      pointTo: '/me',
    },
  ]

  list.value.sort((a: footerItem, b: footerItem) => a.sort - b.sort)
  useFooter.data = list.value
}

function getIcon(key: string) {
  let res = ''
  icons.value.forEach((e: configlist) => {
    if (e.key === key)
      res = `${baseUrl}/${e.value}`
  })
  return res
}

function getSort(key: string) {
  return icons.value.filter((e: configlist) => e.key === key)[0].sort
}

function getColor(index: number, key: number) {
  return { color: index === key ? '#4400FF' : '#9EA3AE' }
}

onMounted(async () => {
  await getConf()
  bindStore.list = bindings.value
})
</script>

<template>
  <div flex="~" absolute fixed inset-x-0 bottom--1 z10 h16.5 w-full items-center justify-around border-y bg-white>
    <template v-if="useFooter.data">
      <div v-for="(e, key) in useFooter.data" :key>
        <RouterLink :to="e.pointTo">
          <div flex="~" items-center justify-center>
            <img v-if="index === key" :src="e.selectIcon" h4.5 w4.5>
            <img v-else :src="e.icon" h4.5 w4.5>
          </div>
          <div flex="~" mt1 items-center justify-center text-xs :style="getColor(index, key)">
            {{ e.name }}
          </div>
        </RouterLink>
      </div>
    </template>
    <template v-else>
      <div v-for="(e, key) in list" :key>
        <RouterLink :to="e.pointTo">
          <div flex="~" items-center justify-center>
            <img v-if="index === key" :src="e.selectIcon" h4.5 w4.5>
            <img v-else :src="e.icon" h4.5 w4.5>
          </div>
          <div flex="~" mt1 items-center justify-center text-xs :style="getColor(index, key)">
            {{ e.name }}
          </div>
        </RouterLink>
      </div>
    </template>
  </div>
</template>
