<template>
  <div class="login-card">
    <NCard title="登录">
      <NTabs default-value="haozi-login" size="large" justify-content="space-evenly">
        <NTabPane name="haozi-login" tab="耗子通行证">
          <NButton type="primary" style="width: 100%" @click="handleLogin">
            耗子通行证 登录
          </NButton>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NTabs, NTabPane, NButton } from 'naive-ui'

import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

import { login } from '@/api/auth'

const userStore = useUserStore()
const router = useRouter()

if (userStore.auth.login) {
  router.push({ name: 'profile' })
}

const handleLogin = () => {
  login()
    .then((res) => {
      window.location.href = res.data.url
    })
    .catch((err) => {
      console.log(err)
    })
}
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
