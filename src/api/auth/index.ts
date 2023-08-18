import http from '@/utils/request'

// OAuth登录
export async function login() {
  return http({
    url: '/user/oauthLogin',
    method: 'POST'
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      window.$message.error(err.message)
      return Promise.reject(err)
    })
}

// OAuth回调
export async function oauthCallback(code: string, state: string) {
  return http({
    url: '/user/oauthCallback',
    method: 'POST',
    data: { code, state }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      window.$message.error(err.message)
      return Promise.reject(err)
    })
}
