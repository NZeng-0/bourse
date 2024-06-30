import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'TheCharts',
  props: {
    dom: String,
    grid: Object,
    series: Object,
  },
  setup(props) {
    const internalInstance = getCurrentInstance()
    const echarts = internalInstance!.appContext.config.globalProperties.$echarts
    const options = {
      grid: props.grid,
      xAxis: {
        show: false,
        type: 'category',
      },
      yAxis: {
        show: false,
        type: 'value',
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: props.series,
    }

    function init() {
      const dom = document.querySelector(`.${props.dom}`)
      const myChart = echarts.init(dom)
      myChart.setOption(options)
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
