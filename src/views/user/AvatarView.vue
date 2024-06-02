<template>
  <div class="avatar">
    <NCard title="头像管理">
      <NSpace vertical>
        <NAlert type="info" class="avatar-notice">
          你可以通过
          <b>https://weavatar.com/avatar/地址 SHA256 或 MD5 值</b> 的方式访问自己的头像。
          <RouterLink :to="{ name: 'help' }">查看帮助</RouterLink>
          /
          <RouterLink :to="{ name: 'doc' }">查看文档</RouterLink>
        </NAlert>
        <NDataTable
          striped
          remote
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :row-key="(row) => row.id"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
        <NCard :bordered="false">
          <NButton
            type="primary"
            size="large"
            style="display: block; margin-left: auto; margin-right: auto"
            @click="
              () => {
                uploadType = 'add'
                addModal = true
              }
            "
          >
            添加头像
          </NButton>
        </NCard>
      </NSpace>
    </NCard>
    <NModal v-model:show="addModal" title="添加头像">
      <NCard closable @close="() => (addModal = false)" title="添加头像" style="width: 40vh">
        <NForm :model="addModel">
          <NFormItem path="raw" label="地址">
            <NInput
              v-model:value="addModel.raw"
              type="text"
              @keydown.enter.prevent
              placeholder="手机号 / 邮箱"
            />
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
          <NDivider>上传头像或获取QQ头像</NDivider>
          <NFormItem path="avatar" label="上传头像">
            <NUpload
              ref="upload"
              directory-dnd
              :default-upload="false"
              :show-file-list="false"
              @change="handleUploadAvatar"
              @before-upload="sanitizeAvatar"
              v-show="addModel.avatar.size == 0"
            >
              <NUploadDragger>
                <div style="margin-bottom: 12px">
                  <NIcon size="48" :depth="3">
                    <ArchiveIcon />
                  </NIcon>
                </div>
                <NText style="font-size: 16px"> 点击或者拖动图片到该区域来上传</NText>
                <NP depth="3" style="margin: 8px 0 0 0">
                  上传的图片需符合中华人民共和国相关法律法规要求
                </NP>
              </NUploadDragger>
            </NUpload>
            <NButton
              type="primary"
              block
              @click="handleClearUploadAdd"
              v-show="addModel.avatar.size != 0"
            >
              重新上传
            </NButton>
          </NFormItem>
          <NFormItem path="qq" label="获取QQ头像">
            <NRow :gutter="[0, 24]">
              <NCol :span="14">
                <NInput v-model:value="qq" type="text" @keydown.enter.prevent />
              </NCol>
              <NCol :span="2"></NCol>
              <NCol :span="8">
                <NButton block type="primary" :loading="loading" @click="handleGetQQAvatar">
                  一键获取
                </NButton>
              </NCol>
            </NRow>
          </NFormItem>
        </NForm>
        <NDivider />
        <NRow :gutter="[0, 24]">
          <NCol :span="24">
            <NButton
              type="info"
              block
              :loading="buttonLoading"
              :disabled="buttonDisabled"
              @click="handleAddAvatar"
            >
              提交
            </NButton>
          </NCol>
        </NRow>
      </NCard>
    </NModal>
    <NModal v-model:show="changeModal" title="修改头像">
      <NCard closable @close="() => (changeModal = false)" title="修改头像" style="width: 40vh">
        <NForm :model="changeModel">
          <NDivider>上传头像或获取QQ头像</NDivider>
          <NFormItem path="avatar" label="上传头像">
            <NUpload
              ref="upload"
              directory-dnd
              :default-upload="false"
              :show-file-list="false"
              @change="handleUploadAvatar"
              @before-upload="sanitizeAvatar"
              v-show="changeModel.avatar.size == 0"
            >
              <NUploadDragger>
                <div style="margin-bottom: 12px">
                  <NIcon size="48" :depth="3">
                    <ArchiveIcon />
                  </NIcon>
                </div>
                <NText style="font-size: 16px"> 点击或者拖动图片到该区域来上传</NText>
                <NP depth="3" style="margin: 8px 0 0 0">
                  上传的图片需符合中华人民共和国相关法律法规要求
                </NP>
              </NUploadDragger>
            </NUpload>
            <NButton
              type="primary"
              block
              @click="handleClearUploadChange"
              v-show="changeModel.avatar.size != 0"
            >
              重新上传
            </NButton>
          </NFormItem>
          <NFormItem path="qq" label="获取QQ头像">
            <NRow :gutter="[0, 24]">
              <NCol :span="14">
                <NInput v-model:value="qq" type="text" @keydown.enter.prevent />
              </NCol>
              <NCol :span="2"></NCol>
              <NCol :span="8">
                <NButton block type="primary" :loading="loading" @click="handleGetQQAvatar">
                  一键获取
                </NButton>
              </NCol>
            </NRow>
          </NFormItem>
        </NForm>
        <NDivider />
        <NRow :gutter="[0, 24]">
          <NCol :span="24">
            <NButton
              type="info"
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
    <CropAvatar ref="cropAvatarRef" @cropAvatar="handleCropAvatar" />
    <GeetestCaptcha :config="config" @initialized="getCaptcha" />
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
  NIcon,
  NInput,
  NModal,
  NP,
  NPopconfirm,
  NRow,
  NSpace,
  NText,
  NUpload,
  NUploadDragger
} from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import type { VNode } from 'vue'
import { h, reactive, ref } from 'vue'
import { addAvatar, deleteAvatar, fetchAvatarList, updateAvatar } from '@/api/avatar'
import { checkBind } from '@/api/system'
import CropAvatar from '@/components/avatar/CropAvatar.vue'
import VerifyCode from '@/components/captcha/VerifyCode.vue'
import { isEmail, isPhone } from '@/utils/is'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { fetchQQAvatar } from '@/api/user'
import { type CaptchaConfig, GeetestCaptcha } from 'vue3-geetest'

