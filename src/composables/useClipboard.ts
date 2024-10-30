import Clipboard from 'clipboard'

const { t } = useI18n()

export function useClipboard(key: string) {
  // 复制按钮的class
  const clipboard = new Clipboard(`.${key}`)

  clipboard.on('success', () => {
    showToast({
      message: t('copySuccess'),
    })
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    // 释放内存
    clipboard.destroy()
  })
}
