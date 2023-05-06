<template>
  <NResult status="404" title="404 Not Found" description="你可能迷失了方向" class="not-found">
    <template #footer>
      <NButton @click="goHome">回家</NButton>
    </template>
  </NResult>
</template>

<script setup lang="ts">
import { NResult, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.not-found {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
