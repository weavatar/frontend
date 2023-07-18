// global.d.ts
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'

declare global {
  interface Window {
    $message: ReturnType<typeof useMessage>
    $dialog: ReturnType<typeof useDialog>
    $notification: ReturnType<typeof useNotification>
    $loadingBar: ReturnType<typeof useLoadingBar>
  }
}

export {}
