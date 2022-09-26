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
          'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsIm5iZiI6MTY2NDE3MzM3NiwiaXNzIjoiaHR0cHM6XC9cL2FpZG0uYXB1c2ljLmNvbSIsImV4cCI6MTY2NDE3NTE3NiwiaWF0IjoxNjY0MTczMzc2LCJ1c2VybmFtZSI6ImFkbWluIn0.wjSf4o0wh1RVCM9ZhWfYCGG2nH4zJ-waaiQc3VTpGYwS4K2M2DBS575WWC5lKuZi1cNDBDTNzle1a-4WDExkbbM7i35H9IElPIbl-jHtmuPx96DGt4iuz5MqekCcCLXQTrJKcfENM_0S6eYiJ7n1wcN2buGiQlPpHxNXzDSqg-Ei6yZoo0uK3acvwrYBXGNgp2czyCVMsTBu2rn6FXmJ6_7tzB2x9W8XgsQZK6hgU5e3vVIc9NbLiZCqPWPC1HKuvnjyh48wF7xL6NHbfcA_uWc1KBKTCAYjucEn4Rk-9QLkcBk7l0LziI6b3FOhek83U4wfrRcno7JqsRLDadGc5g'
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
