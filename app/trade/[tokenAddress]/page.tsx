'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '../../../components/Navbar'
import { TradingViewWidget } from '../../../components/TradingViewWidget'
import { PositionsTable } from '../../../components/PositionsTable'
import { Button } from '../../../components/ui/button'
import { Loading } from '../../../components/Loading'
import { usePerpDex } from '../../../hooks/usePerpDex'
import { APP_CONFIG } from '../../../lib/constants'
import { useUSDCBalance } from '../../../hooks/useUSDCBalance'
import { useUSDCApprove } from '../../../hooks/useUSDCApprove'
import { useWallet } from '@solana/wallet-adapter-react'
import { TOKEN_MINTS } from '../../../config/solana'
import { Footer } from '../../../components/Footer'

interface TradeFormData {
  side: 'Long' | 'Short'
  size: number
  leverage: number
}

export default function TradePage() {
  const params = useParams()
  const tokenAddress = params.tokenAddress as string
  const { connected } = useWallet()

  const { positions, markets, loading: dexLoading, openPosition, closePosition } = usePerpDex()
  const { balance, formattedBalance, isLoading: balanceLoading } = useUSDCBalance()
  const { isApproved, checkAllowance, approve, isLoading: approveLoading } = useUSDCApprove()

  const [formData, setFormData] = useState<TradeFormData>({
    side: 'Long',
    size: 1,
    leverage: 5,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const market = markets[tokenAddress]
  const tokenPositions = positions.filter(pos => pos.token === market?.symbol)

  // Check approval when component mounts
  useEffect(() => {
    if (connected && market) {
      checkAllowance(formData.size * market.price / formData.leverage)
    }
  }, [connected, market, formData, checkAllowance])

  const handleInputChange = (field: keyof TradeFormData, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOpenPosition = async () => {
    if (!connected) {
      alert('Please connect your wallet first')
      return
    }

    if (!market) {
      alert('Market data not available')
      return
    }

    const collateralNeeded = (formData.size * market.price) / formData.leverage

    if (balance < collateralNeeded) {
      alert('Insufficient USDC balance')
      return
    }

    setIsSubmitting(true)
    try {
      // Check and approve if needed
      const hasAllowance = await checkAllowance(collateralNeeded)
      if (!hasAllowance) {
        await approve(collateralNeeded)
      }

      // Open position
      await openPosition(tokenAddress, formData.side, formData.size, formData.leverage)

      alert('Position opened successfully!')
    } catch (error) {
      console.error('Error opening position:', error)
      alert('Failed to open position. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClosePosition = async (positionId: string) => {
    if (!connected) return

    try {
      await closePosition(positionId)
      alert('Position closed successfully!')
    } catch (error) {
      console.error('Error closing position:', error)
      alert('Failed to close position. Please try again.')
    }
  }

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading market data..." />
      </div>
    )
  }

  const collateralNeeded = (formData.size * market.price) / formData.leverage
  const liquidationPrice = formData.side === 'Long'
    ? market.price * (1 - 1/formData.leverage)
    : market.price * (1 + 1/formData.leverage)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div 
        className="pt-20 px-4 pb-8"
        style={{ 
          minHeight: `clamp(${APP_CONFIG.ui.minContentHeight.mobile}, 50vh, ${APP_CONFIG.ui.minContentHeight.desktop})`
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              TRADE {market.symbol}
            </h1>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-foreground-secondary">
                Price: <span className="font-mono font-bold text-secondary">${market.price.toFixed(2)}</span>
              </span>
              <span className={`font-mono ${market.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
              </span>
              <span className="text-foreground-muted">
                Max Leverage: {market.maxLeverage}x
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2">
              <TradingViewWidget
                symbol={`${market.symbol}USDC`}
                height={500}
              />
            </div>

            {/* Trading Panel */}
            <div className="space-y-6">
              {/* Balance */}
              <div className="glass-card">
                <h3 className="font-bold text-primary mb-4">BALANCE</h3>
                {balanceLoading ? (
                  <Loading size="sm" />
                ) : (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">
                      ${formattedBalance}
                    </div>
                    <div className="text-sm text-foreground-muted">USDC</div>
                  </div>
                )}
              </div>

              {/* Trade Form */}
              <div className="glass-card">
                <h3 className="font-bold text-primary mb-4">OPEN POSITION</h3>

                <div className="space-y-4">
                  {/* Side Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Side</label>
                    <div className="flex space-x-2">
                      <Button
                        variant={formData.side === 'Long' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleInputChange('side', 'Long')}
                        className="flex-1"
                      >
                        LONG
                      </Button>
                      <Button
                        variant={formData.side === 'Short' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleInputChange('side', 'Short')}
                        className="flex-1"
                      >
                        SHORT
                      </Button>
                    </div>
                  </div>

                  {/* Size Input */}
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Size ({market.symbol})
                    </label>
                    <input
                      type="number"
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', parseFloat(e.target.value) || 0)}
                      className="glass-input w-full"
                      min="0.1"
                      step="0.1"
                    />
                  </div>

                  {/* Leverage Input */}
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Leverage ({formData.leverage}x)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max={market.maxLeverage}
                      value={formData.leverage}
                      onChange={(e) => handleInputChange('leverage', parseInt(e.target.value))}
                      className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-foreground/60 mt-1">
                      <span>1x</span>
                      <span>{market.maxLeverage}x</span>
                    </div>
                  </div>

                  {/* Position Summary */}
                  <div className="bg-card-bg/50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Collateral Needed:</span>
                      <span className="font-mono">${collateralNeeded.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Liquidation Price:</span>
                      <span className="font-mono">${liquidationPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleOpenPosition}
                    disabled={!connected || isSubmitting || approveLoading}
                    className="w-full"
                  >
                    {isSubmitting ? 'OPENING...' : `OPEN ${formData.side.toUpperCase()}`}
                  </Button>

                  {!isApproved && connected && (
                    <p className="text-xs text-foreground/60 text-center">
                      Approval required for first trade
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Positions Table */}
          {tokenPositions.length > 0 && (
            <div className="mt-8">
              <PositionsTable
                positions={tokenPositions}
                onClosePosition={handleClosePosition}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}