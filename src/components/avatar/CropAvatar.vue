<template>
  <div class="crop-avatar">
    <NModal :show="showModal">
      <NCard
        closable
        :mask-closable="false"
        @close="handleClose"
        title="裁剪头像"
        style="width: 40vh; height: 40vh"
      >
        <div style="width: 100%; height: 80%">
          <VueCropper
            ref="cropper"
            :img="option.img"
            :info="option.info"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :canMove="option.canMove"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :canMoveBox="option.canMoveBox"
            :canScale="option.canScale"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :limitMinSize="option.limitMinSize"
          ></VueCropper>
        </div>
        <NDivider />
        <NButton
          type="primary"
          size="large"
          style="display: block; margin-left: auto; margin-right: auto"
          @click="handleConfirm"
        >
          确定
        </NButton>
      </NCard>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { NButton, NCard, NDivider, NModal } from 'naive-ui'
import { ref } from 'vue'

import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

const showModal = ref(false)

const cropper = ref<any>(null)

const option = ref({
  img: 'https://weavatar.com/avatar', // 图片的url地址
  info: false, // 是否显示图片的详细信息
  outputSize: 1, // 裁剪生成图片的质量 0.1 - 1
  outputType: 'png', //	裁剪生成图片的格式 jpeg || png || webp
  canScale: true, // 图片是否允许滚轮缩放 默认true
  autoCrop: true, // 是否默认生成截图框 默认false
  autoCropWidth: 999999, // 默认生成截图框宽度
  autoCropHeight: 999999, // 默认生成截图框高度
  canMove: true, //上传图片是否可以移动 默认true
  fixedBox: false, // 固定截图框大小 不允许改变
  fixed: true, //是否开启截图框宽高固定比例
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  canMoveBox: true, //截图框能否拖动
  fixedNumber: [1, 1], // 截图框的宽高比例 [宽度, 高度]
  limitMinSize: 80 // 截图框能不能无限缩小到比这个尺寸还小
})

const handleClose = () => {
  showModal.value = false
}

const emit = defineEmits(['cropAvatar'])

const handleConfirm = () => {
  cropper.value.getCropBlob((data: any) => {
    emit('cropAvatar', data)
    showModal.value = false
  })
}

const setShow = (value: boolean) => {
  showModal.value = value
}

const setImage = (value: Blob) => {
  option.value.img = URL.createObjectURL(value)
}

defineExpose({
  setShow,
  setImage
})
</script>

<style scoped></style>
