export const usePopup: any = defineStore('popups', () => {
  const _day = ref<string>()

  const day = computed({
    get: () => _day.value,
    set: (value) => {
      _day.value = value
    },
  })
  return { day, _day }
}, {
  persist: true,
})
