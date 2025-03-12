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
      window.$message.error(err.msg)
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
      window.$message.error(err.msg)
      return Promise.reject(err)
    })
}

// 获取QQ头像
export async function fetchQQAvatar(qq: string) {
  return http({
    url: '/avatars/qq',
    method: 'GET',
    data: {
      qq
    }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      window.$message.error(err.msg)
      return Promise.reject(err)
    })
}
