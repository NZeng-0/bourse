import Clipboard from 'clipboard'
import message from '~/components/message'

export function useClipboard(key: string) {
  // 复制按钮的class
  const clipboard = new Clipboard(`.${key}`)

  clipboard.on('success', () => {
    message({
      message: '复制成功',
      duration: 1500,
    })
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    // 释放内存
    clipboard.destroy()
  })
}
