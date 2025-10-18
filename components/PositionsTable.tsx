'use client'

import { useState } from 'react'
import { Button } from './ui/button'

interface Position {
  id: string
  token: string
  side: 'Long' | 'Short'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  leverage: number
  liquidationPrice: number
  timestamp: Date
}

interface PositionsTableProps {
  positions: Position[]
  onClosePosition?: (positionId: string) => void
}

export function PositionsTable({ positions, onClosePosition }: PositionsTableProps) {
  const [sortBy, setSortBy] = useState<'pnl' | 'size' | 'timestamp'>('pnl')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const sortedPositions = [...positions].sort((a, b) => {
    let aValue: number, bValue: number

    switch (sortBy) {
      case 'pnl':
        aValue = a.pnl
        bValue = b.pnl
        break
      case 'size':
        aValue = a.size
        bValue = b.size
        break
      case 'timestamp':
        aValue = a.timestamp.getTime()
        bValue = b.timestamp.getTime()
        break
      default:
        return 0
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
  })

  const handleSort = (column: 'pnl' | 'size' | 'timestamp') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const formatPrice = (price: number) => `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const formatPercent = (percent: number) => `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-primary text-xl">OPEN POSITIONS</h2>
        <div className="text-foreground-secondary text-sm">
          {positions.length} position{positions.length !== 1 ? 's' : ''}
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-foreground-secondary text-lg mb-2">No open positions</div>
          <p className="text-foreground-muted text-sm">Start trading to see your positions here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="text-left py-3 px-2 text-foreground-secondary text-xs uppercase tracking-wider font-medium">Token</th>
                <th className="text-left py-3 px-2 text-foreground-secondary text-xs uppercase tracking-wider font-medium">Side</th>
                <th className="text-left py-3 px-2 text-foreground-secondary text-xs uppercase tracking-wider font-medium">Size</th>
                <th className="text-left py-3 px-2 text-foreground-secondary text-xs uppercase tracking-wider font-medium">Entry</th>
                <th className="text-left py-3 px-2 text-foreground-secondary text-xs uppercase tracking-wider font-medium">Current</th>
                <th
                  className="text-left py-3 px-2 text-foreground-secondary text-xs uppercase tracking-wider font-medium cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('pnl')}
                >
                  P&L {sortBy === 'pnl' && (sortOrder === 'desc' ? '↓' : '↑')}
                </th>
                <th className="text-left py-3 px-2 text-foreground-secondary text-xs uppercase tracking-wider font-medium">Liq. Price</th>
                <th className="text-right py-3 px-2 text-foreground-secondary text-xs uppercase tracking-wider font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPositions.map((position) => (
                <tr key={position.id} className="border-b border-glass-border/50 hover:bg-glass-hover transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-xs">{position.token.slice(0, 2)}</span>
                      </div>
                      <span className="font-semibold text-foreground">{position.token}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className={`font-semibold ${position.side === 'Long' ? 'text-green-500' : 'text-red-500'}`}>
                      {position.side}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-medium text-foreground">
                      {position.size.toLocaleString()}x
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-mono text-sm text-foreground-secondary">
                      {formatPrice(position.entryPrice)}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-mono text-sm text-foreground-secondary">
                      {formatPrice(position.currentPrice)}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex flex-col">
                      <span className={`font-semibold ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                      </span>
                      <span className={`text-xs ${position.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {formatPercent(position.pnlPercent)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-mono text-sm text-foreground-muted">
                      {formatPrice(position.liquidationPrice)}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onClosePosition?.(position.id)}
                      className="text-xs"
                    >
                      CLOSE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}