import title from '../assets/images/me/menu/record.png'
import top_up from '../assets/images/me/menu/top-up.png'
import method from '../assets/images/me/menu/method.png'
import auth from '../assets/images/me/menu/auth.png'
import language from '../assets/images/me/menu/language.png'
import message from '../assets/images/me/menu/message.png'
import secure from '../assets/images/me/menu/secure.png'
import company from '../assets/images/me/menu/company.png'
import download from '../assets/images/me/menu/download.png'
import recommend from '../assets/images/me/menu/recommend.png'
import type { menuType } from '~/types'
import { getFrontMenuConfig } from '~/api'

interface menuItem {
  title: string
  icon: string
  right: string
  to: string
  class: boolean
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
      icon: getIcon('front_menu_mine_txjl') || title,
      right: ' ',
      to: 'withdraw',
      class: false,
    },
    {
      title: 'me.recharge_record.title',
      icon: getIcon('front_menu_mine_czjl') || top_up,
      right: ' ',
      to: 'top-up',
      class: false,
    },
    {
      title: 'order_trading',
      icon: getIcon('front_menu_mine_txjl') || title,
      right: ' ',
      to: 'order/to-hold',
      class: false,
    },
    {
      title: 'order_history',
      icon: getIcon('front_menu_mine_czjl') || top_up,
      right: ' ',
      to: 'order/history',
      class: false,
    },
    {
      title: 'me.payment_method.title',
      icon: method,
      right: ' ',
      to: 'payment',
      class: false,
    },
    {
      title: 'me.auth.title',
      icon: getIcon('front_menu_mine_smrz') || auth,
      right: ' ',
      to: 'auth',
      class: false,
    },
    {
      title: 'me.language.title',
      icon: language,
      right: 'me.language.current',
      to: 'language',
      class: false,
    },
    {
      title: 'me.message.notice',
      icon: getIcon('front_menu_mine_zxgg') || message,
      right: ' ',
      to: 'message/list',
      class: true,
    },
    {
      title: 'me.secure.title',
      icon: getIcon('front_menu_mine_zhaq') || secure,
      right: ' ',
      to: 'secure',
      class: false,
    },
    {
      title: 'company.title',
      icon: company,
      right: ' ',
      to: 'company',
      class: false,
    },
    {
      title: 'me.download.title',
      icon: download,
      right: ' ',
      to: 'download',
      class: false,
    },
    {
      title: 'recommend.title',
      icon: getIcon('front_menu_mine_tgm') || recommend,
      right: ' ',
      to: 'recommend',
      class: false,
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

// 调用 getConf 以获取配置
getConf()

export default menu
