<template>
  <div>
    <NImage
      :src="captcha"
      :alt="captcha_id"
      :width="110"
      :height="40"
      @click="getCaptcha"
      preview-disabled
      lazy
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NImage } from 'naive-ui'
import { image as imageCaptcha } from '@/api/captcha'

const captcha_id = ref('')
const captcha = ref('')
const emit = defineEmits(['updateCaptcha'])

const getCaptcha = async () => {
  await imageCaptcha()
    .then((res) => {
      captcha_id.value = res.data.captcha_id
      captcha.value = res.data.captcha
      emit('updateCaptcha', res.data.captcha_id)
    })
    .catch((err) => {
      console.log(err)
    })
}

getCaptcha()

defineExpose({
  getCaptcha
})
</script>

<style scoped></style>
