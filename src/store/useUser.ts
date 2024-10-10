import type { userTypes } from '~/types'

export const useUser: any = defineStore('user', () => {
  const _data = ref<userTypes | undefined>(undefined)

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
