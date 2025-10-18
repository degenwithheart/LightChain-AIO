import { NextRequest, NextResponse } from 'next/server'
import { PublicKey } from '@solana/web3.js'

interface MarketData {
  tokenAddress: string
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap?: number
  liquidity: number
  isActive: boolean
  maxLeverage: number
  fundingRate: number
  openInterest: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: { tokenAddress: string } }
) {
  try {
    const { tokenAddress } = params

    // Validate token address
    if (!tokenAddress || typeof tokenAddress !== 'string') {
      return NextResponse.json(
        { error: 'Invalid token address' },
        { status: 400 }
      )
    }

    // Validate Solana public key format
    try {
      new PublicKey(tokenAddress)
    } catch {
      return NextResponse.json(
        { error: 'Invalid Solana address format' },
        { status: 400 }
      )
    }

    // In a real implementation, you would:
    // 1. Query the DEX program for market configuration
    // 2. Fetch real-time market data
    // 3. Get liquidity pool information
    // 4. Calculate funding rates and open interest

    // Mock market data for demonstration
    const mockMarkets: Record<string, MarketData> = {
      'So11111111111111111111111111111111111111112': {
        tokenAddress: 'So11111111111111111111111111111111111111112',
        symbol: 'SOL',
        name: 'Solana',
        price: 145.67,
        change24h: 2.34,
        volume24h: 2847500000,
        marketCap: 65000000000,
        liquidity: 500000000,
        isActive: true,
        maxLeverage: 10,
        fundingRate: 0.0001,
        openInterest: 150000000,
      },
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
        tokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        symbol: 'USDC',
        name: 'USD Coin',
        price: 1.00,
        change24h: 0.01,
        volume24h: 12000000000,
        marketCap: 25000000000,
        liquidity: 2000000000,
        isActive: true,
        maxLeverage: 5,
        fundingRate: 0.00005,
        openInterest: 800000000,
      },
      '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E': {
        tokenAddress: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 43250.89,
        change24h: -1.23,
        volume24h: 18500000000,
        marketCap: 850000000000,
        liquidity: 800000000,
        isActive: true,
        maxLeverage: 5,
        fundingRate: -0.0002,
        openInterest: 1200000000,
      },
    }

    const marketData = mockMarkets[tokenAddress]

    if (!marketData) {
      return NextResponse.json(
        { error: 'Market data not available for this token' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...marketData,
      timestamp: new Date().toISOString(),
      source: 'mock_data', // In production: 'dex_program', 'jupiter', etc.
    })

  } catch (error) {
    console.error('Error fetching market data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
}