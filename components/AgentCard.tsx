'use client'

import { Button } from './ui/button'

interface AgentCardProps {
  id: string
  name: string
  description: string
  performance: number
  risk: 'Low' | 'Medium' | 'High'
  tokens: string[]
  isActive?: boolean
}

export function AgentCard({ id, name, description, performance, risk, tokens, isActive = false }: AgentCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'High': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="glass-card group hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-lg">{name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-bold text-primary text-lg">{name}</h3>
            <p className="text-foreground-secondary text-sm">ID: {id.slice(0, 8)}...</p>
          </div>
        </div>
        {isActive && (
          <div className="glass-badge text-xs">
            ACTIVE
          </div>
        )}
      </div>

      <p className="text-foreground-secondary text-sm mb-4 line-clamp-2">{description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-foreground-muted text-xs uppercase tracking-wider">Performance</p>
          <p className={`font-semibold text-lg ${performance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {performance >= 0 ? '+' : ''}{performance.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-foreground-muted text-xs uppercase tracking-wider">Risk Level</p>
          <p className={`font-semibold text-sm ${getRiskColor(risk)}`}>
            {risk}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-foreground-muted text-xs uppercase tracking-wider mb-2">Trading Tokens</p>
        <div className="flex flex-wrap gap-1">
          {tokens.slice(0, 3).map((token) => (
            <span key={token} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
              {token}
            </span>
          ))}
          {tokens.length > 3 && (
            <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-medium">
              +{tokens.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="default" size="sm" className="flex-1">
          {isActive ? 'MANAGE' : 'ACTIVATE'}
        </Button>
        <Button variant="outline" size="sm">
          DETAILS
        </Button>
      </div>
    </div>
  )
}
