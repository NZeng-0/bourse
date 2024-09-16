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
  price: number
  diff: number
  diff_rate: string
  history_list: Array<history>
  count: number
  open: string
  close: string
  low: string
  high: string
  vol: string
  amount: number
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
  vol: number
}

export interface recharge {
  money: string
  type: number
  pay_storageImage: string
  pay_type: number
  receive_name?: string
  bank_name?: string
  bank_branch_name?: string
  bank_account?: string
  wallet_name?: string
  wallet_address?: string
  remark?: string
}

export interface withdraw {
  withdraw_money: string
  type: number
  bank_branch_name?: string
  bank_name?: string
  bank_account?: string
  wallet_name?: string
  wallet_address?: string
}

export interface binding {
  bank_name?: string
  bank_branch_name?: string
  bank_account?: string
  wallet_name?: string
  wallet_address?: string
}

export interface loginPwd {
  pwd: string
  pwd_confirm?: string
  new_pwd: string
  new_pwd_confirm: string
}

export interface operationPwd {
  operation_pwd: string
  operation_confirm?: string
  new_operation_pwd: string
  new_operation_pwd_confirm: string
}
