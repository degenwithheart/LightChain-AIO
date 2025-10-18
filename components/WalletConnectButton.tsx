'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button } from './ui/button'

export function WalletConnectButton() {
  const { publicKey, connected, connecting, disconnect } = useWallet()

  if (connected && publicKey) {
    return (
      <div className="flex items-center space-x-2">
        <div className="glass-badge">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono">
              {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnect}
          className="text-xs"
        >
          DISCONNECT
        </Button>
      </div>
    )
  }

  return (
    <WalletMultiButton className="glass-button text-sm px-4 py-2 !bg-primary hover:!bg-primary/80 !text-white !font-semibold !transition-all !duration-300 !shadow-lg hover:!shadow-xl !border !border-glass-border hover:!border-primary/50 !rounded-lg" />
  )
}