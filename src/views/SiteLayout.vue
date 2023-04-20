<template>
  <NLayout class="root-layout">
    <SiteHeader />
    <RouterView />
    <SiteFooter />
  </NLayout>
</template>

<script setup lang="ts">
import { NLayout, useMessage, useDialog, useNotification, useLoadingBar } from 'naive-ui'
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'

window.$message = useMessage()
window.$dialog = useDialog()
window.$notification = useNotification()
window.$loadingBar = useLoadingBar()
</script>
