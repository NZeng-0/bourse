export default defineComponent({
  name: 'TheCharts',
  props: {
    dom: String,
    option: Object || [],
  },
  setup(props) {
    const onChange: any = inject('changeData')

    const diynamicOption = computed(() => onChange())

    const internalInstance = getCurrentInstance()
    const echarts = internalInstance!.appContext.config.globalProperties.$echarts
    const option = props.option
      ? ref(props.option)
      : toRaw(diynamicOption.value)

    let myChart: any
    function init() {
      const dom = document.querySelector(`.${props.dom}`)
      myChart = echarts.init(dom)
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }

    function dispose() {
      window.removeEventListener('resize', myChart.resize)
      myChart.dispose()
    }

    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => dispose())

    return () => {
      return (
        h('div', {
          class: props.dom,
          style: { height: '100%', width: '100%' },
        })
      )
    }
  },
})
