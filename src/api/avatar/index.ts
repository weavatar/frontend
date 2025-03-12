import http from '@/utils/request'

// 获取头像列表
export async function fetchAvatarList(page: number, limit: number) {
  return http({
    url: '/avatars',
    method: 'GET',
    data: {
      page,
      limit
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

// 添加头像
export async function addAvatar(data: FormData) {
  return http({
    url: '/avatars',
    method: 'POST',
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
      window.$message.error(err.msg)
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
      window.$message.error(err.msg)
      return Promise.reject(err)
    })
}
