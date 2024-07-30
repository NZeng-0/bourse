import type { ExtractPropTypes, PropType } from 'vue'

export const definePropType = <T>(val: any): PropType<T> => val

export const popupProps = {
  title: {
    type: String as PropType<string>,
    default: '',
  },
  message: {
    type: String as PropType<string>,
    default: '',
  },
  submit: {
    type: String as PropType<string>,
    default: '',
  },
  id: {
    type: String as PropType<string>,
    default: '',
  },
  onClose: {
    type: definePropType<() => void>(Function),
    required: false,
  },
}

export type ButtonProps = ExtractPropTypes<typeof popupProps>

export interface popupHandler {
  /**
   * @description close the Message
   */
  close: () => void
}
