'use client'

import Link from 'next/link'
import { TypeWriter } from './TypeWriter'
import { Button } from './ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary opacity-80" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main heading with glassmorphism card */}
        <div className="glass-card p-8 mb-8 mx-auto max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent mb-4">
            LIGHTCHAIN
          </h1>

          <div className="text-xl md:text-2xl font-semibold text-secondary mb-6">
            <TypeWriter
              texts={[
                "SOLANA EDITION",
                "MODERN TRADING",
                "PERPETUAL DEX",
                "AI AGENTS"
              ]}
              delay={2000}
            />
          </div>
        </div>

        <div className="glass-card p-6 mb-8 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
            Experience the future of decentralized trading with modern glassmorphism design on Solana.
            Trade perpetual contracts with AI-powered agents and advanced analytics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/tokens">
            <Button size="lg" className="min-w-[160px]">
              START TRADING
            </Button>
          </Link>
          <Link href="/create">
            <Button variant="secondary" size="lg" className="min-w-[160px]">
              CREATE AGENT
            </Button>
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-primary mb-1">Lightning Fast</h3>
            <p className="text-sm text-foreground-muted">Sub-second Solana transactions</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold text-secondary mb-1">AI Agents</h3>
            <p className="text-sm text-foreground-muted">Autonomous trading strategies</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-accent mb-1">Analytics</h3>
            <p className="text-sm text-foreground-muted">Advanced portfolio insights</p>
          </div>
        </div>
      </div>

      {/* Modern floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-glass-border rounded-2xl rotate-12 animate-glass-float opacity-20" />
      <div className="absolute bottom-20 right-10 w-40 h-40 border border-glass-border rounded-full animate-glass-float delay-1000 opacity-15" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-glass-border rounded-lg rotate-45 animate-glass-float delay-500 opacity-25" />
    </section>
  )
}