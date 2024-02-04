import { Layout, Typography } from 'antd'
import { useCrypto } from '../../context/crypto-content'
import PortfolioChart from '../PortfolioChart'
import AssetTable from '../AssetTable'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
}

const AppContent = () => {
  const { assets, crypto } = useCrypto()

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio:{' '}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, y) => (acc += y), 0)
          .toFixed(2)}{' '}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetTable />
    </Layout.Content>
  )
}

export default AppContent
