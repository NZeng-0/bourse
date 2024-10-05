import type { notifyType } from '~/types'

export const useNotifyList: any = defineStore('notifyList', () => {
  const _notifyList = ref<notifyType>()

  const notifyList = computed({
    get: () => _notifyList.value,
    set: (value) => {
      _notifyList.value = value
    },
  })
  return { notifyList, _notifyList }
}, {
  persist: true,
})
