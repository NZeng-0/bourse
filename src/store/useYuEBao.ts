import type { YuEBao } from '~/types'

/**
 * @description: 存储余额宝产品数据
 */
export const useYuEBao: any = defineStore('YuEBao', () => {
  const _data = ref<YuEBao | undefined>(undefined)

  const data = computed({
    get: () => _data.value,
    set: (value) => {
      _data.value = value
    },
  })
  return { data, _data }
}, {
  persist: true,
})
