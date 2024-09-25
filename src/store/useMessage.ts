import type { msgTypes } from '~/types'

export const useMessage: any = defineStore('msg', () => {
  const _msg = ref<msgTypes>()

  const msg = computed({
    get: () => _msg.value,
    set: (value) => {
      _msg.value = value
    },
  })
  return { msg, _msg }
}, {
  persist: true,
})
