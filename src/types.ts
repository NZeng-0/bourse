export type UserModule = (ctx: any) => void

export interface FeatchParams {
  url: string
  params?: Record<string, any>
  data?: Record<string, any>
}

export interface YuEBao {
  id: number
  name: string
  top_price: string
  min_price: string
  status: number
  is_hot: number
  rate_mode: number
  day: number
  rate: string
  type: number
  create_time: string
  rate_price: string
}

export interface order {
  id: number
  money_investment_id: number
  money_investment_name: string
  uid: number
  price: string
  day: number
  rate_price: string
  rate: string
  status: number
  over_time: string
  over_type: number
  create_time: string
  now_earnings_money: number
}

export interface currentType {
  id: number
  version: number
  open: number
  close: number
  low: number
  high: number
  amount: number
  vol: number
  count: number
  bid: Array<number>
  ask: Array<number>
}

export interface historyType {
  id: number | string
  date: number
  amount: number
  count: number
  open: string | number
  close: string | number
  low: string | number
  high: string | number
  vol: number
}

export interface moneyRateType {
  id: number
  product_id: number
  min_price: string
  max_price: string
  profit_min_rate: string
  profit_max_rate: string
  loss_min_rate: string
  los_max_rate: string
}

export interface timeSchemeType {
  id: number
  product_id: number
  time: number
  min_invest_money: string
  max_invest_money: string
}

export interface cardType {
  count: string | number
  amount: string | number
  high: string
  low: string
  vol: string
}

export interface dataType {
  id: number
  order_sn: string
  product_id: number
  uid: number
  status: number
  type: number
  jcdw: string
  pcdw: string | null
  time: string
  wtye: string
  wxwtye: string
  yxwtye: string
  earnings_money: string
  predict_earnings_money: string
  profit_loss_rate: string
  settle_time: string | null
  create_time: string
  product_name: string
  price: string
}

export interface withdrawType {
  id: number
  uid: number
  order_sn: string
  withdraw_money: string
  deduct_money: string
  reality_money: string
  review_status: number
  explain: string
  bank_name: string | null
  bank_branch_name: string | null
  bank_account: string
  wallet_name: string | null
  wallet_address: string | null
  create_time: string
  account: string
  nickname: string
}

export interface msgTypes {
  id: number
  uid: number
  content_id: number
  type: number
  is_read: number
  title: string
  message: string
  create_time: string
}
