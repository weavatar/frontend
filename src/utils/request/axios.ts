import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { useUserStore } from '@/stores'
import { isString } from '@/utils/is'

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
    const userStore = useUserStore()
    if (isString(res.headers.Authorization)) {
      userStore.updateToken(res.headers.Authorization)
    }

    if (res.data.code === 0) return res
    if (res.data.code === 401) {
      userStore.clearToken()
    }

    return Promise.reject(res.data)
  },
  async (error) => {
    return Promise.reject(error.response.data)
  }
)

export default service
