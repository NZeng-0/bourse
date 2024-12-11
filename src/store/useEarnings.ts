import type { earningType } from '~/types'

export const useEarnings = defineStore('data', () => {
  const _data = ref<earningType>()

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
