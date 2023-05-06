<template>
  <div class="avatar">
    <NCard title="头像管理">
      <NDataTable :columns="columns" :data="data" :loading="loading" :row-key="(row) => row.id" />
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
            <NButton type="info" style="width: 100%" @click="handleSetAvatar('add')">
              {{ addSetAvatar }}
            </NButton>
          </NFormItem>
          <NFormItem path="captcha" label="验证码">
            <NRow :gutter="[0, 24]">
              <NCol :span="14">
                <NInput v-model:value="addModel.captcha" type="text" @keydown.enter.prevent />
              </NCol>
              <NCol :span="2"></NCol>
              <NCol :span="8">
                <ImageCaptcha ref="ImageCaptchaRef" @UpdateCaptcha="handleUpdateCaptcha" />
              </NCol>
            </NRow>
          </NFormItem>
          <NFormItem path="verify_code" label="验证码">
            <NRow :gutter="[0, 24]">
              <NCol :span="14">
                <NInput v-model:value="addModel.verify_code" type="text" @keydown.enter.prevent />
              </NCol>
              <NCol :span="2"></NCol>
              <NCol :span="8">
                <VerifyCode
                  ref="VerifyCodeRef"
                  :block="true"
                  :to="addModel.raw"
                  :captcha="addModel.captcha"
                  :captcha_id="addModel.captcha_id"
                  @click="handleVerifyCodeSend"
                  @updateImageCaptchaValue="handleUpdateImageCaptchaValue"
                />
              </NCol>
            </NRow>
          </NFormItem>
        </NForm>
        <NDivider />
        <NRow :gutter="[0, 24]">
          <NCol :span="24">
            <NButton type="primary" style="width: 100%" @click="handleAddAvatar"> 添加 </NButton>
          </NCol>
        </NRow>
      </NCard>
    </NModal>
    <NModal v-model:show="changeModal" title="修改头像">
      <NCard closable @close="() => (changeModal = false)" title="修改头像" style="width: 60vh">
        <NForm :model="changeModel">
          <NFormItem path="avatar" label="头像">
            <NButton type="info" style="width: 100%" @click="handleSetAvatar('change')">
              {{ changeSetAvatar }}
            </NButton>
          </NFormItem>
          <NFormItem path="captcha" label="验证码">
            <NRow :gutter="[0, 24]">
              <NCol :span="14">
                <NInput v-model:value="changeModel.captcha" type="text" @keydown.enter.prevent />
              </NCol>
              <NCol :span="2"></NCol>
              <NCol :span="8">
                <ImageCaptcha ref="ImageCaptchaRef" @UpdateCaptcha="handleUpdateCaptcha" />
              </NCol>
            </NRow>
          </NFormItem>
        </NForm>
        <NDivider />
        <NRow :gutter="[0, 24]">
          <NCol :span="24">
            <NButton type="primary" style="width: 100%" @click="handleChangeAvatar"> 修改 </NButton>
          </NCol>
        </NRow>
      </NCard>
    </NModal>
    <UploadAvatar ref="uploadAvatarRef" @changeAvatar="handleUploadAvatar" />
    <CropAvatar ref="cropAvatarRef" @cropAvatar="handleCropAvatar" />
  </div>
</template>

<script setup lang="ts">
import {
  NCard,
  NButton,
  NDataTable,
  NPopconfirm,
  NModal,
  NForm,
  NFormItem,
  NInput,
  NRow,
  NCol,
  NDivider
} from 'naive-ui'
import type { DataTableColumns, UploadFileInfo } from 'naive-ui'
import { computed, h, ref, watch } from 'vue'
import type { VNode } from 'vue'
import { fetchAvatarList, deleteAvatar, addAvatar, updateAvatar } from '@/api/avatar'
import { checkBind } from '@/api/system'
import UploadAvatar from '@/components/avatar/UploadAvatar.vue'
import CropAvatar from '@/components/avatar/CropAvatar.vue'
import ImageCaptcha from '@/components/captcha/ImageCaptcha.vue'
import VerifyCode from '@/components/captcha/VerifyCode.vue'
import { isEmail, isPhone } from '@/utils/is'

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

const addSetAvatar = ref('设置头像')
const changeSetAvatar = ref('设置头像')

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
        src: `https://weavatar.com/avatar/${hash}?s=50&t=` + new Date().getTime(),
        style: {
          borderRadius: '10%'
        }
      })
    }
  },
  {
    title: '地址',
    key: 'raw'
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
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
      return actions
    }
  }
]

// 用来记录正在上传哪种头像
const uploadAt = ref('add')

