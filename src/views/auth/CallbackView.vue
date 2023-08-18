<template>
  <div class="login-card">
    <NCard title="登录中">
      <NSpin :size="20" />
      <NText>请稍后...</NText>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NSpin, NText } from 'naive-ui'

import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

import { oauthCallback } from '@/api/auth'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const code = String(route.query.code)
const state = String(route.query.state)

oauthCallback(code, state)
  .then((res) => {
    window.$message.success('登录成功')
    userStore.updateToken(res.data.token)
    setTimeout(() => {
      router.push({ name: 'home' })
    }, 1000)
  })
  .catch((err) => {
    console.log(err)
  })
</script>

<style scoped>
.login-card {
  width: 400px;
  margin: 200px auto;
}

@media (max-width: 768px) {
  .login-card {
    width: 100%;
  }
}
</style>
