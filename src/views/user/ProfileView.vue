<template>
  <NCard title="我的资料" class="my-profile">
    <div class="user-info">
      <div class="user-avatar">
        <NImage width="50" :src="userStore.info.avatar" />
      </div>
      <div>
        <h1 style="font-size: 23px">{{ userStore.info.nickname }}</h1>
        <h4 style="margin: 0 20px">
          <small>ID: {{ userStore.info.id }}</small>
        </h4>
      </div>
    </div>
    <NSpin :show="show">
      <NForm :model="model">
        <NFormItem path="nickname" label="昵称">
          <NInput placeholder="请输入昵称" v-model:value="model.nickname" @keydown.enter.prevent />
        </NFormItem>
        <NFormItem path="avatar" label="头像">
          <NInput placeholder="请输入公司" v-model:value="model.avatar" @keydown.enter.prevent />
        </NFormItem>

        <NRow :gutter="[0, 24]">
          <NCol :span="24">
            <NButton
              type="primary"
              block
              :loading="loading"
              :disabled="disabled"
              @click="handleSave"
            >
              保存
            </NButton>
          </NCol>
        </NRow>
      </NForm>
    </NSpin>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NImage, NButton, NInput, NFormItem, NForm, NRow, NCol, NSpin } from 'naive-ui'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { fetchUserInfo } from '@/api/user'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const disabled = ref(false)
const show = ref(true)

if (!userStore.auth.login) {
  userStore.clearToken()
  router.push({ name: 'login' })
}

const model = ref({
  nickname: '',
  avatar: ''
})

fetchUserInfo()
  .then((res) => {
    model.value = {
      nickname: res.data.nickname,
      avatar: res.data.avatar
    }
    show.value = false
  })
  .catch((err) => {
    if (err.code === 401) {
      userStore.clearToken()
      router.push({ name: 'login' })
    }
  })

function handleSave() {
  loading.value = true
  disabled.value = true
  /*updateUserInfo(model.value)
    .then((res) => {
      userStore.freshUserInfo()
      window.$message.success(res.message)
    })
    .catch((err) => {
      if (err.code === 401) {
        window.$message.error(err.message)
        userStore.clearToken()
        router.push({ name: 'login' })
      }
      if (err.code !== 422) {
        window.$message.error(err.message)
      }
    })*/
  loading.value = false
  disabled.value = false
}
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 0 0 0 20px;
}

.n-date-picker {
  width: 100%;
}

h3 {
  color: #444;
  margin-top: 60px;
}

.checkbox {
  width: 100%;
  background-color: #f4f4f4;
  margin: 10px 0 30px;
  padding: 20px 10px;
  box-sizing: border-box;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border: 1px solid #eee;
}

.user-info {
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin: 30px 0;
}

.my-profile {
  width: 400px;
  margin: 40px auto;
}

@media (max-width: 768px) {
  .my-profile {
    width: 100%;
  }
}
</style>