const addModel = ref({
  raw: '',
  avatar: new Blob(),
  captcha_id: '',
  captcha: '',
  verify_code: ''
})
const changeModel = ref({
  hash: '',
  avatar: new Blob(),
  captcha_id: '',
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

const ImageCaptchaRef = ref()
const VerifyCodeRef = ref()
const uploadAvatarRef = ref()
const cropAvatarRef = ref()

function handleVerifyCodeSend() {
  if (addModel.value.captcha == '') {
    window.$message.error('请先完成图形验证码')
    return
  }

  // 发送验证码
  VerifyCodeRef.value.sendVerifyCode('avatar')
  // 刷新图形验证码
  ImageCaptchaRef.value.getCaptcha()
}

function handleUpdateCaptcha(captchaId: string) {
  addModel.value.captcha_id = captchaId
  changeModel.value.captcha_id = captchaId
}

function handleUpdateImageCaptchaValue(captcha: string) {
  addModel.value.captcha = captcha
  changeModel.value.captcha = captcha
}

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
const handleAddAvatar = () => {
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
  if (addModel.value.captcha === '') {
    window.$message.error('请先完成图形验证码')
    return
  }
  if (addModel.value.verify_code === '') {
    window.$message.error('请先输入验证码')
    return
  }
  loading.value = true
  window.$loadingBar.start()

  checkBind(addModel.value.raw)
    .then((res) => {
      if (res.data.bind == true) {
        window.$dialog.warning({
          title: '警告',
          content: '该地址已被其他用户添加，是否继续添加？',
          positiveText: '是',
          negativeText: '否',
          onPositiveClick: () => {
            const formData = new FormData()
            formData.append('raw', addModel.value.raw)
            formData.append('avatar', addModel.value.avatar, 'avatar.png')
            formData.append('verify_code', addModel.value.verify_code)
            formData.append('captcha_id', addModel.value.captcha_id)
            formData.append('captcha', addModel.value.captcha)
            addAvatar(formData)
              .then((res) => {
                window.$message.success(res.message)
                addModal.value = false
                addModel.value.raw = ''
                addModel.value.avatar = new Blob()
                addModel.value.verify_code = ''
                addModel.value.captcha_id = ''
                addModel.value.captcha = ''
                fetchAvatarList()
                  .then((res) => {
                    data.value = res.data as Avatar[]
                    loading.value = false
                    window.$loadingBar.finish()
                  })
                  .catch((res) => {
                    window.$message.error(res.message)
                    loading.value = false
                    window.$loadingBar.finish()
                  })
              })
              .catch((err) => {
                console.log(err)
                loading.value = false
                window.$loadingBar.finish()
              })
          },
          onNegativeClick: () => {}
        })
      } else {
        const formData = new FormData()
        formData.append('raw', addModel.value.raw)
        formData.append('avatar', addModel.value.avatar, 'avatar.png')
        formData.append('verify_code', addModel.value.verify_code)
        formData.append('captcha_id', addModel.value.captcha_id)
        formData.append('captcha', addModel.value.captcha)
        addAvatar(formData)
          .then((res) => {
            window.$message.success(res.message)
            addModal.value = false
            addModel.value.raw = ''
            addModel.value.avatar = new Blob()
            addModel.value.verify_code = ''
            addModel.value.captcha_id = ''
            addModel.value.captcha = ''
            fetchAvatarList()
              .then((res) => {
                data.value = res.data as Avatar[]
                loading.value = false
                window.$loadingBar.finish()
              })
              .catch((res) => {
                window.$message.error(res.message)
                loading.value = false
                window.$loadingBar.finish()
              })
          })
          .catch((err) => {
            console.log(err)
            loading.value = false
            window.$loadingBar.finish()
          })
      }
    })
    .catch((err) => {
      console.log(err)
      window.$message.error(err.message)
    })
}

// 删除头像
const handleAvatarDelete = (hash: string) => {
  loading.value = true
  window.$loadingBar.start()
  deleteAvatar(hash)
    .then((res) => {
      window.$message.success(res.message)
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
          loading.value = false
          window.$loadingBar.finish()
        })
        .catch((res) => {
          window.$message.error(res.message)
          loading.value = false
          window.$loadingBar.finish()
        })
    })
    .catch((res) => {
      window.$message.error(res.message)
      loading.value = false
      window.$loadingBar.finish()
    })
}

// 修改头像
const handleChangeAvatar = () => {
  if (changeModel.value.avatar.size === 0) {
    window.$message.error('请先选择头像')
    return
  }
  if (changeModel.value.hash === '') {
    window.$message.error('头像哈希为空')
    return
  }

  loading.value = true
  window.$loadingBar.start()

  const formData = new FormData()
  formData.append('avatar', changeModel.value.avatar, 'avatar.png')
  formData.append('captcha_id', changeModel.value.captcha_id)
  formData.append('captcha', changeModel.value.captcha)
  updateAvatar(changeModel.value.hash, formData)
    .then((res) => {
      window.$message.success(res.message)
      changeModal.value = false
      changeModel.value.hash = ''
      changeModel.value.avatar = new Blob()
      changeModel.value.captcha_id = ''
      changeModel.value.captcha = ''
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
          loading.value = false
          window.$loadingBar.finish()
        })
        .catch((res) => {
          window.$message.error(res.message)
          loading.value = false
          window.$loadingBar.finish()
        })
    })
    .catch((res) => {
      window.$message.error(res.message)
      loading.value = false
      window.$loadingBar.finish()
    })
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
</style>
