<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="theme" :hljs="hljs">
    <NLoadingBarProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <NDialogProvider>
            <SiteLayout />
          </NDialogProvider>
        </NNotificationProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import SiteLayout from '@/views/SiteLayout.vue'

import {
  darkTheme,
  dateZhCN,
  NConfigProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  useOsTheme,
  zhCN
} from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import php from 'highlight.js/lib/languages/php'
import { computed } from 'vue'

hljs.registerLanguage('php', php)

const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
</script>
