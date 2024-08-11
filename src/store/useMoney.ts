interface money {
  total_money: number
  yesterday_earnings_money: number
}

/**
 * 存储余额宝总金额以及昨日收益
 */
export const useMoney: any = defineStore('money', () => {
  const _money = ref<money>()

  const money = computed({
    get: () => _money.value,
    set: (value) => {
      _money.value = value
    },
  })
  return { money, _money }
}, {
  persist: true,
})
