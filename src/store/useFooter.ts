import type { footerItem } from '~/types'

export const useFooter: any = defineStore('footer', () => {
  const _data = ref<footerItem>()

  const data = computed({
    get: () => _data.value,
    set: (value) => {
      _data.value = value
    },
  })
  return { data, _data }
})
// , {
//   persist: true,
// }
