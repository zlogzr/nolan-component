import { Button, Select } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useRef, useState } from 'react'

import { NLayout, NTable } from './components'
import { getList } from './components/NTable/api'

const { Option } = Select

export interface PProps {
  status?: string
  expireStatus?: string
}

function App() {
  const columns: ColumnsType<any> = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: '13%'
    },
    {
      title: '姓名',
      dataIndex: 'displayName',
      width: '12%'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: '12%'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: '14%'
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      width: '16%'
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      width: '11%'
    },
    {
      title: '锁定状态',
      dataIndex: 'isLocked',
      width: '11%'
    }
  ]
  // 定义 table 的 ref
  const ref = useRef()
  // 定义 table 参数
  const [params, setParams] = useState<PProps>()

  // 启用状态改变
  const statusChange = (value: string) => {
    setParams({ ...params, status: value })
  }

  // 启用状态改变
  const expireStatusChange = (value: string) => {
    setParams({ ...params, expireStatus: value })
  }

  // 刷新
  const refresh = () => {
    const { getData }: any = ref.current
    getData()
  }

  // 重置
  const reset = () => {
    setParams({})
    const { getData, setPageParams }: any = ref.current
    setPageParams({ pageNum: 1, pageSize: 10 })
    getData()
  }
  return (
    <NLayout
      header={<div>header</div>}
      sider={<div>sider</div>}
      content={
        <div style={{ padding: '16px' }}>
          <Select
            style={{ width: 120 }}
            value={params?.status}
            allowClear
            placeholder="启用状态"
            onChange={statusChange}
          >
            <Option value="1">启用</Option>
            <Option value="2">停用</Option>
          </Select>
          <Select
            style={{ width: 120 }}
            value={params?.expireStatus}
            allowClear
            placeholder="有效期"
            onChange={expireStatusChange}
          >
            <Option value="0">正常</Option>
            <Option value="1">过期</Option>
          </Select>
          <Button type="primary" onClick={refresh}>
            查询
          </Button>
          <Button type="primary" onClick={reset}>
            重置
          </Button>
          <NTable
            ref={ref}
            columns={columns}
            listApi={getList}
            pageName="pageNum"
            sizeName="pageSize"
            rowKey="id"
            othParams={params}
          />
          <NTable
            ref={ref}
            columns={columns}
            listApi={getList}
            pageName="pageNum"
            sizeName="pageSize"
            rowKey="id"
            othParams={params}
          />
        </div>
      }
    />
  )
}

export default App
