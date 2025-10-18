export interface TradingAgent {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  strategy: AgentStrategy;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  status: 'active' | 'inactive' | 'paused';
  createdAt: Date;
  lastActive: Date;
  performance: AgentPerformance;
  settings: AgentSettings;
}

export interface AgentStrategy {
  type: 'momentum' | 'mean-reversion' | 'arbitrage' | 'trend-following' | 'scalping' | 'swing';
  parameters: Record<string, any>;
  indicators: string[];
  timeframes: string[];
  tokens: string[];
}

export interface AgentPerformance {
  totalTrades: number;
  winRate: number;
  profitLoss: number;
  maxDrawdown: number;
  sharpeRatio: number;
  winStreak: number;
  lossStreak: number;
  avgTradeDuration: number;
  totalVolume: number;
  trades: Trade[];
}

export interface Trade {
  id: string;
  tokenAddress: string;
  side: 'long' | 'short';
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  entryTime: Date;
  exitTime?: Date;
  pnl?: number;
  status: 'open' | 'closed' | 'cancelled';
  strategy: string;
}

export interface AgentSettings {
  maxPositionSize: number;
  stopLoss: number;
  takeProfit: number;
  maxTradesPerDay: number;
  allowedTokens: string[];
  tradingHours: {
    start: string;
    end: string;
  };
  riskManagement: {
    maxDrawdown: number;
    maxLossPerTrade: number;
    maxLossPerDay: number;
  };
}

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  strategy: AgentStrategy;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  estimatedPerformance: {
    expectedReturn: number;
    maxDrawdown: number;
    winRate: number;
  };
  recommendedCapital: number;
}

export interface AgentSignal {
  agentId: string;
  tokenAddress: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string;
  timestamp: Date;
  price: number;
  indicators: Record<string, any>;
}

export interface AgentAnalytics {
  agentId: string;
  period: '1d' | '7d' | '30d' | '90d' | '1y';
  metrics: {
    totalReturn: number;
    annualizedReturn: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
    profitFactor: number;
    avgWin: number;
    avgLoss: number;
    largestWin: number;
    largestLoss: number;
  };
  chartData: {
    dates: string[];
    portfolioValue: number[];
    drawdown: number[];
  };
}