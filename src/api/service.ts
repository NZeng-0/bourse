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

export function getIndexMsg() {
  return Request.get({
    url: '/index/index',
  })
}

export function getIndexProduct() {
  return Request.get({
    url: '/index/product/getProductList',
  })
}

export function getIndexNoticeList() {
  return Request.get({
    url: '/index/getSystemNoticeList',
  })
}

export function getIndexSlideshowMessage() {
  return Request.get({
    url: '/index/getSlideshowMessage/getSlideshowMessage',
  })
}

export function getYuEBaoList() {
  return Request.get({
    url: '/index/moneyInvestment/getMoneyInvestmentList',
  })
}