interface Avatar {
  sha256: string
  md5: string
  raw: string
  user_id: number
  created_at: string
  updated_at: string
}

const config: CaptchaConfig = {
  product: 'bind'
}
let captcha: any
const getCaptcha = (instance: any) => {
  captcha = instance
  captcha
    .onError(function (e: any) {
      window.$message.error(e.msg)
    })
    .onSuccess(function () {
      if (uploadType.value === 'add') {
        doAddAvatar(captcha.getValidate())
      } else {
        doChangeAvatar(captcha.getValidate())
      }
    })
}

const loading = ref(true)
const data = ref<Avatar[]>([])
const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  showQuickJumper: true,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})
const addModal = ref(false)
const changeModal = ref(false)
const buttonLoading = ref(false)
const buttonDisabled = ref(false)

const userStore = useUserStore()
const router = useRouter()

if (!userStore.auth.login) {
  userStore.clearToken()
  router.push({ name: 'login' })
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  handlePageChange(1)
}

const handlePageChange = async (page: number) => {
  loading.value = true

  fetchAvatarList(page, pagination.pageSize)
    .then((res) => {
      data.value = res.data.items
      pagination.page = page
      pagination.itemCount = res.data.total
      pagination.pageCount = res.data.total / pagination.pageSize + 1
    })
    .catch((res) => {
      console.log(res)
    })

  loading.value = false
}

handlePageChange(1)

