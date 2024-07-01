interface Portfolio {
  icon: string
  nameZH: string
  nameEN: string
  presentValue: number
  range: number
  chart: number[]
}

export const list: Portfolio[] = [
  {
    icon: new URL('~/assets/images/BTC.png', import.meta.url).href,
    nameZH: '比特币',
    nameEN: 'BTC',
    presentValue: 43215.23,
    range: 11.23,
    chart: [30, 72, 47, 20, 65, 40, 68, 75, 2, 47, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/USDT.png', import.meta.url).href,
    nameZH: '泰塔币',
    nameEN: 'USDT',
    presentValue: 4315.23,
    range: -10.09,
    chart: [30, 72, 57, 32, 35, 30, 46, 27, 10, 17, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/ETH.png', import.meta.url).href,
    nameZH: '以太坊',
    nameEN: 'ETH',
    presentValue: 215.23,
    range: 1.87,
    chart: [30, 14, 57, 70, 55, 70, 38, 25, 20, 47, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/ETH.png', import.meta.url).href,
    nameZH: '以太坊',
    nameEN: 'ETH',
    presentValue: 215.23,
    range: 1.87,
    chart: [30, 14, 57, 70, 55, 70, 38, 25, 20, 47, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/ETH.png', import.meta.url).href,
    nameZH: '以太坊',
    nameEN: 'ETH',
    presentValue: 215.23,
    range: 1.87,
    chart: [30, 14, 57, 70, 55, 70, 38, 25, 20, 47, 20, 65, 40, 68],
  },
]
