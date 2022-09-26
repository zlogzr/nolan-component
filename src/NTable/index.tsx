import { Table } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

type TableProps = React.ComponentProps<typeof Table>

interface backResult {
  data: any
  total: number
}

interface NTableProps extends TableProps {
  listApi: (params?: any) => Promise<backResult>
  othParams?: any
  pageName?: string
  sizeName?: string
  initPage?: [number, number]
  retry?: boolean
}

const NTable = (props: NTableProps, ref: any) => {
  const {
    listApi,
    othParams,
    pageName = 'page',
    sizeName = 'size',
    initPage = [1, 10],
    ...otherProps
  } = props
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState({ [pageName]: initPage[0], [sizeName]: initPage[1] })

  // 暴露给父组件属性和方法
  useImperativeHandle(ref, () => ({
    setPageParams: setParams,
    getData
  }))

  // 请求数据
  const getData = async () => {
    setLoading(true)
    try {
      const res = await listApi({ ...params, ...othParams })
      setData(res.data)
      setTotal(res.total)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  // 初始或传入的参数改变 重新请求数据
  useEffect(() => {
    getData()
  }, [othParams])

  const handleChange = async (current: any, size: any) => {
    await setParams({ [pageName]: current, [sizeName]: size })
    getData()
  }
  return (
    <Table
      {...otherProps}
      dataSource={data}
      loading={loading}
      pagination={{
        onChange: handleChange,
        current: params[pageName],
        pageSize: params[sizeName],
        total,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`
      }}
    />
  )
}

export default forwardRef(NTable)
