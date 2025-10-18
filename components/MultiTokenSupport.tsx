'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

interface MultiTokenTrade {
  tokenAddress: string;
  action: 'buy' | 'sell';
  amount: number;
  limitPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
}

interface MultiTokenSupportProps {
  onExecuteTrades: (trades: MultiTokenTrade[]) => void;
  className?: string;
}

export function MultiTokenSupport({ onExecuteTrades, className }: MultiTokenSupportProps) {
  const [availableTokens, setAvailableTokens] = useState<TokenInfo[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<TokenInfo[]>([]);
  const [trades, setTrades] = useState<MultiTokenTrade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock token data - in real implementation, this would fetch from CoinGecko, Jupiter, etc.
    const mockTokens: TokenInfo[] = [
      {
        address: 'So11111111111111111111111111111111111111112',
        symbol: 'SOL',
        name: 'Solana',
        price: 145.23,
        change24h: 2.34,
        volume24h: 1250000000,
        marketCap: 65000000000
      },
      {
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        symbol: 'USDC',
        name: 'USD Coin',
        price: 1.00,
        change24h: 0.01,
        volume24h: 2500000000,
        marketCap: 25000000000
      },
      {
        address: 'BONK_TOKEN_ADDRESS',
        symbol: 'BONK',
        name: 'Bonk',
        price: 0.00001234,
        change24h: -5.67,
        volume24h: 45000000,
        marketCap: 780000000
      },
      {
        address: 'RAY_TOKEN_ADDRESS',
        symbol: 'RAY',
        name: 'Raydium',
        price: 2.45,
        change24h: 8.92,
        volume24h: 89000000,
        marketCap: 245000000
      },
      {
        address: 'ORCA_TOKEN_ADDRESS',
        symbol: 'ORCA',
        name: 'Orca',
        price: 3.67,
        change24h: -2.15,
        volume24h: 67000000,
        marketCap: 189000000
      },
      {
        address: 'SAMO_TOKEN_ADDRESS',
        symbol: 'SAMO',
        name: 'Samoyedcoin',
        price: 0.0089,
        change24h: 12.45,
        volume24h: 23000000,
        marketCap: 89000000
      }
    ];

    setAvailableTokens(mockTokens);
    setIsLoading(false);
  }, []);

  const addTokenToSelection = (token: TokenInfo) => {
    if (!selectedTokens.find(t => t.address === token.address)) {
      setSelectedTokens([...selectedTokens, token]);
      setTrades([...trades, {
        tokenAddress: token.address,
        action: 'buy',
        amount: 0
      }]);
    }
  };

  const removeTokenFromSelection = (tokenAddress: string) => {
    setSelectedTokens(selectedTokens.filter(t => t.address !== tokenAddress));
    setTrades(trades.filter(t => t.tokenAddress !== tokenAddress));
  };

  const updateTrade = (tokenAddress: string, updates: Partial<MultiTokenTrade>) => {
    setTrades(trades.map(trade =>
      trade.tokenAddress === tokenAddress
        ? { ...trade, ...updates }
        : trade
    ));
  };

  const executeAllTrades = () => {
    const validTrades = trades.filter(trade => trade.amount > 0);
    if (validTrades.length > 0) {
      onExecuteTrades(validTrades);
      // Reset trades after execution
      setTrades([]);
      setSelectedTokens([]);
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(4)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(6);
    return price.toFixed(4);
  };

  if (isLoading) {
    return (
      <Card className={`glass-card ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg font-bold">🌐 Multi-Token Trading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-glass-pulse text-2xl mr-2">🔄</div>
            <span>Loading tokens...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-bold">🌐 Multi-Token Trading</CardTitle>
        <p className="text-sm text-foreground-secondary">
          Execute multiple trades across different tokens simultaneously
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Token Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Available Tokens</Label>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {availableTokens.map((token) => {
                const isSelected = selectedTokens.some(t => t.address === token.address);
                return (
                  <div
                    key={token.address}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                    onClick={() => isSelected ? removeTokenFromSelection(token.address) : addTokenToSelection(token)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">
                        {token.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold">{token.symbol}</p>
                        <p className="text-xs text-foreground/50">{token.name}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-sm">{formatPrice(token.price)}</p>
                      <p className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                      </p>
                    </div>

                    {isSelected && (
                      <Badge className="bg-primary text-primary-foreground">
                        Selected
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trade Configuration */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Trade Configuration ({selectedTokens.length} tokens)
            </Label>

            {selectedTokens.length === 0 ? (
              <div className="text-center py-8 text-foreground/50">
                Select tokens to configure trades
              </div>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {selectedTokens.map((token) => {
                  const trade = trades.find(t => t.tokenAddress === token.address);
                  if (!trade) return null;

                  return (
                    <Card key={token.address} className="bg-card-bg/50 border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{token.symbol}</span>
                            <span className="text-sm text-foreground/70">
                              {formatPrice(token.price)}
                            </span>
                          </div>
                          <Button
                            onClick={() => removeTokenFromSelection(token.address)}
                            variant="outline"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Action</Label>
                            <select
                              value={trade.action}
                              onChange={(e) => updateTrade(token.address, { action: e.target.value as 'buy' | 'sell' })}
                              className="w-full glass-input text-sm"
                            >
                              <option value="buy">Buy</option>
                              <option value="sell">Sell</option>
                            </select>
                          </div>

                          <div>
                            <Label className="text-xs">Amount (USDC)</Label>
                            <Input
                              type="number"
                              value={trade.amount || ''}
                              onChange={(e) => updateTrade(token.address, { amount: parseFloat(e.target.value) || 0 })}
                              placeholder="0.00"
                              className="glass-input text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <div>
                            <Label className="text-xs">Limit Price</Label>
                            <Input
                              type="number"
                              value={trade.limitPrice || ''}
                              onChange={(e) => updateTrade(token.address, { limitPrice: parseFloat(e.target.value) || undefined })}
                              placeholder="Optional"
                              className="glass-input text-xs"
                            />
                          </div>

                          <div>
                            <Label className="text-xs">Stop Loss</Label>
                            <Input
                              type="number"
                              value={trade.stopLoss || ''}
                              onChange={(e) => updateTrade(token.address, { stopLoss: parseFloat(e.target.value) || undefined })}
                              placeholder="Optional"
                              className="glass-input text-xs"
                            />
                          </div>

                          <div>
                            <Label className="text-xs">Take Profit</Label>
                            <Input
                              type="number"
                              value={trade.takeProfit || ''}
                              onChange={(e) => updateTrade(token.address, { takeProfit: parseFloat(e.target.value) || undefined })}
                              placeholder="Optional"
                              className="glass-input text-xs"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Execute Button */}
        {selectedTokens.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground/70">
                {trades.filter(t => t.amount > 0).length} of {selectedTokens.length} trades configured
              </div>
              <Button
                onClick={executeAllTrades}
                className="glass-button"
                disabled={trades.filter(t => t.amount > 0).length === 0}
              >
                🚀 Execute All Trades
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}