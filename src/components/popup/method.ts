import { createVNode, render } from 'vue'
import popupComponent from './ThePopup.vue'
import type { ButtonProps } from './type'
import type { popupContext } from './instance'
import { instances } from './instance'

let seed = 1

function pop(option: Partial<ButtonProps>) {
  const instance = createPop(option)

  instances.push(instance)
  return instance.handler
}

function closeMessage(instance: popupContext) {
  const idx = instances.indexOf(instance)
  if (idx === -1)
    return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

function createPop(option: Partial<ButtonProps>) {
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
    popupComponent,
    props,
  )

  render(vnode, container)
  const node = container.firstElementChild!
  document.body.append(node)

  const vm = vnode.component!
  const handler = {
    close: () => {
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

export default pop
