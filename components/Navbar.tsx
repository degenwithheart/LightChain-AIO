'use client'

import Link from 'next/link'
import { useState } from 'react'
import { WalletConnectButton } from './WalletConnectButton'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">LC</span>
            </div>
            <span className="font-bold text-xl text-primary">
              LIGHTCHAIN
            </span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-semibold">
              SOLANA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tokens" className="text-foreground-secondary hover:text-primary transition-colors font-medium">
              Trade
            </Link>
            <Link href="/agents" className="text-foreground-secondary hover:text-primary transition-colors font-medium">
              Agents
            </Link>
            <Link href="/positions" className="text-foreground-secondary hover:text-primary transition-colors font-medium">
              Positions
            </Link>
            <Link href="/create" className="text-foreground-secondary hover:text-primary transition-colors font-medium">
              Create
            </Link>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:flex items-center">
            <WalletConnectButton />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground-secondary hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-glass-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/tokens"
                className="text-foreground-secondary hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Trade
              </Link>
              <Link
                href="/agents"
                className="text-foreground-secondary hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Agents
              </Link>
              <Link
                href="/positions"
                className="text-foreground-secondary hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Positions
              </Link>
              <Link
                href="/create"
                className="text-foreground-secondary hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Create
              </Link>
              <div className="px-2 py-1">
                <WalletConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}