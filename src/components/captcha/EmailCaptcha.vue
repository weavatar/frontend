<template>
  <div>
    <NButton :block="block" :type="type" :loading="loading" :disabled="disabled">
      {{ msg }}
    </NButton>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue'
import { NButton } from 'naive-ui'
import { email as emailCaptcha } from '@/api/captcha'
import type { Type } from 'naive-ui/lib/button/src/interface'
import { useReCaptcha } from 'vue-recaptcha-v3'

const reCaptchaInstance = useReCaptcha()

// recaptcha
async function getRecaptcha(action: string = 'email') {
  await reCaptchaInstance?.recaptchaLoaded()
  return reCaptchaInstance?.executeRecaptcha(action) as Promise<string>
}

const props = defineProps({
  email: String,
  use_for: String
})

const { email, use_for } = toRefs(props)
const loading = ref(false)
const msg = ref('发送')
const type = ref('primary' as Type)
const disabled = ref(false)
const block = ref(true)

const sendEmailCaptcha = async () => {
  // 发送邮件验证码
  if (email?.value && use_for?.value) {
    loading.value = true
    // 防止重复点击
    if (disabled.value) {
      return
    }
    const captcha = await getRecaptcha('email')
    emailCaptcha(email.value, use_for.value, captcha)
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
  } else {
    window.$message.error('参数错误')
  }
}

defineExpose({
  sendEmailCaptcha
})
</script>

<style scoped></style>
