'use client'

import Link from 'next/link'
import { useState } from 'react'
import { WalletConnectButton } from './WalletConnectButton'
import { APP_CONFIG } from '../lib/constants'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border backdrop-blur-xl bg-background/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-shadow duration-300">
              <span className="text-white font-black text-sm">{APP_CONFIG.logo.text}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary leading-tight">
                {APP_CONFIG.logo.fullText}
              </span>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
                {APP_CONFIG.logo.tag}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tokens" className="text-foreground-secondary hover:text-primary transition-colors duration-200 font-medium relative group">
              Trade
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/agents" className="text-foreground-secondary hover:text-primary transition-colors duration-200 font-medium relative group">
              Agents
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/positions" className="text-foreground-secondary hover:text-primary transition-colors duration-200 font-medium relative group">
              Positions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/create" className="text-foreground-secondary hover:text-primary transition-colors duration-200 font-medium relative group">
              Create
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:flex items-center">
            <WalletConnectButton />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 border-t border-glass-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/tokens"
                className="text-foreground-secondary hover:text-primary transition-colors duration-200 font-medium px-2 py-1 rounded-lg hover:bg-primary/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Trade
              </Link>
              <Link
                href="/agents"
                className="text-foreground-secondary hover:text-primary transition-colors duration-200 font-medium px-2 py-1 rounded-lg hover:bg-primary/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Agents
              </Link>
              <Link
                href="/positions"
                className="text-foreground-secondary hover:text-primary transition-colors duration-200 font-medium px-2 py-1 rounded-lg hover:bg-primary/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Positions
              </Link>
              <Link
                href="/create"
                className="text-foreground-secondary hover:text-primary transition-colors duration-200 font-medium px-2 py-1 rounded-lg hover:bg-primary/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Create
              </Link>
              <div className="px-2 py-1">
                <WalletConnectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}