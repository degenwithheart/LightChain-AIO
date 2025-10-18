'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TradingAgent, AgentAnalytics } from '../lib/types/agent';
import { RISK_LEVEL_COLORS } from '../lib/agent-templates';

interface AgentPerformanceDashboardProps {
  agent: TradingAgent;
  onClose: () => void;
}

export function AgentPerformanceDashboard({ agent, onClose }: AgentPerformanceDashboardProps) {
  const [analytics, setAnalytics] = useState<AgentAnalytics | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'1d' | '7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    // In a real implementation, this would fetch from the AI trading engine
    // For now, we'll create mock analytics
    const mockAnalytics: AgentAnalytics = {
      agentId: agent.id,
      period: selectedPeriod,
      metrics: {
        totalReturn: agent.performance.profitLoss,
        annualizedReturn: agent.performance.profitLoss * (365 / 30) / 1000, // Assuming $1000 initial capital
        volatility: 0.15,
        sharpeRatio: agent.performance.sharpeRatio,
        maxDrawdown: agent.performance.maxDrawdown,
        winRate: agent.performance.winRate,
        profitFactor: 1.5,
        avgWin: 25,
        avgLoss: -15,
        largestWin: 100,
        largestLoss: -50
      },
      chartData: {
        dates: [], // Would be populated with actual dates
        portfolioValue: [], // Would be populated with portfolio values
        drawdown: [] // Would be populated with drawdown values
      }
    };

    setAnalytics(mockAnalytics);
  }, [agent, selectedPeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  if (!analytics) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <Card className="glass-card max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-glass-pulse text-4xl mb-4">⚡</div>
            <p>Loading analytics...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                📊 {agent.name} Analytics
              </h1>
              <p className="text-foreground-secondary">
                Performance dashboard for {selectedPeriod} period
              </p>
            </div>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2 mb-6">
            {(['1d', '7d', '30d', '90d', '1y'] as const).map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
              >
                {period.toUpperCase()}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary mb-1">
                  {formatCurrency(analytics.metrics.totalReturn)}
                </div>
                <p className="text-sm text-foreground-secondary">Total Return</p>
                <div className={`text-xs mt-1 ${analytics.metrics.totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {analytics.metrics.totalReturn >= 0 ? '+' : ''}{formatPercentage(analytics.metrics.annualizedReturn)} APR
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {formatPercentage(analytics.metrics.winRate)}
                </div>
                <p className="text-sm text-foreground-secondary">Win Rate</p>
                <div className="text-xs text-foreground-muted mt-1">
                  {agent.performance.totalTrades} total trades
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-yellow-500 mb-1">
                  {analytics.metrics.sharpeRatio.toFixed(2)}
                </div>
                <p className="text-sm text-foreground-secondary">Sharpe Ratio</p>
                <div className="text-xs text-foreground-muted mt-1">
                  Risk-adjusted return
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-red-500 mb-1">
                  {formatPercentage(analytics.metrics.maxDrawdown)}
                </div>
                <p className="text-sm text-foreground-secondary">Max Drawdown</p>
                <div className="text-xs text-foreground-muted mt-1">
                  Peak-to-trough decline
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Trading Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Profit Factor</span>
                    <span className="font-semibold text-green-500">
                      {analytics.metrics.profitFactor.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Avg Win</span>
                    <span className="font-semibold text-green-500">
                      {formatCurrency(analytics.metrics.avgWin)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Avg Loss</span>
                    <span className="font-semibold text-red-500">
                      {formatCurrency(analytics.metrics.avgLoss)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Largest Win</span>
                    <span className="font-semibold text-green-500">
                      {formatCurrency(analytics.metrics.largestWin)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Largest Loss</span>
                    <span className="font-semibold text-red-500">
                      {formatCurrency(analytics.metrics.largestLoss)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Volatility</span>
                    <span className="font-semibold">
                      {formatPercentage(analytics.metrics.volatility)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Current Win Streak</span>
                    <span className="font-semibold text-green-500">
                      {agent.performance.winStreak}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Current Loss Streak</span>
                    <span className="font-semibold text-red-500">
                      {agent.performance.lossStreak}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Risk Level</span>
                    <Badge className={`${RISK_LEVEL_COLORS[agent.riskLevel]} border-current`}>
                      {agent.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Strategy</span>
                    <span className="font-semibold capitalize">
                      {agent.strategy.type.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Trades */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Recent Trades</CardTitle>
              <CardDescription>
                Last {Math.min(agent.performance.trades.length, 10)} trades
              </CardDescription>
            </CardHeader>
            <CardContent>
              {agent.performance.trades.length === 0 ? (
                <p className="text-center text-foreground-secondary py-8">
                  No trades executed yet
                </p>
              ) : (
                <div className="space-y-2">
                  {agent.performance.trades.slice(-10).reverse().map((trade) => (
                    <div key={trade.id} className="flex justify-between items-center p-3 glass-card rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={trade.side === 'long' ? 'default' : 'secondary'}>
                          {trade.side.toUpperCase()}
                        </Badge>
                        <div>
                          <p className="font-semibold">{trade.tokenAddress.slice(0, 8)}...</p>
                          <p className="text-xs text-foreground-muted">
                            {new Date(trade.entryTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(trade.entryPrice)}
                        </p>
                        {trade.pnl !== undefined && (
                          <p className={`text-sm ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}