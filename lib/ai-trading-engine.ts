import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TradingAgent, Trade, AgentSignal } from './types/agent';

export class AITradingEngine {
  private connection: Connection;
  private agents: Map<string, TradingAgent> = new Map();

  constructor(rpcUrl: string = 'https://api.mainnet-beta.solana.com') {
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  // Register an agent with the engine
  registerAgent(agent: TradingAgent) {
    this.agents.set(agent.id, agent);
  }

  // Unregister an agent
  unregisterAgent(agentId: string) {
    this.agents.delete(agentId);
  }

  // Get trading signal for an agent
  async getTradingSignal(agentId: string, tokenAddress: string): Promise<AgentSignal | null> {
    const agent = this.agents.get(agentId);
    if (!agent || agent.status !== 'active') return null;

    try {
      const signal = await this.analyzeMarket(agent, tokenAddress);
      return signal;
    } catch (error) {
      console.error(`Error getting signal for agent ${agentId}:`, error);
      return null;
    }
  }

  // Analyze market conditions for a specific agent and token
  private async analyzeMarket(agent: TradingAgent, tokenAddress: string): Promise<AgentSignal> {
    const indicators = await this.calculateIndicators(tokenAddress, agent.strategy.parameters);
    const signal = this.generateSignal(agent, indicators);

    return {
      agentId: agent.id,
      tokenAddress,
      action: signal.action,
      confidence: signal.confidence,
      reasoning: signal.reasoning,
      timestamp: new Date(),
      price: indicators.currentPrice,
      indicators
    };
  }

  // Calculate technical indicators
  private async calculateIndicators(tokenAddress: string, parameters: any) {
    // This would integrate with price feeds and calculate indicators
    // For now, return mock data
    const mockPrice = 0.001 + (Math.random() - 0.5) * 0.0001;

    return {
      currentPrice: mockPrice,
      rsi: 45 + Math.random() * 20,
      macd: {
        value: (Math.random() - 0.5) * 0.00001,
        signal: (Math.random() - 0.5) * 0.00001,
        histogram: (Math.random() - 0.5) * 0.000005
      },
      bollingerBands: {
        upper: mockPrice * 1.05,
        middle: mockPrice,
        lower: mockPrice * 0.95
      },
      volume: Math.random() * 1000000,
      priceChange24h: (Math.random() - 0.5) * 0.1
    };
  }

  // Generate trading signal based on strategy
  private generateSignal(agent: TradingAgent, indicators: any): { action: 'buy' | 'sell' | 'hold', confidence: number, reasoning: string } {
    const { strategy } = agent;

    switch (strategy.type) {
      case 'momentum':
        return this.momentumStrategy(indicators, strategy.parameters);
      case 'mean-reversion':
        return this.meanReversionStrategy(indicators, strategy.parameters);
      case 'trend-following':
        return this.trendFollowingStrategy(indicators, strategy.parameters);
      case 'scalping':
        return this.scalpingStrategy(indicators, strategy.parameters);
      default:
        return { action: 'hold', confidence: 0.5, reasoning: 'Strategy not implemented' };
    }
  }

  private momentumStrategy(indicators: any, params: any): { action: 'buy' | 'sell' | 'hold', confidence: number, reasoning: string } {
    const { rsi, priceChange24h } = indicators;
    const { momentumPeriod, entryThreshold } = params;

    if (rsi > 70 && priceChange24h > entryThreshold) {
      return {
        action: 'sell',
        confidence: Math.min((rsi - 70) / 30 + priceChange24h / entryThreshold, 1),
        reasoning: `Overbought conditions: RSI ${rsi.toFixed(2)}, 24h change ${(priceChange24h * 100).toFixed(2)}%`
      };
    } else if (rsi < 30 && priceChange24h < -entryThreshold) {
      return {
        action: 'buy',
        confidence: Math.min((30 - rsi) / 30 + Math.abs(priceChange24h) / entryThreshold, 1),
        reasoning: `Oversold conditions: RSI ${rsi.toFixed(2)}, 24h change ${(priceChange24h * 100).toFixed(2)}%`
      };
    }

    return { action: 'hold', confidence: 0.5, reasoning: 'Neutral momentum conditions' };
  }

  private meanReversionStrategy(indicators: any, params: any): { action: 'buy' | 'sell' | 'hold', confidence: number, reasoning: string } {
    const { currentPrice, bollingerBands } = indicators;
    const { deviationThreshold } = params;

    const upperDeviation = (currentPrice - bollingerBands.upper) / bollingerBands.upper;
    const lowerDeviation = (bollingerBands.lower - currentPrice) / bollingerBands.lower;

    if (upperDeviation > deviationThreshold) {
      return {
        action: 'sell',
        confidence: Math.min(upperDeviation / (deviationThreshold * 2), 1),
        reasoning: `Price above upper Bollinger Band by ${(upperDeviation * 100).toFixed(2)}%`
      };
    } else if (lowerDeviation > deviationThreshold) {
      return {
        action: 'buy',
        confidence: Math.min(lowerDeviation / (deviationThreshold * 2), 1),
        reasoning: `Price below lower Bollinger Band by ${(lowerDeviation * 100).toFixed(2)}%`
      };
    }

    return { action: 'hold', confidence: 0.5, reasoning: 'Price within normal range' };
  }

  private trendFollowingStrategy(indicators: any, params: any): { action: 'buy' | 'sell' | 'hold', confidence: number, reasoning: string } {
    const { macd, priceChange24h } = indicators;
    const { trendStrength } = params;

    if (macd.value > macd.signal && macd.histogram > 0 && priceChange24h > trendStrength) {
      return {
        action: 'buy',
        confidence: Math.min(Math.abs(macd.histogram) * 1000 + priceChange24h / trendStrength, 1),
        reasoning: `Bullish trend: MACD crossover, histogram positive, 24h change ${(priceChange24h * 100).toFixed(2)}%`
      };
    } else if (macd.value < macd.signal && macd.histogram < 0 && priceChange24h < -trendStrength) {
      return {
        action: 'sell',
        confidence: Math.min(Math.abs(macd.histogram) * 1000 + Math.abs(priceChange24h) / trendStrength, 1),
        reasoning: `Bearish trend: MACD crossover, histogram negative, 24h change ${(priceChange24h * 100).toFixed(2)}%`
      };
    }

    return { action: 'hold', confidence: 0.5, reasoning: 'No clear trend direction' };
  }

  private scalpingStrategy(indicators: any, params: any): { action: 'buy' | 'sell' | 'hold', confidence: number, reasoning: string } {
    const { volume, priceChange24h } = indicators;
    const { targetProfit, minVolume } = params;

    if (volume > minVolume && Math.abs(priceChange24h) > targetProfit) {
      const action = priceChange24h > 0 ? 'sell' : 'buy';
      return {
        action,
        confidence: Math.min(Math.abs(priceChange24h) / (targetProfit * 2), 1),
        reasoning: `${action === 'sell' ? 'Profit-taking' : 'Buying dip'}: Volume ${volume.toLocaleString()}, price change ${(priceChange24h * 100).toFixed(2)}%`
      };
    }

    return { action: 'hold', confidence: 0.3, reasoning: 'Waiting for scalping opportunity' };
  }

  // Execute a trade for an agent
  async executeTrade(agentId: string, trade: Omit<Trade, 'id' | 'entryTime' | 'status'>): Promise<Trade | null> {
    const agent = this.agents.get(agentId);
    if (!agent) return null;

    try {
      // In a real implementation, this would execute the trade on DEX
      const executedTrade: Trade = {
        id: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...trade,
        entryTime: new Date(),
        status: 'open'
      };

      // Update agent performance
      this.updateAgentPerformance(agent, executedTrade);

      return executedTrade;
    } catch (error) {
      console.error(`Error executing trade for agent ${agentId}:`, error);
      return null;
    }
  }

  // Update agent performance after a trade
  private updateAgentPerformance(agent: TradingAgent, trade: Trade) {
    agent.performance.totalTrades += 1;
    agent.performance.totalVolume += trade.quantity * trade.entryPrice;

    if (trade.status === 'closed' && trade.pnl !== undefined) {
      if (trade.pnl > 0) {
        agent.performance.winStreak += 1;
        agent.performance.lossStreak = 0;
      } else {
        agent.performance.lossStreak += 1;
        agent.performance.winStreak = 0;
      }

      agent.performance.profitLoss += trade.pnl;
      agent.performance.winRate = (agent.performance.totalTrades - agent.performance.lossStreak) / agent.performance.totalTrades;
    }

    agent.lastActive = new Date();
  }

  // Get agent performance analytics
  getAgentAnalytics(agentId: string, period: '1d' | '7d' | '30d' | '90d' | '1y' = '30d') {
    const agent = this.agents.get(agentId);
    if (!agent) return null;

    // Calculate period-specific metrics
    const periodTrades = agent.performance.trades.filter(trade => {
      const tradeDate = new Date(trade.entryTime);
      const now = new Date();
      const periodMs = {
        '1d': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000,
        '90d': 90 * 24 * 60 * 60 * 1000,
        '1y': 365 * 24 * 60 * 60 * 1000
      }[period];

      return now.getTime() - tradeDate.getTime() <= periodMs;
    });

    const periodPnL = periodTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    const winningTrades = periodTrades.filter(trade => (trade.pnl || 0) > 0);

    return {
      agentId,
      period,
      metrics: {
        totalReturn: periodPnL,
        annualizedReturn: periodPnL * (365 / (period === '1y' ? 365 : parseInt(period))) / agent.settings.maxPositionSize,
        volatility: this.calculateVolatility(periodTrades),
        sharpeRatio: this.calculateSharpeRatio(periodTrades, periodPnL),
        maxDrawdown: this.calculateMaxDrawdown(periodTrades),
        winRate: winningTrades.length / Math.max(periodTrades.length, 1),
        profitFactor: this.calculateProfitFactor(periodTrades),
        avgWin: winningTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0) / Math.max(winningTrades.length, 1),
        avgLoss: periodTrades.filter(trade => (trade.pnl || 0) < 0).reduce((sum, trade) => sum + (trade.pnl || 0), 0) / Math.max(periodTrades.filter(trade => (trade.pnl || 0) < 0).length, 1),
        largestWin: Math.max(...winningTrades.map(trade => trade.pnl || 0), 0),
        largestLoss: Math.min(...periodTrades.filter(trade => (trade.pnl || 0) < 0).map(trade => trade.pnl || 0), 0)
      },
      chartData: {
        dates: [], // Would be populated with actual date ranges
        portfolioValue: [], // Would be populated with portfolio values over time
        drawdown: [] // Would be populated with drawdown values
      }
    };
  }

