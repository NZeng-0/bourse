export interface userTypes {
  uid: number
  account: string
  phone: string
  nickname: string
  email: string | null
  avatar: string
  last_ip: string
  now_money: string
  withdraw_price: string
  recharge_price: string
  earnings_money: string
  investment_money: string
  status: number
  user_freeze_time: string
  deal_freeze_time: string
  withdraw_status: number
  auth_status: number
  create_order_rate: string
  user_withdraw_rate: string
  level_id: number
  is_spread: number
  spread_code: string
  spread_id: number
  sex: number
  idcard: string | null
  idcard_img: string | null
  create_time: string
  last_login_time: string
  bank_info: {
    id: number
    uid: number
    bank_name: string
    bank_branch_name: string
    bank_account: string
    wallet_name: string
    wallet_address: string
    create_time: string
  }
  level_name: string
  level: number
  yesterday_earnings_money: number
  today_earnings_money: number
  total_earnings_money: number
}

export const useUser: any = defineStore('user', () => {
  const _data = ref<userTypes | undefined>(undefined)

  const data = computed({
    get: () => _data.value,
    set: (value) => {
      _data.value = value
    },
  })
  return { data, _data }
}, {
  persist: true,
})
