import { NextRequest, NextResponse } from 'next/server'

interface TokenListToken {
  chainId: number
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  tags?: string[]
  extensions?: {
    website?: string
    twitter?: string
    telegram?: string
    discord?: string
    description?: string
    coingeckoId?: string
  }
}

interface TokenMetadata {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  tags?: string[]
  website?: string
  twitter?: string
  telegram?: string
  discord?: string
  description?: string
  coingeckoId?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const addresses = searchParams.get('addresses')?.split(',') || []
    const includeTags = searchParams.get('tags')?.split(',') || []

    // Fetch Solana token list
    const response = await fetch('https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json', {
      headers: {
        'User-Agent': 'LightChain-AIO/1.0'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Token list fetch error: ${response.status}`)
    }

    const tokenList = await response.json()
    const tokens: TokenListToken[] = tokenList.tokens || []

    let filteredTokens = tokens

    // Filter by specific addresses if provided
    if (addresses.length > 0) {
      filteredTokens = tokens.filter(token =>
        addresses.includes(token.address.toLowerCase())
      )
    }

    // Filter by tags if specified
    if (includeTags.length > 0) {
      filteredTokens = filteredTokens.filter(token =>
        token.tags?.some(tag => includeTags.includes(tag))
      )
    }

    // Transform to our metadata format
    const metadata: TokenMetadata[] = filteredTokens.map(token => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      logoURI: token.logoURI,
      tags: token.tags,
      website: token.extensions?.website,
      twitter: token.extensions?.twitter,
      telegram: token.extensions?.telegram,
      discord: token.extensions?.discord,
      description: token.extensions?.description,
      coingeckoId: token.extensions?.coingeckoId
    }))

    return NextResponse.json({
      success: true,
      data: metadata,
      count: metadata.length,
      source: 'solana-token-list',
      timestamp: new Date().toISOString(),
      filters: {
        addresses: addresses.length > 0 ? addresses : null,
        tags: includeTags.length > 0 ? includeTags : null
      }
    })

  } catch (error) {
    console.error('Error fetching token metadata:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch token metadata',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}