<template>
  <div class="avatar">
    <NCard title="头像管理">
      <NDataTable :columns="columns" :data="data" :loading="loading" :row-key="(row) => row.id" />
      <NCard :bordered="false">
        <NButton
          type="primary"
          size="large"
          style="display: block; margin-left: auto; margin-right: auto"
          @click="() => (addShow = true)"
        >
          添加头像
        </NButton>
      </NCard>
    </NCard>
    <NModal v-model:show="addShow" title="添加头像">
      <NCard closable @close="() => (addShow = false)" title="添加头像" style="width: 60vh">
        <NTabs default-value="email" size="large" justify-content="space-evenly">
          <NTabPane name="email" tab="邮箱">
            <NForm :model="emailAddModel">
              <NFormItem path="raw" label="邮箱">
                <NInput v-model:value="emailAddModel.raw" type="text" @keydown.enter.prevent />
              </NFormItem>
              <NFormItem path="avatar" label="头像">
                <NButton type="info" style="width: 100%" @click="handleSetAvatar('email')">
                  {{ emailSetAvatar }}
                </NButton>
              </NFormItem>
              <NFormItem path="captcha" label="验证码">
                <NRow :gutter="[0, 24]">
                  <NCol :span="14">
                    <NInput
                      v-model:value="emailAddModel.captcha"
                      type="text"
                      @keydown.enter.prevent
                    />
                  </NCol>
                  <NCol :span="2"></NCol>
                  <NCol :span="8">
                    <ImageCaptcha ref="ImageCaptchaRef" @UpdateCaptcha="handleUpdateCaptcha" />
                  </NCol>
                </NRow>
              </NFormItem>
              <NFormItem path="verify_code" label="邮箱验证码">
                <NRow :gutter="[0, 24]">
                  <NCol :span="14">
                    <NInput
                      v-model:value="emailAddModel.verify_code"
                      type="text"
                      @keydown.enter.prevent
                    />
                  </NCol>
                  <NCol :span="2"></NCol>
                  <NCol :span="8">
                    <EmailCaptcha
                      ref="EmailCaptchaRef"
                      :block="true"
                      :email="emailAddModel.raw"
                      :captcha="emailAddModel.captcha"
                      :captcha_id="emailAddModel.captcha_id"
                      @click="handleEmailCaptchaSend"
                      @updateImageCaptchaValue="handleUpdateImageCaptchaValue"
                    />
                  </NCol>
                </NRow>
              </NFormItem>
            </NForm>
            <NDivider />
            <NRow :gutter="[0, 24]">
              <NCol :span="24">
                <NButton type="primary" style="width: 100%" @click="handleEmailAddAvatar">
                  添加
                </NButton>
              </NCol>
            </NRow>
          </NTabPane>
          <NTabPane name="phone" tab="手机">
            <NForm :model="phoneAddModel">
              <NFormItem path="raw" label="手机号">
                <NInput v-model:value="phoneAddModel.raw" type="text" @keydown.enter.prevent />
              </NFormItem>
              <NFormItem path="avatar" label="头像">
                <NButton type="info" style="width: 100%" @click="handleSetAvatar('phone')">
                  {{ phoneSetAvatar }}
                </NButton>
              </NFormItem>
              <NFormItem path="captcha" label="验证码">
                <NRow :gutter="[0, 24]">
                  <NCol :span="14">
                    <NInput
                      v-model:value="phoneAddModel.captcha"
                      type="text"
                      @keydown.enter.prevent
                    />
                  </NCol>
                  <NCol :span="2"></NCol>
                  <NCol :span="8">
                    <ImageCaptcha ref="ImageCaptchaRef" @UpdateCaptcha="handleUpdateCaptcha" />
                  </NCol>
                </NRow>
              </NFormItem>
              <NFormItem path="verify_code" label="手机验证码">
                <NRow :gutter="[0, 24]">
                  <NCol :span="14">
                    <NInput
                      v-model:value="phoneAddModel.verify_code"
                      type="text"
                      @keydown.enter.prevent
                    />
                  </NCol>
                  <NCol :span="2"></NCol>
                  <NCol :span="8">
                    <PhoneCaptcha
                      ref="PhoneCaptchaRef"
                      :block="true"
                      :phone="phoneAddModel.raw"
                      :captcha="phoneAddModel.captcha"
                      :captcha_id="phoneAddModel.captcha_id"
                      @click="handlePhoneCaptchaSend"
                      @updateImageCaptchaValue="handleUpdateImageCaptchaValue"
                    />
                  </NCol>
                </NRow>
              </NFormItem>
            </NForm>
            <NDivider />
            <NRow :gutter="[0, 24]">
              <NCol :span="24">
                <NButton type="primary" style="width: 100%" @click="handlePhoneAddAvatar">
                  添加
                </NButton>
              </NCol>
            </NRow>
          </NTabPane>
        </NTabs>
      </NCard>
    </NModal>
    <NModal v-model:show="changeShow" title="修改头像">
      <NCard closable @close="() => (changeShow = false)" title="修改头像" style="width: 60vh">
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
  NTabs,
  NTabPane,
  NRow,
  NCol,
  NDivider
} from 'naive-ui'
import type { DataTableColumns, UploadFileInfo } from 'naive-ui'
import { computed, h, ref, watch } from 'vue'
import type { VNode } from 'vue'
import { fetchAvatarList, deleteAvatar, addAvatar, updateAvatar } from '@/api/avatar'
import UploadAvatar from '@/components/avatar/UploadAvatar.vue'
import CropAvatar from '@/components/avatar/CropAvatar.vue'
import ImageCaptcha from '@/components/captcha/ImageCaptcha.vue'
import PhoneCaptcha from '@/components/captcha/PhoneCaptcha.vue'
import EmailCaptcha from '@/components/captcha/EmailCaptcha.vue'

