export interface Portfolio {
  icon: string
  nameZH: string
  nameEN: string
  presentValue: number
  range: number
  ud: number
  chart: number[]
}

export const menuData: Portfolio[] = [
  {
    icon: new URL('~/assets/images/BTC.png', import.meta.url).href,
    nameZH: '比特币',
    nameEN: 'BTC',
    presentValue: 43215.23,
    range: 11.23,
    ud: 69.63,
    chart: [30, 72, 47, 20, 65, 40, 68, 75, 2, 47, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/USDT.png', import.meta.url).href,
    nameZH: '泰达币',
    nameEN: 'USDT',
    presentValue: 4315.23,
    range: -10.09,
    ud: -50.34,
    chart: [30, 72, 57, 32, 35, 30, 46, 27, 10, 17, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/ETH.png', import.meta.url).href,
    nameZH: '以太坊',
    nameEN: 'ETH',
    presentValue: 215.23,
    range: 1.87,
    ud: 1.03,
    chart: [30, 14, 57, 70, 55, 70, 38, 25, 20, 47, 20, 65, 40, 68],
  },
]

export const list: Portfolio[] = [
  {
    icon: new URL('~/assets/images/BTC.png', import.meta.url).href,
    nameZH: '比特币',
    nameEN: 'BTC',
    presentValue: 43215.23,
    range: 11.23,
    ud: 13.10,
    chart: [30, 72, 47, 20, 65, 40, 68, 75, 2, 47, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/USDT.png', import.meta.url).href,
    nameZH: '泰达币',
    nameEN: 'USDT',
    presentValue: 4315.23,
    range: -10.09,
    ud: -50.34,
    chart: [30, 72, 57, 32, 35, 30, 46, 27, 10, 17, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/ETH.png', import.meta.url).href,
    nameZH: '以太坊',
    nameEN: 'ETH',
    presentValue: 215.23,
    range: 1.87,
    ud: 1.03,
    chart: [30, 14, 57, 70, 55, 70, 38, 25, 20, 47, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/UBQ.png', import.meta.url).href,
    nameZH: '矿业',
    nameEN: 'UBQ',
    presentValue: 215.23,
    range: 1.5,
    ud: 1.02,
    chart: [30, 14, 57, 70, 55, 70, 38, 25, 20, 47, 20, 65, 40, 68],
  },
  {
    icon: new URL('~/assets/images/LSK.png', import.meta.url).href,
    nameZH: '金融',
    nameEN: 'LSK',
    presentValue: 215.23,
    range: 4.87,
    ud: 6.48,
    chart: [30, 14, 57, 70, 55, 70, 38, 25, 20, 47, 20, 65, 40, 68],
  },
]
