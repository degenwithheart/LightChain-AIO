import { Connection } from '@solana/web3.js'

export const SOLANA_NETWORKS = {
  mainnet: process.env.RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com',
  devnet: process.env.DEVNET_RPC_ENDPOINT || 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  localnet: 'http://localhost:8899'
} as const

export type SolanaNetwork = keyof typeof SOLANA_NETWORKS

export const DEFAULT_NETWORK: SolanaNetwork = 'mainnet'

export function getConnection(network: SolanaNetwork = DEFAULT_NETWORK): Connection {
  return new Connection(SOLANA_NETWORKS[network], {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000,
  })
}

// Program IDs for common Solana programs
export const PROGRAM_IDS = {
  SYSTEM_PROGRAM: '11111111111111111111111111111112',
  TOKEN_PROGRAM: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  ASSOCIATED_TOKEN_PROGRAM: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  RENT_PROGRAM: 'SysvarRent111111111111111111111111111111111',
  CLOCK_PROGRAM: 'SysvarC1ock11111111111111111111111111111111',
} as const

// Common token mint addresses
export const TOKEN_MINTS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  BTC: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
  ETH: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
} as const