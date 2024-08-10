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
