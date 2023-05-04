<template>
  <NLayout class="root-layout">
    <SiteHeader />
    <RouterView :style="{ minHeight: 'calc(100vh - ' + footerHeight + 'px)' }" />
    <SiteFooter id="footer" />
  </NLayout>
</template>

<script setup lang="ts">
import { NLayout, useMessage, useDialog, useNotification, useLoadingBar } from 'naive-ui'
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
import { onMounted, ref } from 'vue'

window.$message = useMessage()
window.$dialog = useDialog()
window.$notification = useNotification()
window.$loadingBar = useLoadingBar()
const footerHeight = ref()
const getFooter = () => {
  const el: HTMLElement = document.getElementById('footer')
  footerHeight.value = el.clientHeight
  console.log(footerHeight.value)
}
onMounted(() => {
  getFooter()
})
</script>
<style></style>
