import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption, XAXisOption, YAXisOption } from 'echarts/types/dist/shared'

type ECOption = ComposeOption<
  | XAXisOption
  | YAXisOption
  | BarSeriesOption
>

export interface Props {
  grid: object
  series: object
  graphic: object
}

/**
 *
 * @param props Props
 * @returns 图片配置
 */
export function getOption(props: Props): ECOption {
  return {
    animation: false,
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
    graphic: props.graphic || [],
  }
}
