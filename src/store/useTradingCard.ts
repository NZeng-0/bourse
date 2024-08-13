import type { currentType } from '~/types'

/**
 * @description: 存储产品卡片数据
 */
export const useCard: any = defineStore('card', () => {
  const _data = ref<currentType>()

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
