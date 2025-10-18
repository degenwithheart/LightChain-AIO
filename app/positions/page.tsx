'use client'

import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { PositionsTable } from '../../components/PositionsTable'
import { usePerpDex } from '../../hooks/usePerpDex'
import { Loading } from '../../components/Loading'

export default function PositionsPage() {
  const { positions, loading } = usePerpDex()

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-16 min-h-[400px] md:min-h-[300px]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent mb-4">
              Your Positions
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Monitor your active trading positions with real-time P&L and performance metrics.
            </p>
          </div>

          <div className="glass-card p-6">
            <PositionsTable positions={positions} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}