import type { notifyType } from '~/types'

export const useNotify: any = defineStore('notify', () => {
  const _notify = ref<notifyType>()

  const notify = computed({
    get: () => _notify.value,
    set: (value) => {
      _notify.value = value
    },
  })
  return { notify, _notify }
}, {
  persist: true,
})
