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
        <NFormItem path="nick" label="昵称">
          <NInput placeholder="请输入昵称" v-model:value="model.nickname" @keydown.enter.prevent />
        </NFormItem>
        <NFormItem path="birthday" label="生日">
          <NDatePicker
            v-model:formatted-value="model.birthday"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </NFormItem>
        <NFormItem path="password" label="地址">
          <NCascader
            v-model:value="model.address.code"
            value-field="code"
            label-field="name"
            placeholder="选择地址"
            check-strategy="child"
            :options="areas"
          />
        </NFormItem>
        <NFormItem path="detail" label="详细地址">
          <NInput
            placeholder="可选输入详细地址"
            v-model:value="model.address.detail"
            @keydown.enter.prevent
          />
        </NFormItem>
        <NFormItem path="hometown" label="家乡">
          <NCascader
            v-model:value="model.hometown.code"
            value-field="code"
            label-field="name"
            placeholder="选择家乡"
            check-strategy="child"
            :options="areas"
          />
        </NFormItem>
        <NFormItem path="detail" label="家乡详细地址">
          <NInput
            placeholder="可选输入家乡详细地址"
            v-model:value="model.hometown.detail"
            @keydown.enter.prevent
          />
        </NFormItem>
        <NFormItem path="nick" label="职业">
          <NInput
            placeholder="请输入职业"
            v-model:value="model.profession"
            @keydown.enter.prevent
          />
        </NFormItem>
        <NFormItem path="nick" label="公司">
          <NInput placeholder="请输入公司" v-model:value="model.company" @keydown.enter.prevent />
        </NFormItem>
        <NFormItem placeholder="请输入简介" path="nick" label="简介">
          <NInput v-model:value="model.introduction" type="textarea" @keydown.enter.prevent />
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
import {
  NCard,
  NImage,
  NButton,
  NInput,
  NFormItem,
  NForm,
  NRow,
  NDatePicker,
  NCol,
  NCascader,
  NSpin
} from 'naive-ui'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import areas from 'china-division/dist/pca-code.json'
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
  company: '',
  birthday: '2023-01-01',
  nickname: '',
  profession: '',
  address: {
    detail: '',
    code: ''
  },
  hometown: {
    detail: '',
    code: ''
  },
  introduction: ''
})

fetchUserInfo()
  .then((res) => {
    model.value = {
      company: res.data.company,
      birthday: res.data.birthday,
      nickname: res.data.nickname,
      profession: res.data.profession,
      address: res.data.address,
      hometown: res.data.hometown,
      introduction: res.data.introduction
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
  updateUserInfo(model.value)
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
