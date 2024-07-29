import { Request } from './request'
import type { loginTypes, registerTypes } from './types'

export function login(data: loginTypes) {
  return Request.post({
    url: '/index/login',
    data,
  })
}

export function register(data: registerTypes) {
  return Request.post({
    url: '/index/register',
    data,
  })
}

export function getIndexList() {
  return Request.get({
    url: '/index/product/getProductList',
  })
}