const columns: DataTableColumns<Avatar> = [
  {
    title: '头像',
    key: 'hash',
    render({ sha256 }) {
      return h('img', {
        src: `https://weavatar.com/api/avatar/${sha256}?s=50&t=` + new Date().getTime(),
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
              uploadType.value = 'change'
              changeModal.value = true
              changeModel.value.hash = row.sha256
            }
          },
          { default: () => '修改图片' }
        )
      )
      actions.push(
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleDeleteAvatar(row.sha256),
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
const uploadType = ref('add')

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
const qq = ref('')

const cropAvatarRef = ref()

const sanitizeAvatar = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  const isJPG = data.file.file?.type === 'image/jpeg'
  const isPNG = data.file.file?.type === 'image/png'
  const isGIF = data.file.file?.type === 'image/gif'
  const isWEBP = data.file.file?.type === 'image/webp'
  const isLt5M = data.file.file?.size! / 1024 / 1024 < 5

  if (!isJPG && !isPNG && !isGIF && !isWEBP) {
    window.$message.error('上传头像图片只能是 JPG / PNG / GIF / WEBP 格式')
  }
  if (!isLt5M) {
    window.$message.error('上传头像图片大小不能超过 5 MB')
  }
  return (isJPG || isPNG || isGIF) && isLt5M
}

const handleUploadAvatar = (options: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  cropAvatarRef.value.setShow(true)
  cropAvatarRef.value.setImage(options.file.file as Blob)
}

const handleClearUploadAdd = () => {
  addModel.value.avatar = new Blob()
}

const handleClearUploadChange = () => {
  changeModel.value.avatar = new Blob()
}

const handleGetQQAvatar = async () => {
  if (qq.value === '') {
    window.$message.error('请输入QQ号')
    return
  }
  fetchQQAvatar(qq.value)
    .then((res) => {
      window.$message.success('获取成功')
      let binaryData = atob(res.data)
      let uint8Array = new Uint8Array(binaryData.length)
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i)
      }
      let blob = new Blob([uint8Array], { type: 'image/png' })
      cropAvatarRef.value.setShow(true)
      cropAvatarRef.value.setImage(blob)
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleCropAvatar = (avatar: any) => {
  switch (uploadType.value) {
    case 'add':
      addModel.value.avatar = avatar
      break
    case 'change':
      changeModel.value.avatar = avatar
      break
  }
}

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

  captcha.showCaptcha()
}

const handleChangeAvatar = async () => {
  if (changeModel.value.avatar.size === 0) {
    window.$message.error('请先选择头像')
    return
  }
  if (changeModel.value.hash === '') {
    window.$message.error('头像哈希为空')
    return
  }

  captcha.showCaptcha()
}

const handleDeleteAvatar = async (hash: string) => {
  loading.value = true
  window.$loadingBar.start()

  await deleteAvatar(hash)
    .then(() => {
      window.$message.success(`删除成功，3 小时内全网生效`)
      handlePageChange(1)
    })
    .catch((res) => {
      console.log(res)
    })

  loading.value = false
  window.$loadingBar.finish()
}

const doAddAvatar = async (captcha: any) => {
  buttonLoading.value = true
  buttonDisabled.value = true
  loading.value = true
  window.$loadingBar.start()

  addModel.value.captcha = captcha

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
            formData.append('captcha', JSON.stringify(addModel.value.captcha))
            addAvatar(formData)
              .then(() => {
                window.$message.success(`添加成功，3 小时内全网生效`)
                addModal.value = false
                addModel.value.raw = ''
                addModel.value.avatar = new Blob()
                addModel.value.verify_code = ''
                addModel.value.captcha = ''
                handlePageChange(1)
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
        formData.append('captcha', JSON.stringify(addModel.value.captcha))
        addAvatar(formData)
          .then(() => {
            window.$message.success(`添加成功，3 小时内全网生效`)
            addModal.value = false
            addModel.value.raw = ''
            addModel.value.avatar = new Blob()
            addModel.value.verify_code = ''
            addModel.value.captcha = ''
            handlePageChange(1)
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

const doChangeAvatar = async (captcha: any) => {
  buttonLoading.value = true
  buttonDisabled.value = true
  loading.value = true
  window.$loadingBar.start()

  changeModel.value.captcha = captcha

  const formData = new FormData()
  formData.append('avatar', changeModel.value.avatar, 'avatar.png')
  formData.append('captcha', JSON.stringify(changeModel.value.captcha))
  console.log(formData)
  await updateAvatar(changeModel.value.hash, formData)
    .then(() => {
      window.$message.success(`修改成功，3 小时内全网生效`)
      changeModal.value = false
      changeModel.value.hash = ''
      changeModel.value.avatar = new Blob()
      changeModel.value.captcha = ''
      handlePageChange(1)
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
