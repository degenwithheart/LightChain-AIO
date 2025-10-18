import { NextRequest, NextResponse } from 'next/server'

interface HeliusTransaction {
  signature: string
  timestamp: number
  type: string
  fee: number
  feePayer: string
  slot: number
  nativeTransfers?: Array<{
    fromUserAccount: string
    toUserAccount: string
    amount: number
  }>
  tokenTransfers?: Array<{
    fromUserAccount: string
    toUserAccount: string
    fromTokenAccount: string
    toTokenAccount: string
    tokenAmount: number
    mint: string
  }>
  accountData?: Array<{
    account: string
    nativeBalanceChange: number
    tokenBalanceChanges: Array<{
      userAccount: string
      tokenAccount: string
      mint: string
      rawTokenAmount: {
        tokenAmount: string
        decimals: number
      }
    }>
  }>
}

interface TradeData {
  signature: string
  timestamp: number
  tokenAddress: string
  tokenSymbol?: string
  amount: number
  price?: number
  type: 'buy' | 'sell' | 'swap'
  trader: string
  programId: string
  dex: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tokenAddress = searchParams.get('tokenAddress')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const before = searchParams.get('before') // Cursor for pagination

    if (!tokenAddress) {
      return NextResponse.json(
        { error: 'tokenAddress parameter is required' },
        { status: 400 }
      )
    }

    // Use Helius enhanced transactions API
    const heliusApiKey = process.env.HELIUS_API_KEY_ONLY
    if (!heliusApiKey) {
      return NextResponse.json(
        { error: 'Helius API key not configured' },
        { status: 500 }
      )
    }
    const heliusUrl = `https://api.helius.xyz/v0/addresses/${tokenAddress}/transactions`

    const params = new URLSearchParams({
      'api-key': heliusApiKey,
      limit: limit.toString(),
      type: 'SWAP', // Focus on swap transactions
    })

    if (before) {
      params.append('before', before)
    }

    const fetchOptions = {
      headers: {
        'User-Agent': 'LightChain-AIO/1.0'
      },
      next: { revalidate: 5 } // Cache for 5 seconds for live data
    } as unknown as RequestInit

    const response = await fetch(`${heliusUrl}?${params}`, fetchOptions)

    if (!response.ok) {
      throw new Error(`Helius API error: ${response.status}`)
    }

    const transactions: HeliusTransaction[] = await response.json()

    // Process transactions to extract trade data
    const trades: TradeData[] = transactions
      .filter(tx => tx.type === 'SWAP' && tx.tokenTransfers && tx.tokenTransfers.length >= 2)
      .map(tx => {
        const tokenTransfers = tx.tokenTransfers!
        const nativeTransfers = tx.nativeTransfers || []

        // Find the transfer involving our target token
        const targetTransfer = tokenTransfers.find(transfer =>
          transfer.mint === tokenAddress
        )

        if (!targetTransfer) return null

        // Determine if it's a buy or sell based on SOL transfers
        // This is a simplified approach - in production you'd need more sophisticated logic
        const solTransfer = nativeTransfers.find(transfer =>
          transfer.amount > 1000000 // > 0.001 SOL to filter noise
        )

        let tradeType: 'buy' | 'sell' | 'swap' = 'swap'
        if (solTransfer) {
          // If SOL is coming in and token is going out, it's a sell
          // If token is coming in and SOL is going out, it's a buy
          const isTokenOutgoing = targetTransfer.fromUserAccount !== targetTransfer.toUserAccount
          const isSolIncoming = solTransfer.toUserAccount === targetTransfer.toUserAccount

          if (isTokenOutgoing && isSolIncoming) {
            tradeType = 'sell'
          } else if (!isTokenOutgoing && !isSolIncoming) {
            tradeType = 'buy'
          }
        }

        return {
          signature: tx.signature,
          timestamp: tx.timestamp,
          tokenAddress: targetTransfer.mint,
          amount: targetTransfer.tokenAmount,
          type: tradeType,
          trader: targetTransfer.fromUserAccount,
          programId: tx.accountData?.[0]?.account || '',
          dex: 'raydium' // Default assumption - could be enhanced to detect actual DEX
        }
      })
      .filter((trade): trade is TradeData => trade !== null)
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      data: trades,
      count: trades.length,
      tokenAddress,
      source: 'helius',
      timestamp: new Date().toISOString(),
      pagination: {
        limit,
        hasMore: transactions.length === limit
      }
    })

  } catch (error) {
    console.error('Error fetching live trades:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch live trade data',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}