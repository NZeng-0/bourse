import type { ComponentInternalInstance, VNode } from 'vue'
import { shallowReactive } from 'vue'
import type { popupHandler } from './type'

export interface popupContext {
  id: string
  vnode: VNode
  handler: popupHandler
  vm: ComponentInternalInstance
}

export const instances: popupContext[] = shallowReactive([])

export function getInstance(id: string) {
  const idx = instances.findIndex(instance => instance.id === id)
  const current = instances[idx]
  let prev: popupContext | undefined
  if (idx > 0)
    prev = instances[idx - 1]
  return { current, prev }
}
