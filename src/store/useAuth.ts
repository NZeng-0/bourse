import type { authType } from '~/types'

export const useAuth: any = defineStore('auth', () => {
  const _auth = ref<authType>()

  const auth = computed({
    get: () => _auth.value,
    set: (value) => {
      _auth.value = value
    },
  })
  return { auth, _auth }
}, {
  persist: true,
})
