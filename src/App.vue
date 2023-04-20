<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
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
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider
} from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'

import { computed } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'
const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
</script>
