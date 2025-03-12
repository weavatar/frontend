import http from '@/utils/request'

// 获取CDN用量
export async function fetchCdnUsage() {
  return http({
    url: '/system/count',
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

// 检查绑定
export async function checkBind(raw: string) {
  return http({
    url: `/avatars/check`,
    data: { raw },
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
