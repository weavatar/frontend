import http from '@/utils/request'

// 获取头像列表
export async function fetchAvatarList() {
  return http({
    url: '/avatars',
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

// 获取头像
export async function fetchAvatar(hash: string) {
  return http({
    url: `/avatars/${hash}`,
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

// 上传头像
export async function uploadAvatar(data: FormData) {
  return http({
    url: '/avatars',
    method: 'POST',
    data
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

// 删除头像
export async function deleteAvatar(hash: string) {
  return http({
    url: `/avatars/${hash}`,
    method: 'DELETE'
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

// 更新头像
export async function updateAvatar(hash: string, data: FormData) {
  return http({
    url: `/avatars/${hash}`,
    method: 'PUT',
    data
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
