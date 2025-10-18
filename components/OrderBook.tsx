'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

interface OrderBookData {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  spread: number;
  spreadPercentage: number;
}

interface OrderBookProps {
  tokenAddress: string;
  className?: string;
}

export function OrderBook({ tokenAddress, className }: OrderBookProps) {
  const [orderBook, setOrderBook] = useState<OrderBookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock order book data - in real implementation, this would connect to a DEX API
    const generateMockOrderBook = (): OrderBookData => {
      const basePrice = 0.001234;
      const spread = 0.000002;

      const bids: OrderBookEntry[] = [];
      const asks: OrderBookEntry[] = [];

      // Generate bids (buy orders) - below current price
      for (let i = 0; i < 15; i++) {
        const price = basePrice - (i + 1) * 0.000001;
        const size = Math.random() * 1000 + 100;
        bids.push({
          price,
          size,
          total: bids.reduce((sum, bid) => sum + bid.size, 0) + size
        });
      }

      // Generate asks (sell orders) - above current price
      for (let i = 0; i < 15; i++) {
        const price = basePrice + spread + i * 0.000001;
        const size = Math.random() * 1000 + 100;
        asks.push({
          price,
          size,
          total: asks.reduce((sum, ask) => sum + ask.size, 0) + size
        });
      }

      return {
        bids: bids.reverse(), // Show highest bids first
        asks,
        spread,
        spreadPercentage: (spread / basePrice) * 100
      };
    };

    const loadOrderBook = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrderBook(generateMockOrderBook());
      setIsLoading(false);
    };

    loadOrderBook();

    // Update order book every 5 seconds
    const interval = setInterval(loadOrderBook, 5000);
    return () => clearInterval(interval);
  }, [tokenAddress]);

  const formatPrice = (price: number) => {
    return price.toFixed(6);
  };

  const formatSize = (size: number) => {
    return size.toFixed(2);
  };

  const getPriceColor = (price: number, type: 'bid' | 'ask') => {
    if (!orderBook) return '';
    const midPrice = (orderBook.bids[0]?.price + orderBook.asks[0]?.price) / 2;
    const deviation = Math.abs(price - midPrice) / midPrice;

    if (deviation < 0.001) return 'text-yellow-400';
    if (deviation < 0.005) return type === 'bid' ? 'text-green-400' : 'text-red-400';
    return type === 'bid' ? 'text-green-300' : 'text-red-300';
  };

  if (isLoading) {
    return (
      <Card className={`glass-card ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg font-bold">📊 Order Book</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-glass-pulse text-2xl mr-2">⚡</div>
            <span>Loading order book...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!orderBook) {
    return (
      <Card className={`glass-card ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg font-bold">📊 Order Book</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-foreground-secondary">
            Unable to load order book
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-bold">📊 Order Book</CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-foreground-secondary">Spread: </span>
            <span className="font-semibold text-primary">
              {formatPrice(orderBook.spread)}
            </span>
          </div>
          <div>
            <span className="text-foreground-secondary">Spread %: </span>
            <span className="font-semibold text-secondary">
              {orderBook.spreadPercentage.toFixed(3)}%
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {/* Bids (Buy Orders) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                BIDS
              </Badge>
              <span className="text-xs text-foreground/50">Buy Orders</span>
            </div>

            <div className="space-y-1 max-h-80 overflow-y-auto">
              {orderBook.bids.map((bid, index) => (
                <div
                  key={`bid-${index}`}
                  className="flex justify-between items-center py-1 px-2 rounded hover:bg-green-500/10 transition-colors cursor-pointer"
                >
                  <span className={`font-mono text-sm ${getPriceColor(bid.price, 'bid')}`}>
                    {formatPrice(bid.price)}
                  </span>
                  <span className="font-mono text-sm text-foreground/70">
                    {formatSize(bid.size)}
                  </span>
                  <span className="font-mono text-xs text-foreground/50">
                    {formatSize(bid.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Asks (Sell Orders) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                ASKS
              </Badge>
              <span className="text-xs text-foreground/50">Sell Orders</span>
            </div>

            <div className="space-y-1 max-h-80 overflow-y-auto">
              {orderBook.asks.map((ask, index) => (
                <div
                  key={`ask-${index}`}
                  className="flex justify-between items-center py-1 px-2 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <span className={`font-mono text-sm ${getPriceColor(ask.price, 'ask')}`}>
                    {formatPrice(ask.price)}
                  </span>
                  <span className="font-mono text-sm text-foreground/70">
                    {formatSize(ask.size)}
                  </span>
                  <span className="font-mono text-xs text-foreground/50">
                    {formatSize(ask.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Book Visualization */}
        <div className="px-6 pb-6">
          <div className="text-xs text-foreground/50 mb-2">Depth Visualization</div>
          <div className="relative h-20 bg-card-bg/50 rounded overflow-hidden">
            {/* Bid depth (green) */}
            <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-green-500/20 to-green-500/5"
                 style={{ width: '45%' }} />

            {/* Ask depth (red) */}
            <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-red-500/20 to-red-500/5"
                 style={{ width: '45%' }} />

            {/* Spread indicator */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/50 transform -translate-x-0.5" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-foreground/70 font-mono">
                Spread: {formatPrice(orderBook.spread)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}