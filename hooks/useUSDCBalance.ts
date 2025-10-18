'use client'

import { useState, useEffect, useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { TOKEN_MINTS } from '../config/solana'
import { getAssociatedTokenAddress } from '@solana/spl-token'

interface BalanceState {
  balance: number
  formattedBalance: string
  isLoading: boolean
  error: string | null
}

export function useUSDCBalance() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [state, setState] = useState<BalanceState>({
    balance: 0,
    formattedBalance: '0.00',
    isLoading: false,
    error: null,
  })

  const fetchBalance = useCallback(async () => {
    if (!publicKey) {
      setState(prev => ({
        ...prev,
        balance: 0,
        formattedBalance: '0.00',
        isLoading: false,
        error: null,
      }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const tokenMint = new PublicKey(TOKEN_MINTS.USDC)
      const owner = publicKey

      // Get the associated token account address for USDC
      const associatedTokenAccount = await getAssociatedTokenAddress(
        tokenMint,
        owner
      )

      // Get token account balance
      const tokenAccountInfo = await connection.getTokenAccountBalance(associatedTokenAccount)

      const balance = tokenAccountInfo.value.uiAmount || 0
      const formattedBalance = balance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })

      setState(prev => ({
        ...prev,
        balance,
        formattedBalance,
        isLoading: false,
      }))
    } catch (err) {
      // If the associated token account doesn't exist, balance is 0
      if (err instanceof Error && err.message.includes('could not find account')) {
        setState(prev => ({
          ...prev,
          balance: 0,
          formattedBalance: '0.00',
          isLoading: false,
          error: null,
        }))
      } else {
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Failed to fetch balance',
          isLoading: false,
        }))
      }
    }
  }, [publicKey, connection])

  // Fetch balance when wallet connects or connection changes
  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  // Set up polling for balance updates (every 30 seconds)
  useEffect(() => {
    if (!publicKey) return

    const interval = setInterval(() => {
      fetchBalance()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [publicKey, fetchBalance])

  return {
    ...state,
    refetch: fetchBalance,
  }
}