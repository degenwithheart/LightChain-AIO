import { AgentTemplate } from './types/agent';

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: 'momentum-trader',
    name: 'Momentum Master',
    description: 'Capitalizes on strong price movements and market momentum. Ideal for trending markets.',
    strategy: {
      type: 'momentum',
      parameters: {
        momentumPeriod: 14,
        entryThreshold: 0.02,
        exitThreshold: -0.01,
        volumeMultiplier: 1.5
      },
      indicators: ['RSI', 'MACD', 'Volume'],
      timeframes: ['5m', '15m', '1h'],
      tokens: ['SOL', 'BONK', 'RAY']
    },
    riskLevel: 'high',
    estimatedPerformance: {
      expectedReturn: 0.25,
      maxDrawdown: 0.15,
      winRate: 0.65
    },
    recommendedCapital: 1000
  },
  {
    id: 'mean-reversion',
    name: 'Reversion Pro',
    description: 'Trades against extreme price movements, buying lows and selling highs.',
    strategy: {
      type: 'mean-reversion',
      parameters: {
        lookbackPeriod: 20,
        deviationThreshold: 2.0,
        meanType: 'sma',
        maxHoldTime: 1440 // minutes
      },
      indicators: ['Bollinger Bands', 'RSI', 'Stochastic'],
      timeframes: ['1m', '5m', '15m'],
      tokens: ['SOL', 'USDC', 'ORCA']
    },
    riskLevel: 'medium',
    estimatedPerformance: {
      expectedReturn: 0.15,
      maxDrawdown: 0.08,
      winRate: 0.70
    },
    recommendedCapital: 500
  },
  {
    id: 'arbitrage-bot',
    name: 'Arb Hunter',
    description: 'Exploits price differences across DEXs and markets for risk-free profits.',
    strategy: {
      type: 'arbitrage',
      parameters: {
        minSpread: 0.005, // 0.5%
        maxSlippage: 0.002,
        dexes: ['Raydium', 'Orca', 'Jupiter'],
        refreshInterval: 30 // seconds
      },
      indicators: ['Price Spread', 'Liquidity'],
      timeframes: ['real-time'],
      tokens: ['SOL', 'USDC', 'BONK', 'RAY']
    },
    riskLevel: 'low',
    estimatedPerformance: {
      expectedReturn: 0.08,
      maxDrawdown: 0.02,
      winRate: 0.85
    },
    recommendedCapital: 200
  },
  {
    id: 'trend-follower',
    name: 'Trend Rider',
    description: 'Follows long-term market trends using moving averages and trend indicators.',
    strategy: {
      type: 'trend-following',
      parameters: {
        fastMA: 20,
        slowMA: 50,
        trendStrength: 0.7,
        confirmationPeriod: 3
      },
      indicators: ['SMA', 'EMA', 'ADX'],
      timeframes: ['1h', '4h', '1d'],
      tokens: ['SOL', 'BONK', 'RAY', 'ORCA']
    },
    riskLevel: 'medium',
    estimatedPerformance: {
      expectedReturn: 0.18,
      maxDrawdown: 0.12,
      winRate: 0.60
    },
    recommendedCapital: 750
  },
  {
    id: 'scalper',
    name: 'Micro Scalper',
    description: 'Makes frequent small trades capturing tiny price movements throughout the day.',
    strategy: {
      type: 'scalping',
      parameters: {
        targetProfit: 0.001, // 0.1%
        stopLoss: 0.002, // 0.2%
        maxHoldTime: 300, // 5 minutes
        minVolume: 10000
      },
      indicators: ['Tick Volume', 'Price Action', 'Order Flow'],
      timeframes: ['1m', '30s'],
      tokens: ['SOL', 'USDC']
    },
    riskLevel: 'extreme',
    estimatedPerformance: {
      expectedReturn: 0.35,
      maxDrawdown: 0.25,
      winRate: 0.75
    },
    recommendedCapital: 2000
  }
];

export const RISK_LEVEL_COLORS = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-orange-400',
  extreme: 'text-red-400'
};

export const STRATEGY_ICONS = {
  momentum: '📈',
  'mean-reversion': '🔄',
  arbitrage: '⚖️',
  'trend-following': '📊',
  scalping: '⚡',
  swing: '🎯'
};