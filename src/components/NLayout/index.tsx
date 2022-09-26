import { Layout } from 'antd'
import { ReactNode } from 'react'

import './style.less'

const { Header, Content, Sider } = Layout

export interface NLayoutProps {
  header?: ReactNode
  sider?: ReactNode
  content?: ReactNode
}

const NLayout = (props: NLayoutProps) => {
  const { header, sider, content } = props
  return (
    <Layout className="n-layout">
      <Header className="n-header">{header}</Header>
      <Layout>
        <Sider className="n-sider" theme="light" breakpoint="lg" collapsible>
          {sider}
        </Sider>
        <Content className="n-content">{content}</Content>
      </Layout>
    </Layout>
  )
}

export default NLayout
