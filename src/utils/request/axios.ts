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
  (config) => {
    const userStore = useUserStore()
    config.headers['Authorization'] = `Bearer ${userStore.auth.token} `
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  <T>(res: AxiosResponse<Response<T>>) => {
    if (res.data.code === 0) return res

    return Promise.reject(res.data)
  },
  (error) => {
    return Promise.reject(error.response.data)
  }
)

export default service