  private calculateVolatility(trades: Trade[]): number {
    if (trades.length < 2) return 0;
    const returns = trades.map(trade => trade.pnl || 0);
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
  }

  private calculateSharpeRatio(trades: Trade[], totalReturn: number): number {
    const volatility = this.calculateVolatility(trades);
    const riskFreeRate = 0.02; // 2% annual risk-free rate
    const annualizedReturn = totalReturn * (365 / 30); // Assuming 30-day period
    return volatility > 0 ? (annualizedReturn - riskFreeRate) / volatility : 0;
  }

  private calculateMaxDrawdown(trades: Trade[]): number {
    let peak = 0;
    let maxDrawdown = 0;
    let runningTotal = 0;

    for (const trade of trades) {
      runningTotal += trade.pnl || 0;
      if (runningTotal > peak) {
        peak = runningTotal;
      }
      const drawdown = peak - runningTotal;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    return maxDrawdown;
  }

  private calculateProfitFactor(trades: Trade[]): number {
    const grossProfit = trades.filter(trade => (trade.pnl || 0) > 0).reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    const grossLoss = Math.abs(trades.filter(trade => (trade.pnl || 0) < 0).reduce((sum, trade) => sum + (trade.pnl || 0), 0));
    return grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;
  }
}

// Singleton instance
export const aiTradingEngine = new AITradingEngine();