import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BackgroundPaths } from '../components/ui/background-paths'
import { ClientWalletProvider } from '../components/ClientWalletProvider'
import { ErrorBoundary } from '../components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LightChain Solana - Modern Trading Platform',
  description: 'Advanced perpetual DEX trading with glassmorphism design on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} glass-gradient-bg font-inter min-h-screen relative overflow-x-hidden`}>
        <ClientWalletProvider>
          <ErrorBoundary>
            <BackgroundPaths />
            <div className="relative z-10 min-h-screen">
              {children}
            </div>
          </ErrorBoundary>
        </ClientWalletProvider>
      </body>
    </html>
  )
}