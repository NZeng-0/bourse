import type { indexProduct } from '~/api/types'

/**
 * @description: 存储余额宝产品数据
 */
export const useProduct: any = defineStore('product', () => {
  const _data = ref<indexProduct>()

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
