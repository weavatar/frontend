import http from '@/utils/request'

// 获取CDN用量
export async function fetchCdnUsage() {
  return http({
    url: '/system/cdnUsage',
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

// 检查绑定
export async function checkBind(raw: string) {
  return http({
    url: `/system/checkBind`,
    data: { raw },
    method: 'GET'
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}