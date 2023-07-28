import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { useUserStore } from '@/stores'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

interface Response<T = any> {
  data: T
  message: T
  code: number
}

service.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore()
    config.headers['Authorization'] = `Bearer ${userStore.auth.token} `
    return config
  },
  async (error) => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  async <T>(res: AxiosResponse<Response<T>>) => {
    if (res.data.code === 0) return res
    if (res.data.code === 401) {
      // 尝试刷新token
      const userStore = useUserStore()
      try {
        const refreshResponse = await axios.post(
          '/user/refresh',
          {},
          {
            headers: {
              Authorization: `Bearer ${userStore.auth.token}`
            }
          }
        )
        const newToken = refreshResponse.data.token
        userStore.updateToken(newToken)
        const config = res.config
        config.headers['Authorization'] = `Bearer ${newToken}`
        return await service(config)
      } catch (err) {
        userStore.clearToken()
      }
    }

    return Promise.reject(res.data)
  },
  async (error) => {
    return Promise.reject(error.response.data)
  }
)

export default service
