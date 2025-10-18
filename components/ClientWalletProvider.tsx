'use client'

import { WalletContextProvider } from '../components/WalletProvider'

export function ClientWalletProvider({ children }: { children: React.ReactNode }) {
  return <WalletContextProvider>{children}</WalletContextProvider>
}