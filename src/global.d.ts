// global.d.ts
import {useMessage, useDialog, useNotification, useLoadingBar} from 'naive-ui'

declare global {
  interface Window {
    $message: ReturnType<typeof useMessage>
    $dialog: ReturnType<typeof useDialog>
    $notification: ReturnType<typeof useNotification>
    $loadingBar: ReturnType<typeof useLoadingBar>
  }
}

export {}
