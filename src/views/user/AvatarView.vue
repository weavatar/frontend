<template>
  <div class="avatar">
    <NCard title="头像管理">
      <NSpace vertical>
        <NAlert type="info" class="avatar-notice">
          你可以通过
          <b>https://weavatar.com/avatar/地址MD5值</b> 的方式访问自己的头像。
          <RouterLink :to="{ name: 'help' }"> 查看帮助 </RouterLink>
          /
          <RouterLink :to="{ name: 'doc' }"> 查看文档 </RouterLink>
        </NAlert>
        <NDataTable
          striped
          :columns="columns"
          :data="data"
          :loading="loading"
          :row-key="(row) => row.id"
        />
        <NCard :bordered="false">
          <NButton
            type="primary"
            size="large"
            style="display: block; margin-left: auto; margin-right: auto"
            @click="() => (addModal = true)"
          >
            添加头像
          </NButton>
        </NCard>
      </NSpace>
    </NCard>
    <NModal v-model:show="addModal" title="添加头像">
      <NCard closable @close="() => (addModal = false)" title="添加头像" style="width: 60vh">
        <NForm :model="addModel">
          <NFormItem path="raw" label="地址">
            <NInput
              v-model:value="addModel.raw"
              type="text"
              @keydown.enter.prevent
              placeholder="手机号 / 邮箱"
            />
          </NFormItem>
          <NFormItem path="avatar" label="头像">
            <NButton type="info" block @click="handleSetAvatar('add')">
              {{ addSetAvatar }}
            </NButton>
          </NFormItem>
          <NFormItem path="verify_code" label="验证码">
            <NRow :gutter="[0, 24]">
              <NCol :span="14">
                <NInput v-model:value="addModel.verify_code" type="text" @keydown.enter.prevent />
              </NCol>
              <NCol :span="2"></NCol>
              <NCol :span="8">
                <VerifyCode :block="true" :to="addModel.raw" use_for="avatar" />
              </NCol>
            </NRow>
          </NFormItem>
        </NForm>
        <NDivider />
        <NRow :gutter="[0, 24]">
          <NCol :span="24">
            <NButton
              type="primary"
              block
              :loading="buttonLoading"
              :disabled="buttonDisabled"
              @click="handleAddAvatar"
            >
              添加
            </NButton>
          </NCol>
        </NRow>
      </NCard>
    </NModal>
    <NModal v-model:show="changeModal" title="修改头像">
      <NCard closable @close="() => (changeModal = false)" title="修改头像" style="width: 60vh">
        <NForm :model="changeModel">
          <NFormItem path="avatar" label="头像">
            <NButton type="info" block @click="handleSetAvatar('change')">
              {{ changeSetAvatar }}
            </NButton>
          </NFormItem>
        </NForm>
        <NDivider />
        <NRow :gutter="[0, 24]">
          <NCol :span="24">
            <NButton
              type="primary"
              block
              :loading="buttonLoading"
              :disabled="buttonDisabled"
              @click="handleChangeAvatar"
            >
              修改
            </NButton>
          </NCol>
        </NRow>
      </NCard>
    </NModal>
    <UploadAvatar ref="uploadAvatarRef" @changeAvatar="handleUploadAvatar" />
    <CropAvatar ref="cropAvatarRef" @cropAvatar="handleCropAvatar" />
  </div>
</template>

<script setup lang="ts">
import type { DataTableColumns, UploadFileInfo } from 'naive-ui'
import {
  NAlert,
  NButton,
  NCard,
  NCol,
  NDataTable,
  NDivider,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NPopconfirm,
  NRow,
  NSpace
} from 'naive-ui'
import type { VNode } from 'vue'
import { computed, h, ref, watch } from 'vue'
import { addAvatar, deleteAvatar, fetchAvatarList, updateAvatar } from '@/api/avatar'
import { checkBind } from '@/api/system'
import UploadAvatar from '@/components/avatar/UploadAvatar.vue'
import CropAvatar from '@/components/avatar/CropAvatar.vue'
import VerifyCode from '@/components/captcha/VerifyCode.vue'
import { isEmail, isPhone } from '@/utils/is'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useReCaptcha } from 'vue-recaptcha-v3'

