import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'TheCharts',
  props: {
    dom: String,
    option: Object,
  },
  setup(props) {
    const internalInstance = getCurrentInstance()
    const echarts = internalInstance!.appContext.config.globalProperties.$echarts

    function init() {
      const option = ref(props.option)
      const dom = document.querySelector(`.${props.dom}`)
      const myChart = echarts.init(dom)
      myChart.setOption(option.value)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
    onMounted(() => {
      init()
    })
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
