<template>
  <NLayout class="root-layout">
    <SiteHeader />
    <SiteContent />
    <SiteFooter />
  </NLayout>
</template>

<script setup lang="ts">
import { NLayout, useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'
import SiteHeader from './SiteHeader.vue'
import SiteContent from './SiteContent.vue'
import SiteFooter from './SiteFooter.vue'

window.$message = useMessage()
window.$dialog = useDialog()
window.$notification = useNotification()
window.$loadingBar = useLoadingBar()
</script>

<style scoped>
:deep(.n-layout-scroll-container) {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
