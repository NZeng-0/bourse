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
