'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/ui/button'
import { Loading } from '../../components/Loading'
import { Input } from '../../components/ui/input'

interface Token {
  address: string
  symbol: string
  name: string
  price: number
  priceChange24h: number
  volume24h: number
  liquidity: number
  marketCap?: number
  logoURI?: string
  pairAddress?: string
  dexId?: string
}

export default function TokensPage() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'volume' | 'price' | 'change'>('volume')

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      const response = await fetch('/api/populate/tokens?limit=50')
      const data = await response.json()

      if (data.success) {
        setTokens(data.data)
      }
    } catch (error) {
      console.error('Error fetching tokens:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTokens = tokens
    .filter(token =>
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return (b.volume24h || 0) - (a.volume24h || 0)
        case 'price':
          return b.price - a.price
        case 'change':
          return (b.priceChange24h || 0) - (a.priceChange24h || 0)
        default:
          return 0
      }
    })

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`
    if (price < 1) return `$${price.toFixed(4)}`
    return `$${price.toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent mb-4">
              Available Tokens
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Discover and trade popular tokens on Solana with real-time data and advanced analytics.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search tokens by symbol or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'volume' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setSortBy('volume')}
                >
                  Volume
                </Button>
                <Button
                  variant={sortBy === 'price' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setSortBy('price')}
                >
                  Price
                </Button>
                <Button
                  variant={sortBy === 'change' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setSortBy('change')}
                >
                  24h Change
                </Button>
              </div>
            </div>
          </div>

          {/* Tokens Table */}
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground-secondary">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground-secondary">Token</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-foreground-secondary">Price</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-foreground-secondary">24h Change</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-foreground-secondary">24h Volume</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-foreground-secondary">Liquidity</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground-secondary">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/20">
                  {filteredTokens.map((token, index) => (
                    <tr key={token.address} className="hover:bg-primary/5 transition-colors">
                      <td className="px-4 py-3 text-sm text-foreground-secondary">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {token.logoURI ? (
                            <img
                              src={token.logoURI}
                              alt={token.symbol}
                              className="w-8 h-8 rounded-full"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-primary font-bold text-xs">
                                {token.symbol.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-primary">{token.symbol}</div>
                            <div className="text-xs text-foreground-secondary truncate max-w-[120px]">
                              {token.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold">
                        {formatPrice(token.price)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-semibold ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h?.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatNumber(token.volume24h)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatNumber(token.liquidity)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link href={`/trade/${token.address}`}>
                          <Button size="sm" className="glass-button">
                            Trade
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredTokens.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground-secondary mb-2">
                No tokens found
              </h3>
              <p className="text-foreground-muted">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}