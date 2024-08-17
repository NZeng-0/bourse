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

export interface productType {
  id: number
  product_name: string
  product_code: string
  source: string
  profit_status: number
  logo: string
  remark: string
  fkzxbdz: string
  fkzdbdz: string
  sjbdfw: string
  mode_type: number
  start_time: string
  end_time: string
  create_time: string
  history_list: Array<historyType>
  money_rate_list: Array<moneyRateType>
  time_scheme_list: Array<timeSchemeType>
}

export interface historyType {
  id: number
  date: number
  amount: number
  count: number
  open: string
  close: string
  low: string
  high: string
  vol: string
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
  count: string
  amount: string
  high: string
  low: string
  vol: string
}
