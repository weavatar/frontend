<template>
  <div class="upload-avatar"></div>
</template>

<script setup lang="ts">
import type { UploadFileInfo, UploadInst } from 'naive-ui'
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
