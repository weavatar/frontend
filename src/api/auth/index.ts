import http from '@/utils/request'

// 注册
export async function register(
  login: string,
  type: string,
  nickname: string,
  password: string,
  password_confirm: string,
  agreement: boolean,
  verify_code: string,
  captcha_id: string,
  captcha: string
) {
  return http({
    url: '/auth/register',
    method: 'POST',
    data: {
      login,
      type,
      nickname,
      password,
      password_confirm,
      agreement,
      verify_code,
      captcha_id,
      captcha
    }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      if (err.code == 422) {
        for (const key in err.message) {
          for (const subKey in err.message[key]) {
            window.$message.error(err.message[key][subKey])
          }
        }
      }
      return Promise.reject(err)
    })
}

// 登录
export async function login(login: string, password: string, captcha_id: string, captcha: string) {
  return http({
    url: '/auth/login',
    method: 'POST',
    data: { login, password, captcha_id, captcha }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      if (err.code == 422) {
        for (const key in err.message) {
          for (const subKey in err.message[key]) {
            window.$message.error(err.message[key][subKey])
          }
        }
      }
      return Promise.reject(err)
    })
}

// 手机号登录
export async function phoneLogin(
  phone: string,
  verify_code: string,
  captcha_id: string,
  captcha: string
) {
  return http({
    url: '/auth/phoneLogin',
    method: 'POST',
    data: { phone, verify_code, captcha_id, captcha }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      if (err.code == 422) {
        for (const key in err.message) {
          for (const subKey in err.message[key]) {
            window.$message.error(err.message[key][subKey])
          }
        }
      }
      return Promise.reject(err)
    })
}