interface Avatar {
  hash: string
  raw: string
  user_id: number
  ban: boolean
  check: boolean
  created_at: string
  updated_at: string
}

const loading = ref(false)
const data = ref([] as Avatar[])
const addShow = ref(false)
const changeShow = ref(false)

const emailSetAvatar = ref('设置头像')
const phoneSetAvatar = ref('设置头像')
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
              changeShow.value = true
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
const uploadAt = ref('email')

const emailAddModel = ref({
  raw: '',
  avatar: new Blob(),
  captcha_id: '',
  captcha: '',
  verify_code: ''
})
const phoneAddModel = ref({
  raw: '',
  avatar: new Blob(),
  avatarChanged: 0,
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

const phoneAvatarSize = computed(() => phoneAddModel.value.avatar.size)
const emailAvatarSize = computed(() => emailAddModel.value.avatar.size)
const changeAvatarSize = computed(() => changeModel.value.avatar.size)

watch(
  () => emailAvatarSize,
  (size) => {
    if (size.value === 0) {
      emailSetAvatar.value = '设置头像'
    } else {
      emailSetAvatar.value = '重新设置头像'
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  () => phoneAvatarSize,
  (size) => {
    if (size.value === 0) {
      phoneSetAvatar.value = '设置头像'
    } else {
      phoneSetAvatar.value = '重新设置头像'
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
const PhoneCaptchaRef = ref()
const EmailCaptchaRef = ref()
const uploadAvatarRef = ref()
const cropAvatarRef = ref()

function handleEmailCaptchaSend() {
  if (emailAddModel.value.captcha == '') {
    window.$message.error('请先完成图形验证码')
    return
  }
  if (emailAddModel.value.raw == '') {
    window.$message.error('请先输入手机号')
    return
  }

  // 发送邮件验证码
  EmailCaptchaRef.value.getEmailCaptcha('avatar')
  // 刷新图形验证码
  ImageCaptchaRef.value.getCaptcha()
}
function handlePhoneCaptchaSend() {
  if (phoneAddModel.value.captcha == '') {
    window.$message.error('请先完成图形验证码')
    return
  }
  if (phoneAddModel.value.raw == '') {
    window.$message.error('请先输入手机号')
    return
  }

  // 发送手机验证码
  PhoneCaptchaRef.value.getPhoneCaptcha('avatar')
  // 刷新图形验证码
  ImageCaptchaRef.value.getCaptcha()
}

function handleUpdateCaptcha(captchaId: string) {
  emailAddModel.value.captcha_id = captchaId
  phoneAddModel.value.captcha_id = captchaId
  changeModel.value.captcha_id = captchaId
}

function handleUpdateImageCaptchaValue(captcha: string) {
  emailAddModel.value.captcha = captcha
  phoneAddModel.value.captcha = captcha
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
    case 'email':
      emailAddModel.value.avatar = avatar
      break
    case 'phone':
      phoneAddModel.value.avatar = avatar
      break
    case 'change':
      changeModel.value.avatar = avatar
      break
  }
}

// 添加邮箱头像
const handleEmailAddAvatar = () => {
  if (emailAddModel.value.avatar.size === 0) {
    window.$message.error('请先上传头像')
    return
  }
  if (emailAddModel.value.verify_code === '') {
    window.$message.error('请先输入邮箱验证码')
    return
  }
  if (emailAddModel.value.raw === '') {
    window.$message.error('请先输入邮箱')
    return
  }
  if (emailAddModel.value.captcha === '') {
    window.$message.error('请先完成图形验证码')
    return
  }
  loading.value = true
  const formData = new FormData()
  formData.append('raw', emailAddModel.value.raw)
  formData.append('avatar', emailAddModel.value.avatar, 'avatar.png')
  formData.append('verify_code', emailAddModel.value.verify_code)
  formData.append('captcha_id', emailAddModel.value.captcha_id)
  formData.append('captcha', emailAddModel.value.captcha)
  addAvatar(formData)
    .then((res) => {
      window.$message.success(res.message)
      emailAddModel.value.raw = ''
      emailAddModel.value.avatar = new Blob()
      emailAddModel.value.verify_code = ''
      emailAddModel.value.captcha_id = ''
      emailAddModel.value.captcha = ''
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
          loading.value = false
        })
        .catch((res) => {
          window.$message.error(res.message)
          loading.value = false
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
// 添加手机头像
const handlePhoneAddAvatar = () => {
  if (phoneAddModel.value.avatar.size === 0) {
    window.$message.error('请先上传头像')
    return
  }
  if (phoneAddModel.value.verify_code === '') {
    window.$message.error('请先输入手机验证码')
    return
  }
  if (phoneAddModel.value.raw === '') {
    window.$message.error('请先输入手机号')
    return
  }
  if (phoneAddModel.value.captcha === '') {
    window.$message.error('请先完成图形验证码')
    return
  }
  loading.value = true
  const formData = new FormData()
  formData.append('raw', phoneAddModel.value.raw)
  formData.append('avatar', phoneAddModel.value.avatar, 'avatar.png')
  formData.append('verify_code', phoneAddModel.value.verify_code)
  formData.append('captcha_id', phoneAddModel.value.captcha_id)
  formData.append('captcha', phoneAddModel.value.captcha)
  addAvatar(formData)
    .then((res) => {
      window.$message.success(res.message)
      phoneAddModel.value.raw = ''
      phoneAddModel.value.avatar = new Blob()
      phoneAddModel.value.verify_code = ''
      phoneAddModel.value.captcha_id = ''
      phoneAddModel.value.captcha = ''
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
          loading.value = false
        })
        .catch((res) => {
          window.$message.error(res.message)
          loading.value = false
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

// 删除头像
const handleAvatarDelete = (hash: string) => {
  deleteAvatar(hash)
    .then((res) => {
      window.$message.success(res.message)
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
          loading.value = false
        })
        .catch((res) => {
          window.$message.error(res.message)
          loading.value = false
        })
    })
    .catch((res) => {
      window.$message.error(res.message)
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

  const formData = new FormData()
  formData.append('avatar', changeModel.value.avatar, 'avatar.png')
  formData.append('captcha_id', changeModel.value.captcha_id)
  formData.append('captcha', changeModel.value.captcha)
  updateAvatar(changeModel.value.hash, formData)
    .then((res) => {
      window.$message.success(res.message)
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
          loading.value = false
        })
        .catch((res) => {
          window.$message.error(res.message)
          loading.value = false
        })
    })
    .catch((res) => {
      window.$message.error(res.message)
    })
}
</script>

<style scoped>
.avatar {
  padding: 100px;
}
</style>
