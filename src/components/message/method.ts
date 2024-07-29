import { isFunction } from '@vue/shared'
import { createVNode, isVNode, render } from 'vue'
import messageComponent from './message.vue'
import type { ButtonProps } from './type'
import type { MessageContext } from './Instance'
import { instances } from './Instance'

let seed = 1

function message(option: Partial<ButtonProps>) {
  const instance = createMessage(option)

  instances.push(instance)
  return instance.handler
}

function closeMessage(instance: MessageContext) {
  const idx = instances.indexOf(instance)
  if (idx === -1)
    return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

function createMessage(option: Partial<ButtonProps>) {
  const id = `message_${seed++}`
  const container = document.createElement('div')

  const props = {
    ...option,
    id,
    onClose: () => {
      option.onClose?.()
      // eslint-disable-next-line ts/no-use-before-define
      closeMessage(instance)
    },
    onDestoy: () => {
      render(null, container)
    },
  }

  const vnode = createVNode(
    messageComponent,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message,
        }
      : null,
  )

  render(vnode, container)
  const node = container.firstElementChild!
  document.body.append(node)

  const vm = vnode.component!
  const handler = {
    close: () => {
      vm.exposed!.visibled.value = false
      document.body.removeChild(node)
    },
  }
  const instance = {
    id,
    vnode,
    vm,
    handler,
  }
  return instance
}

export default message
