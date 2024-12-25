import { Request } from './request'
import type {
  binding,
  loginPwd,
  loginTypes,
  operationPwd,
  recharge,
  registerTypes,
  withdraw,
} from './types'
import type { earningsMoney } from '~/types'

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

export function getIndexProduct(show?: number) {
  return Request.get({
    url: `/index/product/getProductList?is_show=${show}`,
  })
}

export function getIndexProductAll() {
  return Request.get({
    url: `/index/product/getProductList`,
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
    url: '/index/user/getSlideshowMessage',
  })
}

export function getYuEBaoList() {
  return Request.get({
    url: `/index/moneyInvestment/getMoneyInvestmentList`,
  })
}

/**
 * @description 余额宝订单列表
 * @param status 状态：0-未结算，1-已结算 当前收益传-0，历史传-1
 * @param page 当前页
 * @returns 订单列表
 */
export function getMoneyInvestmentOrderList(status: number = 0, page: number = 1) {
  return Request.get({
    url: `/index/moneyInvestment/getMoneyInvestmentOrderList?${status}&page=${page}`,
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

export function getProductDetail(id: number | string, latitude_time: string) {
  return Request.get({
    url: `/index/product/getProductDetail?id=${id}&latitude_time=${latitude_time}`,
  })
}

export function getMoneyEarningsInfo() {
  return Request.get({
    url: `/index/moneyInvestment/getMoneyEarningsInfo`,
  })
}

/**
 * @description 获取余额宝总金额以及昨日收益
 * @returns 余额宝总金额以及昨日收益
 */
export function getTotalMoneyAndYesterdayMoney() {
  return Request.get({
    url: `/index/moneyInvestment/getTotalMoneyAndYesterdayMoney`,
  })
}

/**
 * @description 购买余额宝
 * @param data 购买金额 和 产品id
 * @param {number} data.money 购买金额
 * @param {string} data.id 产品 id
 * @returns 购买结果
 */
export function buyMoneyInvestment(data: { money: number | string, id: number }) {
  return Request.post({
    url: `/index/moneyInvestment/buyMoneyInvestment`,
    data,
  })
}

/**
 * @description 终止余额宝
 * @param data 产品id
 * @param {number} data.id 产品 id
 * @returns 购买结果
 */
export function quitMoneyInvestment(data: { id: number }) {
  return Request.post({
    url: `/index/moneyInvestment/quitMoneyInvestment`,
    data,
  })
}

/**
 * @description 续期余额宝
 * @param data 产品id
 * @param {number} data.id 产品 id
 * @returns 续期结果
 */
export function prolongMoneyInvestment(data: { id: number }) {
  return Request.post({
    url: `/index/moneyInvestment/prolongMoneyInvestment`,
    data,
  })
}

export function outMoneyInvestment(money: string) {
  return Request.post({
    url: `/index/user/investmentPushMoney`,
    data: {
      money,
    },
  })
}

export function submitAuthIdcard(data: {
  idcard: string
  idcard_front_image: string
  idcard_side_image: string
}) {
  return Request.post({
    url: `/index/user/submitAuthIdcard`,
    data,
  })
}

export function submitRecharge(data: recharge) {
  return Request.post({
    url: `/index/user/submitRecharge`,
    data,
  })
}

export function submitWithdraw(data: withdraw) {
  return Request.post({
    url: `/index/user/submitWithdraw`,
    data,
  })
}

export function submitWithdrawAccount(data: binding) {
  return Request.post({
    url: `/index/user/submitWithdrawAccount`,
    data,
  })
}

export function updatePassword(data: loginPwd) {
  return Request.post({
    url: `/index/user/updatePassword`,
    data,
  })
}

export function updateOperationPwd(data: operationPwd) {
  return Request.post({
    url: `/index/user/updateOperationPwd`,
    data,
  })
}

export function submitProductOrder(data: {
  product_id: number
  money: number
  type: number
}) {
  return Request.post({
    url: `/index/product/submitProductOrder`,
    data,
  })
}

export function getProductOrderList(status: number, page: number) {
  return Request.get({
    url: `/index/product/getProductOrderList?status=${status}&page=${page}`,
  })
}

export function getWithdrawList() {
  return Request.get({
    url: '/index/user/getWithdrawList',
  })
}

export function transferIn(money: string) {
  return Request.post({
    url: '/index/user/moneyPushInvestment',
    data: {
      money,
    },
  })
}

export function getConfigList() {
  return Request.get({
    url: '/index/getSystemConfig',
  })
}

export function getSpreadUserList() {
  return Request.get({
    url: '/index/user/getSpreadUserList',
  })
}

export function getCustomerService() {
  return Request.get({
    url: '/index/getCustomerService',
  })
}

export function readUserNotice(id: number) {
  return Request.post({
    url: `/index/user/readUserNotice`,
    data: { id },
  })
}

export function getAuthIdcard() {
  return Request.get({
    url: '/index/user/getAuthIdcard',
  })
}

export function getProductTakeList() {
  return Request.get({
    url: '/index/product/getProductTakeList',
  })
}

export function getPayModeList() {
  return Request.get({
    url: '/index/system/getPayModeList',
  })
}

export function updateUserInfo(path: string) {
  return Request.post({
    url: '/index/user/updateUserInfo',
    data: {
      avatar: path,
    },
  })
}

export function countWithdrawDeductMoney(money: number) {
  return Request.post({
    url: '/index/user/countWithdrawDeductMoney',
    data: {
      withdraw_money: money,
    },
  })
}

export function getFrontMenuConfig() {
  return Request.get({
    url: '/index/system/getFrontMenuConfig',
  })
}

export function countProductEarningsMoney(data: earningsMoney) {
  return Request.post({
    url: '/index/product/countProductEarningsMoney',
    data,
  })
}

export function getUserInvestmentBillList() {
  return Request.get({
    url: '/index/user/getUserInvestmentBillList',
  })
}

export function getProductInfo(id: number) {
  return Request.get({
    url: `/index/product/getProductInfo?id=${id}`,
  })
}
