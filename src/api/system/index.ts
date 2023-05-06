import http, { echoMessage } from '@/utils/request'

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
      echoMessage(err)
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
      echoMessage(err)
      return Promise.reject(err)
    })
}
