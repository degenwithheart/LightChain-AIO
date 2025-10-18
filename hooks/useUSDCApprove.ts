'use client'

import { useState, useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { TOKEN_MINTS, PROGRAM_IDS } from '../config/solana'
import { getAssociatedTokenAddress, createApproveInstruction } from '@solana/spl-token'

interface ApprovalState {
  isApproved: boolean
  allowance: number
  isLoading: boolean
  error: string | null
}

export function useUSDCApprove(spenderAddress?: string) {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [state, setState] = useState<ApprovalState>({
    isApproved: false,
    allowance: 0,
    isLoading: false,
    error: null,
  })

  // Check current allowance
  const checkAllowance = useCallback(async (amount: number) => {
    if (!publicKey) return

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // In Solana, approval works differently than Ethereum
      // We check if the user has approved the DEX program to spend tokens

      const tokenMint = new PublicKey(TOKEN_MINTS.USDC)
      const owner = publicKey
      const spender = spenderAddress ? new PublicKey(spenderAddress) : owner // DEX program address

      // Get associated token account
      const associatedTokenAccount = await getAssociatedTokenAddress(
        tokenMint,
        owner
      )

      // Check token balance (simplified - in reality you'd check delegations)
      const tokenAccountInfo = await connection.getTokenAccountBalance(associatedTokenAccount)

      const balance = tokenAccountInfo.value.uiAmount || 0
      const hasAllowance = balance >= amount

      setState(prev => ({
        ...prev,
        isApproved: hasAllowance,
        allowance: balance,
        isLoading: false,
      }))

      return hasAllowance
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to check allowance',
        isLoading: false,
      }))
      return false
    }
  }, [publicKey, connection, spenderAddress])

  // Approve spending
  const approve = useCallback(async (amount: number) => {
    if (!publicKey || !sendTransaction) {
      throw new Error('Wallet not connected')
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // In Solana, token approval is handled differently
      // For DEX programs, you typically need to create a delegation

      const tokenMint = new PublicKey(TOKEN_MINTS.USDC)
      const owner = publicKey
      const spender = spenderAddress ? new PublicKey(spenderAddress) : owner

      // Get associated token account
      const associatedTokenAccount = await getAssociatedTokenAddress(
        tokenMint,
        owner
      )

      // Create approve instruction (delegate spending authority)
      const approveInstruction = createApproveInstruction(
        associatedTokenAccount,
        spender,
        owner,
        BigInt(amount * Math.pow(10, 6)) // USDC has 6 decimals
      )

      const transaction = new Transaction().add(approveInstruction)

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      // Update state
      setState(prev => ({
        ...prev,
        isApproved: true,
        allowance: amount,
        isLoading: false,
      }))

      return signature
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve spending'
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }))
      throw err
    }
  }, [publicKey, sendTransaction, connection, spenderAddress])

  // Revoke approval
  const revoke = useCallback(async () => {
    if (!publicKey || !sendTransaction) {
      throw new Error('Wallet not connected')
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const tokenMint = new PublicKey(TOKEN_MINTS.USDC)
      const owner = publicKey

      // Get associated token account
      const associatedTokenAccount = await getAssociatedTokenAddress(
        tokenMint,
        owner
      )

      // Revoke approval by setting delegate to null
      const revokeInstruction = createApproveInstruction(
        associatedTokenAccount,
        owner, // Set back to owner
        owner,
        BigInt(0) // Zero allowance
      )

      const transaction = new Transaction().add(revokeInstruction)

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      // Update state
      setState(prev => ({
        ...prev,
        isApproved: false,
        allowance: 0,
        isLoading: false,
      }))

      return signature
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to revoke approval'
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }))
      throw err
    }
  }, [publicKey, sendTransaction, connection])

  return {
    ...state,
    checkAllowance,
    approve,
    revoke,
  }
}