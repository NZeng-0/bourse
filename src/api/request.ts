import Fetch from './fetch'
import { useLocalCache } from '~/hook'
import router from '~/router'

const { getCache } = useLocalCache()

const _lang = useStorage('lang', 'zh-CN')

const baseUrl = import.meta.env.VITE_BASE_URL

export const Request = new Fetch({
  baseUrl,
  options: {
    beforeFetch({ options }) {
      const token = getCache('token')

      const ThinkLang = _lang.value.toLocaleLowerCase()

      options.headers = {
        ...options.headers,
        token,
        ThinkLang,
      }
      return { options }
    },
    // 这里做统一错误处理
    afterFetch(ctx) {
      const { data } = ctx

      // unlogin
      if (data.code === 5001 && data.msg === '用户未登录') {
        showToast({
          message: data.msg,
        })
        router.push('/login')
      }
      if (data.code === 500) {
        showToast({
          message: '网络错误',
        })
      }
      return ctx
    },
    onFetchError(ctx: any) {
      return ctx
    },
    timeout: 10000,
  },
})
