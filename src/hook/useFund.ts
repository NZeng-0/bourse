import type { history } from '~/api/types'
import { getProductDetail, getProductInfo } from '~/api'
import type { klineType } from '~/types'

const times = [
  { key: '1min', value: '1M' },
  { key: '15min', value: '15M' },
  { key: '30min', value: '30M' },
  { key: '1h', value: '1H' },
  { key: '1day', value: '1D' },
]

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
        timestamp: h.date,
        volume: useToNumber(h.vol).value,
      }
      result.push(val)
    }
    return result
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

  async function getProductPrice(id: number) {
    const { data } = await getProductInfo(id)
    return data.value.data
  }

  return {
    getTimes,
    getSrc,
    handleImageError,
    actuator,
    parseData,
    getProductPrice,
  }
}
