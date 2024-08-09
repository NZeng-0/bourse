export interface loginTypes {
  name: string
  pwd: string
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
}

export interface indexProduct {
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
  current: {
    date: number
    open: number
    close: number
    low: number
    high: number
    amount: number
    vol: number
    count: number
  }
  history_change_list: Array
  history_list: Array<history>
}

export interface history {
  id: number
  product_code: string
  date: number
  amount: number
  count: number
  open: string
  close: string
  low: string
  high: string
  vol: string
}
