export const icon = new URL('~/assets/images/BTC.png', import.meta.url).href
export const baseUrl = 'http://47.109.206.211:82'

export function format(value: number | string | undefined | null, target: number) {
  if (value === undefined || value === null)
    return '0.00' // 兜底处理，返回 '0.00'

  if (typeof value === 'string')
    value = useToNumber(value).value
  return value.toFixed(target)
}
