import { Layout } from 'antd'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import AppContent from './AppContent'
import { useCrypto } from '../../context/crypto-content'
import { Spin } from 'antd'

const AppLayout = () => {
  const { loading } = useCrypto()

  if (loading) return <Spin fullscreen />

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default AppLayout
