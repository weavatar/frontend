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
      window.$message.error(err.message)
      return Promise.reject(err)
    })
}

// 更新用户资料
export async function updateUserInfo(data: any) {
  return http({
    url: '/user/info',
    method: 'PUT',
    data
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      window.$message.error(err.message)
      return Promise.reject(err)
    })
}