interface Avatar {
  hash: string
  raw: string
  user_id: number
  ban: boolean
  check: boolean
  created_at: string
  updated_at: string
}

const loading = ref(true)
const data = ref([] as Avatar[])
const addModal = ref(false)
const changeModal = ref(false)
const buttonLoading = ref(false)
const buttonDisabled = ref(false)

const addSetAvatar = ref('设置头像')
const changeSetAvatar = ref('设置头像')

const userStore = useUserStore()
const router = useRouter()

const reCaptchaInstance = useReCaptcha()

// recaptcha
async function getRecaptcha() {
  await reCaptchaInstance?.recaptchaLoaded()
  return reCaptchaInstance?.executeRecaptcha('avatar') as Promise<string>
}

if (!userStore.auth.login) {
  userStore.clearToken()
  router.push({ name: 'login' })
}

fetchAvatarList()
  .then((res) => {
    data.value = res.data as Avatar[]
    loading.value = false
  })
  .catch((res) => {
    window.$message.error(res.message)
    loading.value = false
  })

const columns: DataTableColumns<Avatar> = [
  {
    title: '头像',
    key: 'hash',
    render({ hash }) {
      return h('img', {
        src: `https://weavatar.com/api/avatar/${hash}?s=50`,
        style: {
          borderRadius: '10%'
        }
      })
    }
  },
  {
    title: '地址',
    key: 'raw',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      let actions: VNode[] = []
      actions.push(
        h(
          NButton,
          {
            style: {
              marginRight: '16px'
            },
            strong: true,
            size: 'small',
            type: 'info',
            onClick: () => {
              changeModal.value = true
              changeModel.value.hash = row.hash
            }
          },
          { default: () => '修改图片' }
        )
      )
      actions.push(
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleAvatarDelete(row.hash),
            onNegativeClick: () => {
              window.$message.info('取消删除')
            }
          },
          {
            default: () => {
              return '确定删除头像吗？'
            },
            trigger: () => {
              return h(
                NButton,
                {
                  strong: true,
                  size: 'small',
                  type: 'error'
                },
                { default: () => '删除头像' }
              )
            }
          }
        )
      )
      return h(
        NSpace,
        {},
        {
          default: () => actions
        }
      )
    }
  }
]

// 用来记录正在上传哪种头像
const uploadAt = ref('add')

const addModel = ref({
  raw: '',
  avatar: new Blob(),
  captcha: '',
  verify_code: ''
})
const changeModel = ref({
  hash: '',
  avatar: new Blob(),
  captcha: ''
})

const addAvatarSize = computed(() => addModel.value.avatar.size)
const changeAvatarSize = computed(() => changeModel.value.avatar.size)

