import Fetch from './fetch'
import message from '~/components/message'
import { useLocalCache } from '~/hook'
import router from '~/router'

const { getCache } = useLocalCache()

export const Request = new Fetch({
  baseUrl: 'http://47.109.206.211:82',
  options: {
    beforeFetch({ options }) {
      const token = getCache('token')

      options.headers = {
        ...options.headers,
        token,
      }
      return { options }
    },
    // 这里做统一错误处理
    afterFetch(ctx) {
      const { data } = ctx
      if (data.code !== 200) {
        message({
          message: data.msg,
          duration: 3000,
        })
        router.push('/login')
      }
      return ctx
    },
    onFetchError(ctx: any) {
      return ctx
    },
    timeout: 10000,
  },
})
