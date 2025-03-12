import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { useUserStore } from '@/stores'
import { isString } from '@/utils/is'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

interface Response<T = any> {
  data: T
  msg: T
}

service.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore()
    config.headers['Authorization'] = `Bearer ${userStore.auth.token}`
    return config
  },
  async (error) => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  async <T>(res: AxiosResponse<Response<T>>) => {
    const userStore = useUserStore()

    if (res.status === 200) return res

    return Promise.reject(res.data)
  },
  async (error) => {
    const userStore = useUserStore()
    if (error.status === 401) {
      userStore.clearToken()
    }
    return Promise.reject(error.response.data)
  }
)

export default service
