<template>
  <div>
    <NButton
      :block="block"
      :type="type"
      :loading="loading"
      :disabled="disabled"
      @click="sendEmailCaptcha"
    >
      {{ msg }}
    </NButton>
    <GeetestCaptcha :config="config" @initialized="getCaptcha" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import type { Type } from 'naive-ui/lib/button/src/interface'
import { email as emailCaptcha } from '@/api/captcha'
import { isEmail } from '@/utils/is'
import { type CaptchaConfig, GeetestCaptcha } from 'vue3-geetest'

const props = defineProps({
  to: String,
  use_for: String
})

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
      doSendEmailCaptcha(captcha.getValidate())
    })
}

const loading = ref(false)
const msg = ref('发送')
const type = ref('primary' as Type)
const disabled = ref(false)
const block = ref(true)

const sendEmailCaptcha = () => {
  captcha.showCaptcha()
}

const doSendEmailCaptcha = async (captcha: any) => {
  // 发送邮件验证码
  if (!isEmail(props.to!)) {
    window.$message.error('邮箱格式错误')
    return
  }

  loading.value = true
  // 防止重复点击
  if (disabled.value) {
    return
  }
  disabled.value = true
  await emailCaptcha(props.to!, props.use_for!, captcha)
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
}

defineExpose({
  sendEmailCaptcha
})
</script>

<style scoped></style>
