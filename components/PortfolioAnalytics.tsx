'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface PortfolioHolding {
  tokenAddress: string;
  tokenSymbol: string;
  balance: number;
  value: number;
  price: number;
  change24h: number;
  allocation: number;
}

interface PortfolioAnalytics {
  totalValue: number;
  totalChange24h: number;
  holdings: PortfolioHolding[];
  bestPerformer: PortfolioHolding | null;
  worstPerformer: PortfolioHolding | null;
  diversificationScore: number;
}

interface PortfolioAnalyticsProps {
  className?: string;
}

export function PortfolioAnalytics({ className }: PortfolioAnalyticsProps) {
  const [portfolio, setPortfolio] = useState<PortfolioAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'value' | 'change' | 'allocation'>('value');

  useEffect(() => {
    // Mock portfolio data - in real implementation, this would fetch from wallet and price APIs
    const generateMockPortfolio = (): PortfolioAnalytics => {
      const holdings: PortfolioHolding[] = [
        {
          tokenAddress: 'So11111111111111111111111111111111111111112',
          tokenSymbol: 'SOL',
          balance: 45.67,
          price: 145.23,
          value: 45.67 * 145.23,
          change24h: 2.34,
          allocation: 0
        },
        {
          tokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          tokenSymbol: 'USDC',
          balance: 1250.00,
          price: 1.00,
          value: 1250.00,
          change24h: 0.01,
          allocation: 0
        },
        {
          tokenAddress: 'BONK_TOKEN_ADDRESS',
          tokenSymbol: 'BONK',
          balance: 1500000,
          price: 0.00001234,
          value: 1500000 * 0.00001234,
          change24h: -5.67,
          allocation: 0
        },
        {
          tokenAddress: 'RAY_TOKEN_ADDRESS',
          tokenSymbol: 'RAY',
          balance: 234.56,
          price: 2.45,
          value: 234.56 * 2.45,
          change24h: 8.92,
          allocation: 0
        }
      ];

      const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

      // Calculate allocations
      holdings.forEach(holding => {
        holding.allocation = (holding.value / totalValue) * 100;
      });

      const totalChange24h = holdings.reduce((sum, holding) =>
        sum + (holding.change24h * holding.allocation / 100), 0
      );

      // Find best and worst performers
      const sortedByChange = [...holdings].sort((a, b) => b.change24h - a.change24h);
      const bestPerformer = sortedByChange[0];
      const worstPerformer = sortedByChange[sortedByChange.length - 1];

      // Calculate diversification score (simplified)
      const herfindahlIndex = holdings.reduce((sum, holding) =>
        sum + Math.pow(holding.allocation / 100, 2), 0
      );
      const diversificationScore = Math.max(0, 100 - (herfindahlIndex * 100));

      return {
        totalValue,
        totalChange24h,
        holdings,
        bestPerformer,
        worstPerformer,
        diversificationScore
      };
    };

    const loadPortfolio = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPortfolio(generateMockPortfolio());
      setIsLoading(false);
    };

    loadPortfolio();

    // Update portfolio every 30 seconds
    const interval = setInterval(loadPortfolio, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const sortedHoldings = portfolio?.holdings.sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return b.value - a.value;
      case 'change':
        return b.change24h - a.change24h;
      case 'allocation':
        return b.allocation - a.allocation;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <Card className={`glass-card ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg font-bold">📈 Portfolio Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-glass-pulse text-2xl mr-2">💎</div>
            <span>Loading portfolio...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!portfolio) {
    return (
      <Card className={`glass-card ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg font-bold">📈 Portfolio Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-foreground-secondary">
            Unable to load portfolio data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-bold">📈 Portfolio Analytics</CardTitle>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <p className="text-sm text-foreground-secondary">Total Value</p>
          </div>
          <div>
            <div className={`text-2xl font-bold ${portfolio.totalChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(portfolio.totalChange24h)}
            </div>
            <p className="text-sm text-foreground-secondary">24h Change</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Sort Controls */}
        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => setSortBy('value')}
            variant={sortBy === 'value' ? 'default' : 'outline'}
            size="sm"
          >
            Value
          </Button>
          <Button
            onClick={() => setSortBy('change')}
            variant={sortBy === 'change' ? 'default' : 'outline'}
            size="sm"
          >
            Change
          </Button>
          <Button
            onClick={() => setSortBy('allocation')}
            variant={sortBy === 'allocation' ? 'default' : 'outline'}
            size="sm"
          >
            Allocation
          </Button>
        </div>

        {/* Holdings List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {sortedHoldings?.map((holding) => (
            <div
              key={holding.tokenAddress}
              className="flex items-center justify-between p-3 bg-card-bg/50 rounded-lg hover:bg-card-bg/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                  {holding.tokenSymbol.slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold">{holding.tokenSymbol}</p>
                  <p className="text-xs text-foreground/50">
                    {holding.balance.toLocaleString()} tokens
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">{formatCurrency(holding.value)}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${holding.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatPercentage(holding.change24h)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {holding.allocation.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {portfolio.bestPerformer?.tokenSymbol}
              </div>
              <p className="text-xs text-foreground/70">Best Performer</p>
              <p className="text-sm text-green-400">
                {formatPercentage(portfolio.bestPerformer?.change24h || 0)}
              </p>
            </div>

            <div className="text-center">
              <div className="text-lg font-bold text-red-400">
                {portfolio.worstPerformer?.tokenSymbol}
              </div>
              <p className="text-xs text-foreground/70">Worst Performer</p>
              <p className="text-sm text-red-400">
                {formatPercentage(portfolio.worstPerformer?.change24h || 0)}
              </p>
            </div>

            <div className="text-center">
              <div className="text-lg font-bold text-secondary">
                {portfolio.diversificationScore.toFixed(0)}%
              </div>
              <p className="text-xs text-foreground/70">Diversification</p>
              <p className="text-sm text-foreground/50">
                {portfolio.diversificationScore > 70 ? 'Well diversified' :
                 portfolio.diversificationScore > 40 ? 'Moderately diversified' :
                 'Concentrated'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}