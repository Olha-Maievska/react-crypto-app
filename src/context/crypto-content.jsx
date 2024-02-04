import { createContext, useState, useEffect, useContext } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
})

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  function mapAsset(assets, result) {
    return assets.map((item) => {
      const coin = result.find((c) => c.id === item.id)
      return {
        grow: item.price < coin.price,
        growPercent: percentDifference(item.price, coin.price),
        totalAmount: item.amount * coin.price,
        totalProfit: item.amount * coin.price - item.amount * item.price,
        name: coin.name,
        ...item,
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assets = await fetchAssets()

      setCrypto(result)
      setAssets(mapAsset(assets, result))
      setLoading(false)
    }

    preload()
  }, [])

  function addAsset(newAsset) {
    setAssets((prev) => mapAsset([...prev, newAsset], crypto))
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}
