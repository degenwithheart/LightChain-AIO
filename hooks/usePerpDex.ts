'use client'

import { useState, useEffect, useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TOKEN_MINTS } from '../config/solana'

interface Position {
  id: string
  token: string
  side: 'Long' | 'Short'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  leverage: number
  liquidationPrice: number
  timestamp: Date
}

interface MarketData {
  tokenAddress: string
  symbol: string
  price: number
  change24h: number
  volume24h: number
  liquidity: number
  maxLeverage: number
  fundingRate: number
}

export function usePerpDex() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [positions, setPositions] = useState<Position[]>([])
  const [markets, setMarkets] = useState<Record<string, MarketData>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch user's positions
  const fetchPositions = useCallback(async () => {
    if (!publicKey) return

    setLoading(true)
    setError(null)

    try {
      // In a real implementation, you would:
      // 1. Query the DEX program for user's positions
      // 2. Fetch position data from Solana accounts
      // 3. Calculate P&L based on current prices

      // Mock data for demonstration
      const mockPositions: Position[] = [
        {
          id: 'pos_1',
          token: 'SOL',
          side: 'Long',
          size: 10,
          entryPrice: 140.50,
          currentPrice: 145.67,
          pnl: 51.70,
          pnlPercent: 3.68,
          leverage: 5,
          liquidationPrice: 112.40,
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
        },
        {
          id: 'pos_2',
          token: 'BTC',
          side: 'Short',
          size: 0.1,
          entryPrice: 45000.00,
          currentPrice: 43250.89,
          pnl: 174.91,
          pnlPercent: 3.89,
          leverage: 3,
          liquidationPrice: 58500.00,
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        },
      ]

      setPositions(mockPositions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch positions')
    } finally {
      setLoading(false)
    }
  }, [publicKey])

  // Fetch market data
  const fetchMarkets = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch market data from our API
      const response = await fetch('/api/populate/tokens?limit=20')
      const data = await response.json()

      if (data.success && data.data) {
        const marketData: Record<string, MarketData> = {}

        data.data.forEach((token: any) => {
          marketData[token.address] = {
            tokenAddress: token.address,
            symbol: token.symbol,
            price: token.price,
            change24h: token.priceChange24h || 0,
            volume24h: token.volume24h || 0,
            liquidity: token.liquidity || 0,
            maxLeverage: 10, // Default max leverage
            fundingRate: 0.0001, // Default funding rate
          }
        })

        setMarkets(marketData)
      } else {
        throw new Error('Failed to fetch market data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch markets')
      console.error('Error fetching markets:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Open a position
  const openPosition = useCallback(async (
    tokenAddress: string,
    side: 'Long' | 'Short',
    size: number,
    leverage: number
  ) => {
    if (!publicKey || !sendTransaction) {
      throw new Error('Wallet not connected')
    }

    setLoading(true)
    setError(null)

    try {
      // In a real implementation, you would:
      // 1. Create position instruction for DEX program
      // 2. Calculate collateral requirements
      // 3. Build and send transaction

      // Mock transaction for demonstration
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // Self-transfer for demo
          lamports: 1000, // Minimal fee
        })
      )

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      // Refresh positions after successful transaction
      await fetchPositions()

      return signature
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open position')
      throw err
    } finally {
      setLoading(false)
    }
  }, [publicKey, sendTransaction, connection, fetchPositions])

  // Close a position
  const closePosition = useCallback(async (positionId: string) => {
    if (!publicKey || !sendTransaction) {
      throw new Error('Wallet not connected')
    }

    setLoading(true)
    setError(null)

    try {
      // In a real implementation, you would:
      // 1. Create close position instruction
      // 2. Build and send transaction

      // Mock transaction for demonstration
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 500,
        })
      )

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      // Refresh positions after successful transaction
      await fetchPositions()

      return signature
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to close position')
      throw err
    } finally {
      setLoading(false)
    }
  }, [publicKey, sendTransaction, connection, fetchPositions])

  // Initialize data on mount
  useEffect(() => {
    fetchMarkets()
    if (publicKey) {
      fetchPositions()
    }
  }, [fetchMarkets, fetchPositions, publicKey])

  return {
    positions,
    markets,
    loading,
    error,
    fetchPositions,
    fetchMarkets,
    openPosition,
    closePosition,
  }
}