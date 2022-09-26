/*
 * @Author: 张洋
 * @Description: 请求文件  基于axios
 */
import { BackResult } from '@/types'
import axios from 'axios'
import qs from 'qs'

// 创建axios实例
const $axios = axios.create({
  baseURL: '/',
  timeout: 30000, // 30秒
  responseType: 'json'
})

// 响应拦截
$axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 网络错误
    return Promise.reject(error)
  }
)

export const get = (
  url: string,
  params?: { [key: string]: any },
  ...args: any[]
): Promise<BackResult> =>
  new Promise((resolve, reject) => {
    $axios({
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsIm5iZiI6MTY2MzkyODE1MSwiaXNzIjoiaHR0cHM6XC9cL2FpZG0uYXB1c2ljLmNvbSIsImV4cCI6MTY2MzkyOTk1MSwiaWF0IjoxNjYzOTI4MTUxLCJ1c2VybmFtZSI6ImFkbWluIn0.scjypL2mZZHMjOG3pZE0nUJzmvpN3qJ2C6wIyZUt7_WtMMCKGVoQ6LVscQ-wOMLxHHUgI1ecodTjzfUElkjiZuI7OuCz1p03ltcF_XZi-UwPyF4RveH3mqHn5z90gklNE0R27Z5zuz2ZxIaQz5xxg-4HEqPpAURjDhG1EWtNRXO3geSLPwoCu3yRwqDM1AnOIDwqgjN9c4c-wf4zsOG559jDu8yUHV1MOtTVGCwne6NR7xKhfPu0u6GO9qPaAkGJ5vCSLVMMXOmdniwWU3kQfU5dS9UWYrU2owooFlqGUfya2upSjS-jo38ywzFg-7r2Ktxhg-yaMHqV7ByFG8cqBA'
      },
      url,
      params,
      paramsSerializer(params) {
        return qs.stringify(params)
      },
      ...args
    })
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })

export const post = (
  url: string,
  params?: { [key: string]: any },
  ...args: any[]
): Promise<BackResult> =>
  new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url,
      data: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      ...args
    })
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })

export const { put, patch, delete: del } = $axios

export default $axios
