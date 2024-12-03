import type { menuType } from '~/types'
import { getFrontMenuConfig } from '~/api'

interface menuItem {
  title: string
  icon: string
  right: string
  to: string
  class: boolean
  show: boolean
  sort: number
}

const keys = [
  'front_menu_mine_pccx',
  'front_menu_mine_szmx',
  'front_menu_mine_zxgg',
  'front_menu_mine_yhk',
  'front_menu_mine_tgm',
  'front_menu_mine_yeb',
  'front_menu_mine_zhaq',
  'front_menu_mine_znxx',
  'front_menu_mine_czjl',
  'front_menu_mine_txjl',
  'front_menu_mine_tcdl',
  'front_menu_mine_smrz',
]

const icons = ref<menuType[]>([])
const menu = ref<menuItem[]>([])

async function getConf() {
  const { data } = await getFrontMenuConfig()
  const temp = data.value.data

  temp.forEach((e: menuType) => {
    if (keys.includes(e.key))
      icons.value.push(e)
  })

  menu.value = [
    {
      title: getRemark('front_menu_mine_txjl'),
      icon: getIcon('front_menu_mine_txjl'),
      right: ' ',
      to: 'withdraw',
      class: false,
      show: isShow('front_menu_mine_txjl'),
      sort: getSort('front_menu_mine_txjl'),
    },
    {
      title: getRemark('front_menu_mine_czjl'),
      icon: getIcon('front_menu_mine_czjl'),
      right: ' ',
      to: 'top-up',
      class: false,
      show: isShow('front_menu_mine_czjl'),
      sort: getSort('front_menu_mine_czjl'),
    },
    {
      title: getRemark('front_menu_mine_yhk'),
      icon: getIcon('front_menu_mine_yhk'),
      right: ' ',
      to: 'order/history',
      class: false,
      show: isShow('front_menu_mine_yhk'),
      sort: getSort('front_menu_mine_yhk'),
    },
    {
      title: getRemark('front_menu_mine_smrz'),
      icon: getIcon('front_menu_mine_smrz'),
      right: ' ',
      to: 'auth',
      class: false,
      show: isShow('front_menu_mine_smrz'),
      sort: getSort('front_menu_mine_smrz'),
    },
    {
      title: getRemark('front_menu_mine_pccx'),
      icon: getIcon('front_menu_mine_pccx'),
      right: 'me.language.current',
      to: 'language',
      class: false,
      show: isShow('front_menu_mine_pccx'),
      sort: getSort('front_menu_mine_pccx'),
    },
    {
      title: getRemark('front_menu_mine_znxx'),
      icon: getIcon('front_menu_mine_znxx'),
      right: ' ',
      to: 'message/list',
      class: true,
      show: isShow('front_menu_mine_znxx'),
      sort: getSort('front_menu_mine_znxx'),
    },
    {
      title: getRemark('front_menu_mine_zhaq'),
      icon: getIcon('front_menu_mine_zhaq'),
      right: ' ',
      to: 'secure',
      class: false,
      show: isShow('front_menu_mine_zhaq'),
      sort: getSort('front_menu_mine_zhaq'),
    },
    {
      title: getRemark('front_menu_mine_zxgg'),
      icon: getIcon('front_menu_mine_zxgg'),
      right: ' ',
      to: 'company',
      class: false,
      show: isShow('front_menu_mine_zxgg'),
      sort: getSort('front_menu_mine_zxgg'),
    },
    {
      title: getRemark('front_menu_mine_tcdl'),
      icon: getIcon('front_menu_mine_tcdl'),
      right: ' ',
      to: 'download',
      class: false,
      show: isShow('front_menu_mine_tcdl'),
      sort: getSort('front_menu_mine_tcdl'),
    },
    {
      title: getRemark('front_menu_mine_tgm'),
      icon: getIcon('front_menu_mine_tgm'),
      right: ' ',
      to: 'payment',
      class: false,
      show: isShow('front_menu_mine_tgm'),
      sort: getSort('front_menu_mine_tgm'),
    },
    {
      title: getRemark('front_menu_mine_szmx'),
      icon: getIcon('front_menu_mine_szmx'),
      right: ' ',
      to: 'recommend',
      class: false,
      show: isShow('front_menu_mine_szmx'),
      sort: getSort('front_menu_mine_szmx'),
    },
  ]
  menu.value.sort((a: menuItem, b: menuItem) => a.sort - b.sort)
}

function getIcon(key: string) {
  const res = icons.value.filter((e: menuType) => e.key === key)[0]
  return `${baseUrl}/${res.value}`
}

function isShow(key: string) {
  const res = icons.value.filter((e: menuType) => e.key === key)[0]
  return res.status !== 0
}

function getSort(key: string) {
  return icons.value.filter((e: menuType) => e.key === key)[0].sort
}

function getRemark(key: string) {
  return icons.value.filter((e: menuType) => e.key === key)[0].remark
}

// 调用 getConf 以获取配置
getConf()

export default menu
