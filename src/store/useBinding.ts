import type { configlist } from '~/types'

export const useBinding: any = defineStore('bind', () => {
  const _list = ref<configlist>()

  const list = computed({
    get: () => _list.value,
    set: (value) => {
      _list.value = value
    },
  })
  return { list, _list }
}, {
  persist: true,
})
