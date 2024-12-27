import type { configlist } from '~/types'

export const useCompnay: any = defineStore('company', () => {
  const _data = ref<configlist>()

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
