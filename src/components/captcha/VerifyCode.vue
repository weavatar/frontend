<template>
  <div>
    <NButton
      :block="block"
      :type="type"
      :loading="loading"
      :disabled="disabled"
      @click="sendVerifyCode"
    >
      {{ msg }}
    </NButton>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { NButton } from 'naive-ui'
import { email as emailCaptcha, phone as phoneCaptcha } from '@/api/captcha'
import type { Type } from 'naive-ui/lib/button/src/interface'
import { isEmail, isPhone } from '@/utils/is'
import { useReCaptcha } from 'vue-recaptcha-v3'

const reCaptchaInstance = useReCaptcha()

// recaptcha
async function getRecaptcha(action: string = 'email') {
  await reCaptchaInstance?.recaptchaLoaded()
  return reCaptchaInstance?.executeRecaptcha(action) as Promise<string>
}

const props = defineProps({
  to: String,
  use_for: String
})

const { to, use_for } = toRefs(props)
const loading = ref(false)
const msg = ref('发送')
const type = ref('primary' as Type)
const disabled = ref(false)
const block = ref(true)

const sendVerifyCode = async () => {
  if (to?.value && use_for?.value) {
    loading.value = true
    // 防止重复点击
    if (disabled.value) {
      return
    }

    if (isPhone(to.value)) {
      const captcha = await getRecaptcha('sms')
      await phoneCaptcha(to.value, use_for.value, captcha)
        .then((res) => {
          if (res.code == 0) {
            window.$message.success('发送成功')
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
          console.log(err)
        })
    } else if (isEmail(to.value)) {
      const captcha = await getRecaptcha('email')
      await emailCaptcha(to.value, use_for.value, captcha)
        .then((res) => {
          if (res.code == 0) {
            window.$message.success('发送成功')
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
          console.log(err)
        })
    } else {
      window.$message.error('请输入正确的手机号或邮箱')
    }
  } else {
    window.$message.error('参数错误')
  }
}

defineExpose({
  sendVerifyCode
})
</script>

<style scoped></style>
