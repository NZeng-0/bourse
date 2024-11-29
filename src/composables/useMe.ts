import language from '../assets/images/me/menu/language.png'
import company from '../assets/images/me/menu/company.png'
import download from '../assets/images/me/menu/download.png'
import type { menuType } from '~/types'
import { getFrontMenuConfig } from '~/api'

interface menuItem {
  title: string
  icon: string
  right: string
  to: string
  class: boolean
  show: boolean
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
      title: 'me.withdrawal_record.title',
      icon: getIcon('front_menu_mine_txjl'),
      right: ' ',
      to: 'withdraw',
      class: false,
      show: isShow('front_menu_mine_txjl'),
    },
    {
      title: 'me.recharge_record.title',
      icon: getIcon('front_menu_mine_czjl'),
      right: ' ',
      to: 'top-up',
      class: false,
      show: isShow('front_menu_mine_czjl'),
    },
    {
      title: 'order_trading',
      icon: getIcon('front_menu_mine_zxgg'),
      right: ' ',
      to: 'order/to-hold',
      class: false,
      show: isShow('front_menu_mine_zxgg'),
    },
    {
      title: 'order_history',
      icon: getIcon('front_menu_mine_czjl'),
      right: ' ',
      to: 'order/history',
      class: false,
      show: isShow('front_menu_mine_czjl'),
    },
    {
      title: 'me.payment_method.title',
      icon: getIcon('front_menu_mine_yhk'),
      right: ' ',
      to: 'payment',
      class: false,
      show: isShow('front_menu_mine_yhk'),
    },
    {
      title: 'me.auth.title',
      icon: getIcon('front_menu_mine_smrz'),
      right: ' ',
      to: 'auth',
      class: false,
      show: isShow('front_menu_mine_smrz'),
    },
    {
      title: 'me.language.title',
      icon: language,
      right: 'me.language.current',
      to: 'language',
      class: false,
      show: isShow('front_menu_mine_czjl'),
    },
    {
      title: 'me.message.notice',
      icon: getIcon('front_menu_mine_zxgg'),
      right: ' ',
      to: 'message/list',
      class: true,
      show: isShow('front_menu_mine_zxgg'),
    },
    {
      title: 'me.secure.title',
      icon: getIcon('front_menu_mine_zhaq'),
      right: ' ',
      to: 'secure',
      class: false,
      show: isShow('front_menu_mine_zhaq'),
    },
    {
      title: 'company.title',
      icon: company,
      right: ' ',
      to: 'company',
      class: false,
      show: isShow('front_menu_mine_czjl'),
    },
    {
      title: 'me.download.title',
      icon: download,
      right: ' ',
      to: 'download',
      class: false,
      show: isShow('front_menu_mine_czjl'),
    },
    {
      title: 'recommend.title',
      icon: getIcon('front_menu_mine_tgm'),
      right: ' ',
      to: 'recommend',
      class: false,
      show: isShow('front_menu_mine_tgm'),
    },
  ]
}

function getIcon(key: string) {
  const res = icons.value.filter((e: menuType) => e.key === key)[0]
  return `${baseUrl}/${res.value}`
}

function isShow(key: string) {
  const res = icons.value.filter((e: menuType) => e.key === key)[0]
  return res.status !== 0
}

// 调用 getConf 以获取配置
getConf()

export default menu
