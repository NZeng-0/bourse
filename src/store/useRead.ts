import type { readType } from '~/types'

export const useRead: any = defineStore('read', () => {
  const _data = ref<readType[]>()

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
