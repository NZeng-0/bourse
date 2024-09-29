import title from '../assets/images/me/menu/record.png'
import top_up from '../assets/images/me/menu/top-up.png'
import method from '../assets/images/me/menu/method.png'
import auth from '../assets/images/me/menu/auth.png'
import language from '../assets/images/me/menu/language.png'
import message from '../assets/images/me/menu/message.png'
import secure from '../assets/images/me/menu/secure.png'
import company from '../assets/images/me/menu/company.png'
import download from '../assets/images/me/menu/download.png'

export const menu = [
  {
    title: 'me.withdrawal_record.title',
    icon: title,
    right: ' ',
    to: 'withdraw',
  },
  {
    title: 'me.recharge_record.title',
    icon: top_up,
    right: ' ',
    to: 'top-up',
  },
  {
    title: 'order_trading',
    icon: title,
    right: ' ',
    to: 'order/to-hold',
  },
  {
    title: 'order_history',
    icon: top_up,
    right: ' ',
    to: 'order/history',
  },
  {
    title: 'me.payment_method.title',
    icon: method,
    right: ' ',
    to: 'payment',
  },
  {
    title: 'me.auth.title',
    icon: auth,
    right: ' ',
    to: 'auth',
  },
  {
    title: 'me.language.title',
    icon: language,
    right: 'me.language.current',
    to: 'language',
  },
  {
    title: 'me.message.title',
    icon: message,
    right: ' ',
    to: 'message/list',
  },
  {
    title: 'me.secure.title',
    icon: secure,
    right: ' ',
    to: 'secure',
  },
  {
    title: 'company.title',
    icon: company,
    right: ' ',
    to: 'company',
  },
  {
    title: 'me.download.title',
    icon: download,
    right: ' ',
    to: 'recommend',
  },
]
