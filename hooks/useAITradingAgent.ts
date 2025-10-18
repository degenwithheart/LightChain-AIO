import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { TradingAgent, AgentSignal, Trade } from '../lib/types/agent';
import { aiTradingEngine } from '../lib/ai-trading-engine';

export function useAITradingAgent(agent: TradingAgent | null) {
  const { publicKey, signTransaction } = useWallet();
  const [isActive, setIsActive] = useState(agent?.status === 'active');
  const [currentSignal, setCurrentSignal] = useState<AgentSignal | null>(null);
  const [lastTrade, setLastTrade] = useState<Trade | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Register/unregister agent with the engine
  useEffect(() => {
    if (agent && publicKey) {
      aiTradingEngine.registerAgent(agent);
      setIsActive(agent.status === 'active');

      return () => {
        aiTradingEngine.unregisterAgent(agent.id);
      };
    }
  }, [agent, publicKey]);

  // Analyze market and get trading signals
  const analyzeMarket = useCallback(async (tokenAddress: string) => {
    if (!agent || !isActive || !publicKey) return null;

    setIsAnalyzing(true);
    try {
      const signal = await aiTradingEngine.getTradingSignal(agent.id, tokenAddress);
      setCurrentSignal(signal);
      return signal;
    } catch (error) {
      console.error('Error analyzing market:', error);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [agent, isActive, publicKey]);

  // Execute a trade based on signal
  const executeTrade = useCallback(async (
    tokenAddress: string,
    side: 'long' | 'short',
    quantity: number,
    price: number
  ) => {
    if (!agent || !currentSignal || !publicKey) return null;

    try {
      const trade = await aiTradingEngine.executeTrade(agent.id, {
        tokenAddress,
        side,
        entryPrice: price,
        quantity,
        strategy: agent.strategy.type
      });

      if (trade) {
        setLastTrade(trade);
        setCurrentSignal(null); // Clear signal after execution
      }

      return trade;
    } catch (error) {
      console.error('Error executing trade:', error);
      return null;
    }
  }, [agent, currentSignal, publicKey]);

  // Get agent performance analytics
  const getAnalytics = useCallback((period: '1d' | '7d' | '30d' | '90d' | '1y' = '30d') => {
    if (!agent) return null;
    return aiTradingEngine.getAgentAnalytics(agent.id, period);
  }, [agent]);

  // Auto-trading loop (would run in background)
  const startAutoTrading = useCallback(() => {
    if (!agent || !isActive) return;

    const tradingInterval = setInterval(async () => {
      if (!isActive) {
        clearInterval(tradingInterval);
        return;
      }

      // Analyze each allowed token
      for (const tokenAddress of agent.settings.allowedTokens) {
        const signal = await analyzeMarket(tokenAddress);

        if (signal && signal.confidence > 0.7) { // Only trade on high confidence signals
          const side = signal.action === 'buy' ? 'long' : 'short';
          const quantity = Math.min(
            agent.settings.maxPositionSize / signal.price,
            agent.settings.maxPositionSize * 0.1 // Max 10% of capital per trade
          );

          await executeTrade(tokenAddress, side, quantity, signal.price);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(tradingInterval);
  }, [agent, isActive, analyzeMarket, executeTrade]);

  // Manual trade execution
  const executeManualTrade = useCallback(async (
    tokenAddress: string,
    side: 'long' | 'short',
    quantity: number
  ) => {
    if (!agent || !publicKey) return null;

    // Get current price (in real implementation, this would come from price feed)
    const currentPrice = 0.001; // Mock price

    return await executeTrade(tokenAddress, side, quantity, currentPrice);
  }, [agent, publicKey, executeTrade]);

  return {
    isActive,
    currentSignal,
    lastTrade,
    isAnalyzing,
    analyzeMarket,
    executeTrade: executeManualTrade,
    getAnalytics,
    startAutoTrading,
    setIsActive: (active: boolean) => setIsActive(active)
  };
}

// Hook for managing multiple agents
export function useAIAgents() {
  const { publicKey } = useWallet();
  const [agents, setAgents] = useState<TradingAgent[]>([]);

  // Load agents from storage
  useEffect(() => {
    if (publicKey) {
      const stored = localStorage.getItem(`agents_${publicKey.toString()}`);
      if (stored) {
        const parsedAgents = JSON.parse(stored);
        setAgents(parsedAgents);

        // Register all active agents with the engine
        parsedAgents.forEach((agent: TradingAgent) => {
          if (agent.status === 'active') {
            aiTradingEngine.registerAgent(agent);
          }
        });
      }
    }
  }, [publicKey]);

  // Save agents to storage
  const saveAgents = useCallback((newAgents: TradingAgent[]) => {
    if (publicKey) {
      localStorage.setItem(`agents_${publicKey.toString()}`, JSON.stringify(newAgents));
      setAgents(newAgents);
    }
  }, [publicKey]);

  // Add new agent
  const addAgent = useCallback((agent: TradingAgent) => {
    const newAgents = [...agents, agent];
    saveAgents(newAgents);

    if (agent.status === 'active') {
      aiTradingEngine.registerAgent(agent);
    }
  }, [agents, saveAgents]);

  // Update agent
  const updateAgent = useCallback((updatedAgent: TradingAgent) => {
    const newAgents = agents.map(agent =>
      agent.id === updatedAgent.id ? updatedAgent : agent
    );
    saveAgents(newAgents);

    // Update registration with engine
    if (updatedAgent.status === 'active') {
      aiTradingEngine.registerAgent(updatedAgent);
    } else {
      aiTradingEngine.unregisterAgent(updatedAgent.id);
    }
  }, [agents, saveAgents]);

  // Remove agent
  const removeAgent = useCallback((agentId: string) => {
    const newAgents = agents.filter(agent => agent.id !== agentId);
    saveAgents(newAgents);
    aiTradingEngine.unregisterAgent(agentId);
  }, [agents, saveAgents]);

  // Get agent by ID
  const getAgent = useCallback((agentId: string) => {
    return agents.find(agent => agent.id === agentId) || null;
  }, [agents]);

  return {
    agents,
    addAgent,
    updateAgent,
    removeAgent,
    getAgent
  };
}