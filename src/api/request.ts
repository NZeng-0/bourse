import Fetch from './fetch'
import { useLocalCache } from '~/hook'

const { getCache, clearCache } = useLocalCache()

export const Request = new Fetch({
  baseUrl: 'http://47.109.206.211:82',
  options: {
    beforeFetch({ options }) {
      const token = getCache('token')

      options.headers = {
        ...options.headers,
        Authorization: token,
      }
      return { options }
    },
    afterFetch(ctx) {
      // 这里做统一错误处理
      const { code } = ctx.data
      if (code === 102) {
        clearCache()
        location.reload()
      }
      return ctx
    },
    onFetchError(ctx: any) {
      return ctx
    },
    timeout: 10000,
  },
})
