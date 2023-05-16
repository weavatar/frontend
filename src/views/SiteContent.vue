<template>
  <div class="content">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

const footerHeight = ref()

const getFooter = () => {
  const el = document.getElementsByClassName('footer') as HTMLCollectionOf<HTMLElement>
  footerHeight.value = el[0].clientHeight
}

onMounted(() => {
  getFooter()
})
</script>

<style scoped>
.content {
  margin-bottom: v-bind(footerHeight + 'px');
}
</style>
