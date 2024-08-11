export function submitWithdrawAccount(data: binding) {
  return Request.post({
    url: `/index/user/submitWithdrawAccount`,
    data,
  })
}
