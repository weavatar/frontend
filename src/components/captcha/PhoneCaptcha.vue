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
    <GeetestCaptcha :config="config" @initialized="getCaptcha" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import type { Type } from 'naive-ui/lib/button/src/interface'
import { phone as phoneCaptcha } from '@/api/captcha'
import { isPhone } from '@/utils/is'
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
      doSendPhoneCaptcha(captcha.getValidate())
    })
}

const loading = ref(false)
const msg = ref('发送')
const type = ref<Type>('primary')
const disabled = ref(false)
const block = ref(true)

const sendPhoneCaptcha = () => {
  captcha.showCaptcha()
}

const doSendPhoneCaptcha = async (captcha: any) => {
  // 发送手机验证码
  if (!isPhone(props.to!)) {
    window.$message.error('手机格式错误')
    return
  }

  loading.value = true
  // 防止重复点击
  if (disabled.value) {
    return
  }
  disabled.value = true
  await phoneCaptcha(props.to!, props.use_for!, captcha)
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
  sendPhoneCaptcha
})
</script>

<style scoped></style>
