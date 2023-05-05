<template>
  <div class="upload-avatar">
    <NModal :show="showModal">
      <NCard
        closable
        :mask-closable="false"
        @close="handleClose"
        title="上传头像"
        style="width: 600px"
      >
        <div class="avatar-card-content">
          <div class="avatar-card-content-left">
            <NUpload
              ref="upload"
              directory-dnd
              :default-upload="false"
              :show-file-list="false"
              @change="handleChange"
              @before-upload="beforeUpload"
            >
              <NUploadDragger>
                <div style="margin-bottom: 12px">
                  <NIcon size="48" :depth="3">
                    <ArchiveIcon />
                  </NIcon>
                </div>
                <NText style="font-size: 16px"> 点击或者拖动图片到该区域来上传 </NText>
                <NP depth="3" style="margin: 8px 0 0 0">
                  上传的图片需符合中华人民共和国相关法律法规要求
                </NP>
              </NUploadDragger>
            </NUpload>
          </div>
        </div>
      </NCard>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { NModal, NCard, NUpload, NUploadDragger, NText, NP, NIcon } from 'naive-ui'
import type { UploadInst, UploadFileInfo } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { ref, toRef } from 'vue'

const props = defineProps({
  show: Boolean
})

const show = toRef(props, 'show')
const showModal = ref(show.value)

const emit = defineEmits(['changeAvatar'])

const handleClose = () => {
  showModal.value = false
}

const upload = ref<UploadInst | null>(null)

function handleChange(options: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  emit('changeAvatar', options.file)
  showModal.value = false
}

const beforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
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

const setShow = (value: boolean) => {
  showModal.value = value
}

defineExpose({
  setShow
})
</script>

<style scoped></style>
