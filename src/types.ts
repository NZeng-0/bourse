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
  high: string
  low: string
  open: string
  close: string
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
  time: number
  wtye: string
  wxwtye: string
  yxwtye: string
  earnings_money: string
  predict_earnings_money: string
  profit_rate: string
  plan_settle_time: string | null
  create_time: string
  product_name: string
  price: string
  down_time: number
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

export interface notifyType {
  id: number
  name: string
  value: string
  status: number
  is_top: number
  sort: number
  start_time: string
  end_time: string
  create_time: string
}

export interface configlist {
  id: number
  key: string
  condition: string
  value: string
  link: null | string
  remark: string
  status: number
  sort: number
  type: number
  start_time: null | string
  end_time: null | string
  create_time: string
}

export interface messageTypes {
  id: number
  key: string
  condition: null | string
  value: string
  link: null | string
  remark: string
  status: number
  sort: number
  type: number
  start_time: string
  end_time: null | string
  create_time: string
}

export interface IndexMsg {
  id: number
  key: string
  condition: string
  value: string
  link: string
  remark: string
  status: number
  sort: number
  start_time: string
  end_time: string
  create_time: string
}

export interface withdrawMethodType {
  id: number
  key: string
  condition: string
  value: string
  link: null | string
  remark: string
  status: number
  sort: number
  type: number
  start_time: null | string
  end_time: null | string
  create_time: string
}

export interface inviteType {
  nickname: string
  account: string
  create_time: string
  recharge_price: string
  withdraw_price: string
  uid: number
}

export interface serveType {
  id: number
  key: string
  condition: null | string
  value: string
  link: string
  remark: string
  status: number
  sort: number
  type: number
  start_time: null | string
  end_time: null | string
  create_time: string
}

export interface authType {
  id: number
  uid: number
  name: null | string
  idcard: string
  idcard_front_image: string
  idcard_side_image: string
  review_status: number
  explain: string
  create_time: string
}

export interface swipeType {
  id: number
  key: string
  condition: null | string
  value: string
  link: string
  remark: string
  status: number
  sort: number
  type: number
  start_time: null | string
  end_time: null | string
  create_time: string
}

export interface payModelType {
  id: number
  bank_user_name: string
  bank_account: string
  bank_branch_name: string
  pay_name: string
  type: number
  status: number
  link_url: string
  explain: string
  qrcode: string
  create_time: string
}

export interface registerTypes {
  account: string
  pwd: string
  verify_pwd: string
  nickname: string
  phone: string
  operation_pwd: string
  email: string
  idcard: string
  spread_code: string
  [Key: string]: string
}

export interface readType {
  id: number
  list: number[]
}

export interface klineType {
  close: number
  high: number
  low: number
  open: number
  timestamp: number
  volume: number
}

export interface menuType {
  id: number
  key: string
  condition: string
  value: string
  link: null | string
  remark: string
  status: number
  sort: number
  type: number
  start_time: null | string
  end_time: null | string
  create_time: string
}
