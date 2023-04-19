import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import request from './axios'

export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  signal?: GenericAbortSignal
  beforeRequest?: () => void
  afterRequest?: () => void
}

function http({
  url,
  data,
  method,
  headers,
  onUploadProgress,
  onDownloadProgress,
  signal
}: HttpOption) {
  method = method || 'GET'

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

  switch (method) {
    case 'GET':
      return request.get(url, {
        params,
        headers,
        signal,
        onUploadProgress,
        onDownloadProgress
      })
    case 'POST':
      return request.post(url, params, {
        headers,
        signal,
        onUploadProgress,
        onDownloadProgress
      })
    case 'PUT':
      return request.put(url, params, {
        headers,
        signal,
        onUploadProgress,
        onDownloadProgress
      })
    case 'DELETE':
      return request.delete(url, {
        params,
        headers,
        signal,
        onUploadProgress,
        onDownloadProgress
      })
    case 'PATCH':
      return request.patch(url, params, {
        headers,
        signal,
        onUploadProgress,
        onDownloadProgress
      })
    default:
      return request.get(url, {
        params,
        headers,
        signal,
        onUploadProgress,
        onDownloadProgress
      })
  }
}

export default http
