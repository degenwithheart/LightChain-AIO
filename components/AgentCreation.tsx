'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { AGENT_TEMPLATES, RISK_LEVEL_COLORS, STRATEGY_ICONS } from '../lib/agent-templates';
import { AgentTemplate, TradingAgent, AgentSettings } from '../lib/types/agent';
import { useWallet } from '@solana/wallet-adapter-react';

interface AgentCreationProps {
  onAgentCreated: (agent: TradingAgent) => void;
  onClose: () => void;
}

export function AgentCreation({ onAgentCreated, onClose }: AgentCreationProps) {
  const { publicKey } = useWallet();
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [customName, setCustomName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high' | 'extreme'>('medium');
  const [capital, setCapital] = useState([1000]);

  const handleTemplateSelect = (template: AgentTemplate) => {
    setSelectedTemplate(template);
    setCustomName(`${template.name} - ${Date.now().toString().slice(-4)}`);
    setCustomDescription(template.description);
    setRiskLevel(template.riskLevel);
    setCapital([template.recommendedCapital]);
  };

  const handleCreateAgent = () => {
    if (!selectedTemplate || !publicKey) return;

    const newAgent: TradingAgent = {
      id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: customName || selectedTemplate.name,
      description: customDescription || selectedTemplate.description,
      strategy: selectedTemplate.strategy,
      riskLevel,
      status: 'active',
      createdAt: new Date(),
      lastActive: new Date(),
      performance: {
        totalTrades: 0,
        winRate: 0,
        profitLoss: 0,
        maxDrawdown: 0,
        sharpeRatio: 0,
        winStreak: 0,
        lossStreak: 0,
        avgTradeDuration: 0,
        totalVolume: 0,
        trades: []
      },
      settings: {
        maxPositionSize: capital[0] * 0.1,
        stopLoss: riskLevel === 'low' ? 0.02 : riskLevel === 'medium' ? 0.05 : riskLevel === 'high' ? 0.10 : 0.15,
        takeProfit: riskLevel === 'low' ? 0.05 : riskLevel === 'medium' ? 0.10 : riskLevel === 'high' ? 0.20 : 0.30,
        maxTradesPerDay: riskLevel === 'low' ? 5 : riskLevel === 'medium' ? 10 : riskLevel === 'high' ? 20 : 50,
        allowedTokens: selectedTemplate.strategy.tokens,
        tradingHours: {
          start: '00:00',
          end: '23:59'
        },
        riskManagement: {
          maxDrawdown: riskLevel === 'low' ? 0.05 : riskLevel === 'medium' ? 0.10 : riskLevel === 'high' ? 0.20 : 0.30,
          maxLossPerTrade: capital[0] * 0.01,
          maxLossPerDay: capital[0] * 0.05
        }
      }
    };

    onAgentCreated(newAgent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              🤖 Create AI Trading Agent
            </CardTitle>
            <CardDescription className="text-foreground-secondary">
              Choose a strategy template and customize your AI trading agent
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Template Selection */}
            <div>
              <Label className="text-lg font-semibold mb-4 block">Choose Strategy Template</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AGENT_TEMPLATES.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedTemplate?.id === template.id
                        ? 'border-primary shadow-[0_0_20px_rgba(255,51,102,0.5)]'
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{STRATEGY_ICONS[template.strategy.type]}</span>
                        <h3 className="font-bold text-lg">{template.name}</h3>
                      </div>
                      <p className="text-sm text-foreground/70 mb-3">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={`${RISK_LEVEL_COLORS[template.riskLevel]} border-current`}>
                          {template.riskLevel.toUpperCase()} RISK
                        </Badge>
                        <span className="text-sm font-semibold text-green-400">
                          ~{Math.round(template.estimatedPerformance.expectedReturn * 100)}% APY
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedTemplate && (
              <>
                {/* Agent Customization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="agent-name">Agent Name</Label>
                      <Input
                        id="agent-name"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="Enter agent name"
                        className="glass-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="agent-description">Description</Label>
                      <Input
                        id="agent-description"
                        value={customDescription}
                        onChange={(e) => setCustomDescription(e.target.value)}
                        placeholder="Enter agent description"
                        className="glass-input"
                      />
                    </div>

                    <div>
                      <Label>Risk Level</Label>
                      <Select value={riskLevel} onVolumeChange={(value: any) => setRiskLevel(value)}>
                        <SelectTrigger className="glass-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Risk</SelectItem>
                          <SelectItem value="medium">Medium Risk</SelectItem>
                          <SelectItem value="high">High Risk</SelectItem>
                          <SelectItem value="extreme">Extreme Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Initial Capital (USDC)</Label>
                      <div className="px-3 py-2">
                        <Slider
                          value={capital}
                          onValueChange={setCapital}
                          max={10000}
                          min={100}
                          step={100}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-foreground/70 mt-1">
                          <span>$100</span>
                          <span className="font-bold text-primary">${capital[0]}</span>
                          <span>$10,000</span>
                        </div>
                      </div>
                    </div>

                    {/* Strategy Preview */}
                    <div>
                      <Label>Strategy Details</Label>
                      <Card className="bg-card-bg/50 border-primary/20">
                        <CardContent className="p-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Type:</span>
                              <span className="font-semibold">{selectedTemplate.strategy.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Indicators:</span>
                              <span>{selectedTemplate.strategy.indicators.join(', ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Timeframes:</span>
                              <span>{selectedTemplate.strategy.timeframes.join(', ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Expected Return:</span>
                              <span className="text-green-400">
                                {Math.round(selectedTemplate.estimatedPerformance.expectedReturn * 100)}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-glass-border">
                  <Button onClick={handleCreateAgent} className="glass-button flex-1">
                    🚀 Launch Agent
                  </Button>
                  <Button onClick={onClose} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}