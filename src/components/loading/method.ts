import { createVNode, render } from 'vue'
import loadingComponent from './loading.vue'

function createLoading() {
  const container = document.createElement('div')
  const props = {
    onDestoy: () => {
      render(null, container)
    },
  }

  const vnode = createVNode(
    loadingComponent,
    props,
  )

  render(vnode, container)
  const node = container.firstElementChild!
  document.body.append(node)

  const vm = vnode.component!

  const instance = {
    vnode,
    vm,
  }
  return instance
}

const { vnode, vm } = createLoading()

const loading = {
  show() {
    vm.exposed!.isShow.value = true
  },

  close() {
    vm.exposed!.isShow.value = false
    vnode.props!.onDestoy()
  },
}
export default loading
