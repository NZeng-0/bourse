export default defineComponent({
  name: 'TheCharts',
  props: {
    dom: String,
    option: Object,
  },
  setup(props) {
    const _dom = props.dom!

    let myChart: any
    function init() {
      const internalInstance = getCurrentInstance()
      const echarts = internalInstance!.appContext.config.globalProperties.$echarts
      const dom = document.querySelector(`.${_dom}`)
      myChart = echarts.init(dom)
      myChart.setOption(props.option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }

    function dispose() {
      window.removeEventListener('resize', myChart.resize)
      myChart.dispose()
    }

    watch(() => props, () => {
      dispose()
      init()
    })

    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => {
      dispose()
    })

    return () => {
      return (
        h('div', {
          class: _dom,
          style: { height: '100%', width: '100%' },
        })
      )
    }
  },
})
