<template>
  <div>
    <NButton :block="block" :type="type" :loading="loading" :disabled="disabled">
      {{ msg }}</NButton
    >
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue'
import { NButton } from 'naive-ui'
import { phone as phoneCaptcha } from '@/api/captcha'
import type { Type } from 'naive-ui/lib/button/src/interface'

const props = defineProps({
  phone: String,
  captcha_id: String,
  captcha: String
})

const { phone, captcha_id, captcha } = toRefs(props)
const loading = ref(false)
const msg = ref('发送')
const type = ref('primary' as Type)
const disabled = ref(false)
const block = ref(true)

const emit = defineEmits(['updateImageCaptchaValue'])

const getPhoneCaptcha = (use_for: string) => {
  // 发送手机验证码
  if (phone?.value && captcha_id?.value && captcha?.value) {
    loading.value = true
    // 防止重复点击
    if (disabled.value) {
      return
    }
    phoneCaptcha(phone.value, use_for, captcha_id.value, captcha.value)
      .then((res) => {
        if (res.code == 0) {
          window.$message.success(res.message)
        }
        let time = 60
        let timer = setInterval(() => {
          if (time > 0 && time <= 60) {
            disabled.value = true
            type.value = 'tertiary'
            msg.value = time + ' s'
            time--
          } else {
            disabled.value = false
            type.value = 'primary'
            clearInterval(timer)
            msg.value = '发送'
            loading.value = false
          }
        }, 1000)
      })
      .catch((err) => {
        loading.value = false
        if (err.code != 422) {
          window.$message.error(err.message)
        }
      })
    emit('updateImageCaptchaValue', '')
  } else {
    window.$message.error('请先完成图形验证码')
  }
}

defineExpose({
  getPhoneCaptcha
})
</script>

<style scoped></style>
