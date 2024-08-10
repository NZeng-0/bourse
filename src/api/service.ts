import { Request } from './request'
import type { loginTypes, registerTypes } from './types'

/**
 * @description 登录
 * @param data 用户登录信息
 * @returns Promise
 */
export function login(data: loginTypes) {
  return Request.post({
    url: '/index/login',
    data,
  })
}

/**
 * 注册
 * @param data 注册信息
 * @returns Promise
 */
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

/**
 * api 返回 null
 * @returns 获取首页轮播图信息
 */
export function getIndexSlideshowMessage() {
  return Request.get({
    url: '/index/getSlideshowMessage/getSlideshowMessage',
  })
}

export function getYuEBaoList() {
  return Request.get({
    url: `/index/moneyInvestment/getMoneyInvestmentList`,
  })
}

export function getMoneyInvestmentOrderList(status: number = 0) {
  return Request.get({
    url: `/index/moneyInvestment/getMoneyInvestmentOrderList?${status}`,
  })
}

export function getNoticeList() {
  return Request.get({
    url: '/index/user/getUserNoticeList',
  })
}

export function getUserInfo() {
  return Request.get({
    url: '/index/user/getUserInfo',
  })
}

export function getRechargeList() {
  return Request.get({
    url: '/index/user/getRechargeList',
  })
}

export function getAccountBillList() {
  return Request.get({
    url: '/index/user/getAccountBillList',
  })
}

export function getProductDetail(id: number | string) {
  return Request.get({
    url: `/index/product/getProductDetail?id=${id}`,
  })
}

export function getMoneyEarningsInfo() {
  return Request.get({
    url: `/index/moneyInvestment/getMoneyEarningsInfo`,
  })
}

export function getTotalMoneyAndYesterdayMoney() {
  return Request.get({
    url: `/index/moneyInvestment/getTotalMoneyAndYesterdayMoney`,
  })
}
