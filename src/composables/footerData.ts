interface footerItem {
  icon: string
  name: string
  pointTo: string
  onlyIcon: boolean
}

export const data: footerItem[] = [
  {
    icon: new URL('~/assets/images/footer/home.png', import.meta.url).href,
    name: '首页',
    pointTo: '/',
    onlyIcon: false,
  },
  {
    icon: new URL('~/assets/images/footer/assets.png', import.meta.url).href,
    name: '资产',
    pointTo: '/assets',
    onlyIcon: false,
  },
  {
    icon: new URL('~/assets/images/footer/nav_item.png', import.meta.url).href,
    name: '',
    pointTo: '/',
    onlyIcon: true,
  },
  {
    icon: new URL('~/assets/images/footer/manage_money.png', import.meta.url).href,
    name: '理财',
    pointTo: '/grow/solution',
    onlyIcon: false,
  },
  {
    icon: new URL('~/assets/images/footer/me.png', import.meta.url).href,
    name: '我的',
    pointTo: '/me',
    onlyIcon: false,
  },
]
