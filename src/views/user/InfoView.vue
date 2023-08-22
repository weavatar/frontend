<template>
  <NCard title="我的资料" class="my-info">
    <div class="user-info">
      <div class="user-avatar">
        <NImage width="50" :src="userStore.info.avatar" preview-disabled lazy />
      </div>
      <div>
        <h1 style="font-size: 23px">
          {{ userStore.info.nickname }}
          <NTag type="success">
            {{ userStore.info.real_name ? '已实名' : '未实名' }}
          </NTag>
        </h1>
        <h4 style="margin: 0 20px">
          <small>ID: {{ userStore.info.id }}</small>
        </h4>
      </div>
    </div>
    <h4>下面的设置目前仅在 WeAvatar 平台显示使用</h4>
    <NSpin :show="show">
      <NForm :model="model">
        <NFormItem path="nickname" label="昵称">
          <NInput
            placeholder="输入一个昵称"
            v-model:value="model.nickname"
            @keydown.enter.prevent
          />
        </NFormItem>
        <NFormItem path="avatar" label="头像">
          <NInput
            placeholder="输入一个图片地址"
            v-model:value="model.avatar"
            @keydown.enter.prevent
          />
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
import { NButton, NCard, NCol, NForm, NFormItem, NImage, NInput, NRow, NSpin, NTag } from 'naive-ui'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { fetchUserInfo, updateUserInfo } from '@/api/user'

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
    console.log(err)
  })

const handleSave = async () => {
  loading.value = true
  disabled.value = true
  await updateUserInfo(model.value)
    .then(() => {
      userStore.freshUserInfo()
      window.$message.success('保存成功')
    })
    .catch((err) => {
      console.log(err)
    })
  loading.value = false
  disabled.value = false
}
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 0 0 0 20px;
}

h3 {
  color: #444;
  margin-top: 60px;
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

.my-info {
  width: 400px;
  margin: 80px auto;
}

@media (max-width: 768px) {
  .my-info {
    width: 100%;
  }
}
</style>
