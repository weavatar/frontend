<template>
  <div class="login-card">
    <NCard title="登录">
      <NTabs default-value="haozi-login" size="large" justify-content="space-evenly">
        <NTabPane name="haozi-login" tab="耗子通行证">
          <NButton
            type="primary"
            block
            :loading="loading"
            :disabled="disabled"
            @click="handleLogin"
          >
            耗子通行证 登录
          </NButton>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NButton, NCard, NTabPane, NTabs } from 'naive-ui'

import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

import { login } from '@/api/auth'
import { ref } from 'vue'

const loading = ref(false)
const disabled = ref(false)

const userStore = useUserStore()
const router = useRouter()

if (userStore.auth.login) {
  router.push({ name: 'user-avatar' })
}

const handleLogin = async () => {
  // 防止重复点击
  if (disabled.value) {
    return
  }
  loading.value = true
  disabled.value = true
  await login()
    .then((res) => {
      window.location.href = res.data.url
    })
    .catch(() => {
      loading.value = false
      disabled.value = false
    })
}
</script>

<style scoped>
.login-card {
  width: 400px;
  margin: 100px auto;
}

@media (max-width: 768px) {
  .login-card {
    width: 100%;
  }
}
</style>
