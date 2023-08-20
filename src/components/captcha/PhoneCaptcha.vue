<template>
  <div>
    <NButton
      :block="block"
      :type="type"
      :loading="loading"
      :disabled="disabled"
      @click="sendPhoneCaptcha"
    >
      {{ msg }}
    </NButton>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { NButton } from 'naive-ui'
import { phone as phoneCaptcha } from '@/api/captcha'
import type { Type } from 'naive-ui/lib/button/src/interface'
import { useReCaptcha } from 'vue-recaptcha-v3'

const reCaptchaInstance = useReCaptcha()

// recaptcha
async function getRecaptcha(action: string = 'email') {
  await reCaptchaInstance?.recaptchaLoaded()
  return reCaptchaInstance?.executeRecaptcha(action) as Promise<string>
}

const props = defineProps({
  phone: String,
  use_for: String
})

const { phone, use_for } = toRefs(props)
const loading = ref(false)
const msg = ref('发送')
const type = ref('primary' as Type)
const disabled = ref(false)
const block = ref(true)

const sendPhoneCaptcha = async () => {
  // 发送手机验证码
  if (phone?.value && use_for?.value) {
    loading.value = true
    // 防止重复点击
    if (disabled.value) {
      return
    }
    const captcha = await getRecaptcha('sms')
    await phoneCaptcha(phone.value, use_for.value, captcha)
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
    loading.value = false
    window.$message.error('参数错误')
  }
}

defineExpose({
  sendPhoneCaptcha
})
</script>

<style scoped></style>
