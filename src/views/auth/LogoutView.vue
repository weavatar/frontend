<template>
  <main>
    <div class="home">
      <h1>已成功退出</h1>
      <p>页面即将自动跳转</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 清除用户信息
userStore.clearToken()

setTimeout(() => {
  router.push({ name: 'login' })
}, 1000)
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
</style>
