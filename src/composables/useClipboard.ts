import Clipboard from 'clipboard'

export function useClipboard(key: string, tips: string) {
  // 复制按钮的class
  const clipboard = new Clipboard(`.${key}`)

  clipboard.on('success', () => {
    showToast({
      message: tips,
    })
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    // 释放内存
    clipboard.destroy()
  })
}