watch(
  () => addAvatarSize,
  (size) => {
    if (size.value === 0) {
      addSetAvatar.value = '设置头像'
    } else {
      addSetAvatar.value = '重新设置头像'
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  () => changeAvatarSize,
  (size) => {
    if (size.value === 0) {
      changeSetAvatar.value = '设置头像'
    } else {
      changeSetAvatar.value = '重新设置头像'
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const uploadAvatarRef = ref()
const cropAvatarRef = ref()

const handleSetAvatar = (type: string) => {
  uploadAt.value = type
  uploadAvatarRef.value.setShow(true)
}

const handleUploadAvatar = (avatar: UploadFileInfo) => {
  cropAvatarRef.value.setShow(true)
  cropAvatarRef.value.setImage(avatar.file as File)
}

const handleCropAvatar = (avatar: any) => {
  switch (uploadAt.value) {
    case 'add':
      addModel.value.avatar = avatar
      break
    case 'change':
      changeModel.value.avatar = avatar
      break
  }
}

// 添加头像
const handleAddAvatar = async () => {
  if (addModel.value.avatar.size === 0) {
    window.$message.error('请先上传头像')
    return
  }
  if (addModel.value.raw === '') {
    window.$message.error('请先输入地址')
    return
  }
  if (!isPhone(addModel.value.raw) && !isEmail(addModel.value.raw)) {
    window.$message.error('请输入正确的手机号或邮箱')
    return
  }
  if (addModel.value.verify_code === '') {
    window.$message.error('请先输入验证码')
    return
  }

  buttonLoading.value = true
  buttonDisabled.value = true
  loading.value = true
  window.$loadingBar.start()

  addModel.value.captcha = await getRecaptcha()

  await checkBind(addModel.value.raw)
    .then((res) => {
      if (res.data.bind == true) {
        window.$dialog.warning({
          title: '警告',
          content: '该地址已被其他用户添加，是否继续添加？',
          positiveText: '是',
          negativeText: '否',
          onPositiveClick: async () => {
            const formData = new FormData()
            formData.append('raw', addModel.value.raw)
            formData.append('avatar', addModel.value.avatar, 'avatar.png')
            formData.append('verify_code', addModel.value.verify_code)
            formData.append('captcha', addModel.value.captcha)
            addAvatar(formData)
              .then((res) => {
                window.$message.success(`添加成功，10 分钟内全网生效`)
                addModal.value = false
                addModel.value.raw = ''
                addModel.value.avatar = new Blob()
                addModel.value.verify_code = ''
                addModel.value.captcha = ''
                fetchAvatarList()
                  .then((res) => {
                    data.value = res.data as Avatar[]
                  })
                  .catch((res) => {
                    console.log(res)
                  })
              })
              .catch((err) => {
                console.log(err)
              })
          },
          onNegativeClick: () => {}
        })
      } else {
        const formData = new FormData()
        formData.append('raw', addModel.value.raw)
        formData.append('avatar', addModel.value.avatar, 'avatar.png')
        formData.append('verify_code', addModel.value.verify_code)
        formData.append('captcha', addModel.value.captcha)
        addAvatar(formData)
          .then((res) => {
            window.$message.success(`添加成功，10 分钟内全网生效`)
            addModal.value = false
            addModel.value.raw = ''
            addModel.value.avatar = new Blob()
            addModel.value.verify_code = ''
            addModel.value.captcha = ''
            fetchAvatarList()
              .then((res) => {
                data.value = res.data as Avatar[]
              })
              .catch((res) => {
                console.log(res)
              })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })

  buttonLoading.value = false
  buttonDisabled.value = false
  loading.value = false
  window.$loadingBar.finish()
}

// 删除头像
const handleAvatarDelete = (hash: string) => {
  loading.value = true
  window.$loadingBar.start()
  deleteAvatar(hash)
    .then((res) => {
      window.$message.success(`删除成功，10 分钟内全网生效`)
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
          loading.value = false
          window.$loadingBar.finish()
        })
        .catch((res) => {
          console.log(res)
          loading.value = false
          window.$loadingBar.finish()
        })
    })
    .catch((res) => {
      console.log(res)
      loading.value = false
      window.$loadingBar.finish()
    })
}

// 修改头像
const handleChangeAvatar = async () => {
  if (changeModel.value.avatar.size === 0) {
    window.$message.error('请先选择头像')
    return
  }
  if (changeModel.value.hash === '') {
    window.$message.error('头像哈希为空')
    return
  }

  buttonLoading.value = true
  buttonDisabled.value = true
  loading.value = true
  window.$loadingBar.start()

  changeModel.value.captcha = await getRecaptcha()

  const formData = new FormData()
  formData.append('avatar', changeModel.value.avatar, 'avatar.png')
  formData.append('captcha', changeModel.value.captcha)
  await updateAvatar(changeModel.value.hash, formData)
    .then((res) => {
      window.$message.success(res.message)
      changeModal.value = false
      changeModel.value.hash = ''
      changeModel.value.avatar = new Blob()
      changeModel.value.captcha = ''
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
        })
        .catch((res) => {
          console.log(res)
        })
    })
    .catch((res) => {
      console.log(res)
    })

  buttonLoading.value = false
  buttonDisabled.value = false
  loading.value = false
  window.$loadingBar.finish()
}
</script>

<style scoped>
.avatar {
  padding: 100px;
}

@media screen and (max-width: 719px) {
  .avatar {
    padding: 100px 0 100px 0;
  }
}

:deep(.avatar-notice a) {
  text-decoration: none;
  color: #409eff;
}
</style>
