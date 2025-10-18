import { NextRequest, NextResponse } from 'next/server'

interface PopulatedToken {
  address: string
  symbol: string
  name: string
  decimals?: number
  price: number
  priceChange24h: number
  volume24h: number
  liquidity: number
  marketCap?: number
  logoURI?: string
  tags?: string[]
  website?: string
  twitter?: string
  telegram?: string
  discord?: string
  description?: string
  pairAddress?: string
  dexId?: string
  lastTrade?: {
    signature: string
    timestamp: number
    amount: number
    type: string
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const minLiquidity = parseFloat(searchParams.get('minLiquidity') || '50000')
    const includeMetadata = searchParams.get('includeMetadata') === 'true'
    const includeTrades = searchParams.get('includeTrades') === 'true'

    // Step 1: Fetch popular tokens from DexScreener
    console.log('Fetching tokens from DexScreener...')
    const dexResponse = await fetch(`${request.nextUrl.origin}/api/populate/tokens?limit=${limit * 2}&minLiquidity=${minLiquidity}`, {
      headers: {
        'User-Agent': 'LightChain-Solana/1.0'
      }
    })

    if (!dexResponse.ok) {
      throw new Error('Failed to fetch tokens from DexScreener')
    }

    const dexData = await dexResponse.json()
    const dexTokens = dexData.data || []

    // Step 2: Enrich with metadata if requested
    let enrichedTokens = dexTokens

    if (includeMetadata && dexTokens.length > 0) {
      console.log('Enriching with metadata...')
      const addresses = dexTokens.map((token: any) => token.address).join(',')
      const metadataResponse = await fetch(`${request.nextUrl.origin}/api/populate/metadata?addresses=${addresses}`, {
        headers: {
          'User-Agent': 'LightChain-Solana/1.0'
        }
      })

      if (metadataResponse.ok) {
        const metadataData = await metadataResponse.json()
        const metadataMap = new Map(
          (metadataData.data || []).map((meta: any) => [meta.address.toLowerCase(), meta])
        )

        // Merge metadata with token data
        enrichedTokens = dexTokens.map((token: any) => {
          const metadata = metadataMap.get(token.address.toLowerCase())
          return {
            ...token,
            ...(metadata as any),
            // Prefer DexScreener data for price/volume, metadata for description/socials
            symbol: token.symbol || (metadata as any)?.symbol,
            name: token.name || (metadata as any)?.name,
          }
        })
      }
    }

    // Step 3: Add recent trade data if requested
    if (includeTrades && enrichedTokens.length > 0) {
      console.log('Adding recent trade data...')
      const tradePromises = enrichedTokens.slice(0, 5).map(async (token: any) => {
        try {
          const tradeResponse = await fetch(`${request.nextUrl.origin}/api/populate/trades?tokenAddress=${token.address}&limit=1`, {
            headers: {
              'User-Agent': 'LightChain-Solana/1.0'
            }
          })

          if (tradeResponse.ok) {
            const tradeData = await tradeResponse.json()
            const lastTrade = tradeData.data?.[0]
            return {
              ...token,
              lastTrade: lastTrade ? {
                signature: lastTrade.signature,
                timestamp: lastTrade.timestamp,
                amount: lastTrade.amount,
                type: lastTrade.type
              } : undefined
            }
          }
        } catch (error) {
          console.warn(`Failed to fetch trades for ${token.address}:`, error)
        }
        return token
      })

      enrichedTokens = await Promise.all(tradePromises)
    }

    // Step 4: Sort by volume and limit results
    const sortedTokens = enrichedTokens
      .sort((a: any, b: any) => (b.volume24h || 0) - (a.volume24h || 0))
      .slice(0, limit)

    const populatedData: PopulatedToken[] = sortedTokens.map((token: any) => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      price: token.price,
      priceChange24h: token.priceChange24h,
      volume24h: token.volume24h,
      liquidity: token.liquidity,
      marketCap: token.marketCap,
      logoURI: token.logoURI,
      tags: token.tags,
      website: token.website,
      twitter: token.twitter,
      telegram: token.telegram,
      discord: token.discord,
      description: token.description,
      pairAddress: token.pairAddress,
      dexId: token.dexId,
      lastTrade: token.lastTrade
    }))

    return NextResponse.json({
      success: true,
      data: populatedData,
      count: populatedData.length,
      sources: {
        dexscreener: true,
        metadata: includeMetadata,
        trades: includeTrades
      },
      timestamp: new Date().toISOString(),
      filters: {
        limit,
        minLiquidity,
        includeMetadata,
        includeTrades
      }
    })

  } catch (error) {
    console.error('Error populating platform data:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to populate platform data',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}