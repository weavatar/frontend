import http, { echoMessage } from '@/utils/request'

// 图片验证码
export async function image() {
  return http({
    url: '/captcha/image',
    method: 'GET'
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      echoMessage(err)
      return Promise.reject(err)
    })
}

// 手机验证码
export async function phone(phone: string, use_for: string, captcha: string): Promise<any> {
  return http({
    url: '/verify_code/sms',
    method: 'POST',
    data: { phone, use_for, captcha }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      echoMessage(err)
      return Promise.reject(err)
    })
}

// 邮箱验证码
export async function email(email: string, use_for: string, captcha: string): Promise<any> {
  return http({
    url: '/verify_code/email',
    method: 'POST',
    data: { email, use_for, captcha }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      echoMessage(err)
      return Promise.reject(err)
    })
}
