import { NextRequest, NextResponse } from 'next/server'

interface DexScreenerPair {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  quoteToken: {
    address: string
    name: string
    symbol: string
  }
  priceNative: string
  priceUsd: string
  txns: {
    h24: { buys: number; sells: number }
    h6: { buys: number; sells: number }
    h1: { buys: number; sells: number }
    m5: { buys: number; sells: number }
  }
  volume: {
    h24: number
    h6: number
    h1: number
    m5: number
  }
  priceChange: {
    h24: number
    h6: number
    h1: number
    m5: number
  }
  liquidity: {
    usd: number
    base: number
    quote: number
  }
  fdv: number
  marketCap: number
  pairCreatedAt: number
  info?: {
    imageUrl?: string
    websites?: Array<{ label: string; url: string }>
    socials?: Array<{ type: string; url: string }>
  }
}

interface TokenData {
  address: string
  symbol: string
  name: string
  price: number
  priceChange24h: number
  volume24h: number
  liquidity: number
  marketCap?: number
  logoUrl?: string
  websites?: Array<{ label: string; url: string }>
  socials?: Array<{ type: string; url: string }>
  pairAddress: string
  dexId: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const minLiquidity = parseFloat(searchParams.get('minLiquidity') || '10000')

    // Fetch popular Solana pairs from DexScreener using multiple search terms
    const searchTerms = ['solana', 'trending', 'popular', 'top']
    const allPairs: DexScreenerPair[] = []

    for (const term of searchTerms) {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${term}`, {
          headers: {
            'User-Agent': 'LightChain-Solana/1.0'
          },
          next: { revalidate: 30 }
        })

        if (response.ok) {
          const data = await response.json()
          const pairs = data.pairs || []
          allPairs.push(...pairs)
        }
      } catch (error) {
        console.warn(`Failed to fetch pairs for term "${term}":`, error)
      }
    }

    // Remove duplicates based on pairAddress
    const uniquePairs = allPairs.filter((pair, index, self) =>
      index === self.findIndex(p => p.pairAddress === pair.pairAddress)
    )

    // Filter for Solana pairs only
    const pairs = uniquePairs.filter(pair => pair.chainId === 'solana')

    // Filter and transform the data
    const tokens: TokenData[] = pairs
      .filter((pair) => {
        // Only include pairs with sufficient liquidity and on Raydium/Orca
        return (
          pair.liquidity?.usd >= minLiquidity &&
          ['raydium', 'orca', 'meteora'].includes(pair.dexId.toLowerCase()) &&
          pair.baseToken.symbol &&
          pair.baseToken.name
        )
      })
      .map((pair) => ({
        address: pair.baseToken.address,
        symbol: pair.baseToken.symbol,
        name: pair.baseToken.name,
        price: parseFloat(pair.priceUsd) || 0,
        priceChange24h: pair.priceChange?.h24 || 0,
        volume24h: pair.volume?.h24 || 0,
        liquidity: pair.liquidity?.usd || 0,
        marketCap: pair.marketCap || pair.fdv,
        logoUrl: pair.info?.imageUrl,
        websites: pair.info?.websites || [],
        socials: pair.info?.socials || [],
        pairAddress: pair.pairAddress,
        dexId: pair.dexId
      }))
      .slice(0, limit)

    // Remove duplicates based on token address
    const uniqueTokens = tokens.filter((token, index, self) =>
      index === self.findIndex(t => t.address === token.address)
    )

    return NextResponse.json({
      success: true,
      data: uniqueTokens,
      count: uniqueTokens.length,
      source: 'dexscreener',
      timestamp: new Date().toISOString(),
      filters: {
        minLiquidity,
        limit,
        dexes: ['raydium', 'orca', 'meteora']
      }
    })

  } catch (error) {
    console.error('Error fetching tokens from DexScreener:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch token data',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}