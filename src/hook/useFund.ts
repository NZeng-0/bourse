import type { history } from '~/api/types'
import { getProductDetail } from '~/api'
import type { klineType } from '~/types'

const times = [
  { key: '1day', value: '1D' },
  { key: '1week', value: '1W' },
  { key: '1month', value: '1M' },
  { key: '1year', value: '1Y' },
  { key: '5year', value: '5Y' },
]

function getTimestamp(str: string) {
  const year = str.slice(0, 4)
  const month = str.slice(4, 6)
  const day = str.slice(6, 8)
  const hour = str.slice(8, 10)
  const minute = str.slice(10, 12)

  // 创建日期对象
  const date = `${year}-${month}-${day} ${hour}:${minute}`

  // 转换为时间戳
  return new Date(date).getTime()
}

export function useFund() {
  function getTimes() {
    return times
  }

  function parseData(data: history[]) {
    if (data === undefined)
      return
    const result: klineType[] = []
    for (const h of data) {
      const val: klineType = {
        open: useToNumber(h.open).value,
        close: useToNumber(h.close).value,
        low: useToNumber(h.low).value,
        high: useToNumber(h.high).value,
        timestamp: getTimestamp(h.timePoint.toString()),
        volume: useToNumber(h.vol).value,
      }
      result.push(val)
    }
    return result.reverse()
  }

  function getSrc(uri: string) {
    return `${baseUrl}/${uri}`
  }

  function handleImageError(that: EventTarget | null) {
    (that as HTMLImageElement).src = icon
  }

  async function actuator(id: number, period: string) {
    const { data } = await getProductDetail(id, period)
    return data.value.data
  }

  /* function parseDate(unixTimestamp: number) {
    // 将时间戳转换为毫秒
    const date = new Date(unixTimestamp * 1000)

    // 获取北京时间
    const beijingTime = new Date(date.getTime() + 8 * 60 * 60 * 1000)

    // 格式化输出日期部分
    return beijingTime.toISOString().split('T')[0]
  } */

  return {
    getTimes,
    getSrc,
    handleImageError,
    actuator,
    parseData,
  }
}
