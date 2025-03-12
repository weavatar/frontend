import http from '@/utils/request'

// OAuth登录
export async function login() {
  return http({
    url: '/user/login',
    method: 'GET'
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      window.$message.error(err.msg)
      return Promise.reject(err)
    })
}

// OAuth回调
export async function oauthCallback(code: string, state: string) {
  return http({
    url: '/user/callback',
    method: 'POST',
    data: { code, state }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      window.$message.error(err.msg)
      return Promise.reject(err)
    })
}
