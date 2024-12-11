import { getFrontMenuConfig, getUserInfo } from '~/api'
import type { menuType, registerTypes } from '~/types'

const inspect = new Map<string, boolean>()
const shows = ref<menuType[]>([])
const tips = new Map<string, string>()
tips.set('nickname', 'register.name')
tips.set('account', 'register.account')
tips.set('pwd', 'register.password')
tips.set('verify_pwd', 'register.confirm_pwd')
tips.set('operation_pwd', 'register.pay_pwd')
tips.set('idcard', 'register.id_card')
tips.set('phone', 'register.phone')
tips.set('spread_code', 'register.invitation_code')

const register_key = [
  'front_menu_from_xm',
  'front_menu_from_yhm',
  'front_menu_from_dlmm',
  'front_menu_from_qrdlmm',
  'front_menu_from_zfmm',
  'front_menu_from_qrzfmm',
  'front_menu_from_sfzh',
  'front_menu_from_sjhm',
  'front_menu_from_yqm',
]

export function useRegister() {
  function isUserFilled(user: registerTypes) {
    // 获取对象的所有键
    const keys = Object.keys(user)

    // 遍历每个键，检查对应的值是否为空
    for (const key of keys) {
      if (key === 'email')
        continue

      if (!inspect.get(key))
        continue

      // if (inspect.get(key))
      // 对于字符串类型的字段，检查是否为空字符串
      // 对于其他类型（如数字），可以根据需要调整检查逻辑
      if (typeof user[key] === 'string' && user[key].trim() === '')
        return tips.get(key)
    }
    // 如果所有字段都非空，返回true
    return null
  }

  function addRule(key: string) {
    // 使用字段的键（而不是值）作为映射的键
    switch (key) {
      case 'front_menu_from_xm':
        inspect.set('nickname', isShow(key))
        break
      case 'front_menu_from_yhm':
        inspect.set('account', isShow(key))
        break
      case 'front_menu_from_dlmm':
        inspect.set('pwd', isShow(key))
        break
      case 'front_menu_from_qrdlmm':
        inspect.set('verify_pwd', isShow(key))
        break
      case 'front_menu_from_zfmm':
        inspect.set('operation_pwd', isShow(key))
        break
      case 'front_menu_from_sfzh':
        inspect.set('idcard', isShow(key))
        break
      case 'front_menu_from_sjhm':
        inspect.set('phone', isShow(key))
        break
      case 'front_menu_from_yqm':
        inspect.set('spread_code', isShow(key))
        break
    }
  }

  function isShow(state: string) {
    const temp = shows.value.filter((e: menuType) => e.key === state)[0]
    return temp?.status !== 0
  }

  async function useShow() {
    const { data } = await getFrontMenuConfig()
    const temp = data.value.data

    temp.forEach((e: menuType) => {
      if (register_key.includes(e.key)) {
        addRule(e.key)
        shows.value.push(e)
      }
    })
  }

  function getClass() {
    return 'border-#E7E7E7 h12 w70 border rounded-2xl p6 text-black'
  }

  async function onLoginSuccessful() {
    const { data } = await getUserInfo()
    return data.value.data
  }

  return { useShow, isShow, isUserFilled, getClass, onLoginSuccessful }
}
