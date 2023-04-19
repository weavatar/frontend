import http from '@/utils/request'

// 获取用户信息
export async function fetchUserInfo() {
  return http({
    url: '/user/info',
    method: 'GET'
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
