import { get } from '@/utils/request'

export const getList = async (data: any) => {
  const res = await get('/api/apusic/v1.0/userinfo', data)
  return {
    data: res.data,
    total: res.pageInfo.total
  }
}
