'use client';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { APP_CONFIG } from '../../lib/constants';

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main 
        className="container mx-auto px-4 py-8 pt-16"
        style={{ 
          minHeight: `clamp(${APP_CONFIG.ui.minContentHeight.mobile}, 50vh, ${APP_CONFIG.ui.minContentHeight.desktop})`
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent mb-4">
              API Reference
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Integrate with {APP_CONFIG.fullName} using our comprehensive REST and WebSocket APIs.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold text-blue-500">API Status</h2>
              </div>
              <p className="text-blue-600">
                <strong>Base URL:</strong> {APP_CONFIG.api.baseUrl}
              </p>
              <p className="text-blue-600">
                <strong>Status:</strong> <span className="text-green-500">Operational</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">REST API</div>
                <p className="text-foreground-secondary">HTTP endpoints for trading operations</p>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-2">WebSocket</div>
                <p className="text-foreground-secondary">Real-time market data and updates</p>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">SDK</div>
                <p className="text-foreground-secondary">JavaScript/TypeScript SDK</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Authentication */}
            <section className="glass-card p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">Authentication</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">API Key</h3>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    All API requests require authentication using an API key. Include your API key in the request header.
                  </p>
                  <div className="bg-card-bg p-4 rounded-lg font-mono text-sm">
                    <div className="text-foreground-secondary mb-2">Header:</div>
                    <div className="text-primary">X-API-Key: your_api_key_here</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Wallet Signature</h3>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    Trading operations require wallet signature authentication for security.
                  </p>
                  <div className="bg-card-bg p-4 rounded-lg font-mono text-sm">
                    <div className="text-foreground-secondary mb-2">Headers:</div>
                    <div className="text-primary">X-Wallet-Address: your_wallet_address</div>
                    <div className="text-primary">X-Signature: signed_message_signature</div>
                  </div>
                </div>
              </div>
            </section>

            {/* REST API Endpoints */}
            <section className="glass-card p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">REST API Endpoints</h2>

              <div className="space-y-6">
                {/* Markets */}
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Markets</h3>
                  <div className="space-y-4">
                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-500/20 text-green-600 rounded text-xs font-mono">GET</span>
                        <code className="text-primary">/api/v1/markets</code>
                      </div>
                      <p className="text-foreground-secondary text-sm">Get all available trading pairs and market information</p>
                    </div>

                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-500/20 text-green-600 rounded text-xs font-mono">GET</span>
                        <code className="text-primary">/api/v1/markets/{'{tokenAddress}'}</code>
                      </div>
                      <p className="text-foreground-secondary text-sm">Get specific market data for a token</p>
                    </div>
                  </div>
                </div>

                {/* Orders */}
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Orders</h3>
                  <div className="space-y-4">
                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-600 rounded text-xs font-mono">POST</span>
                        <code className="text-primary">/api/v1/orders</code>
                      </div>
                      <p className="text-foreground-secondary text-sm">Place a new order</p>
                    </div>

                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-500/20 text-green-600 rounded text-xs font-mono">GET</span>
                        <code className="text-primary">/api/v1/orders</code>
                      </div>
                      <p className="text-foreground-secondary text-sm">Get user's orders</p>
                    </div>

                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-red-500/20 text-red-600 rounded text-xs font-mono">DELETE</span>
                        <code className="text-primary">/api/v1/orders/{'{orderId}'}</code>
                      </div>
                      <p className="text-foreground-secondary text-sm">Cancel an order</p>
                    </div>
                  </div>
                </div>

                {/* Positions */}
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Positions</h3>
                  <div className="space-y-4">
                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-500/20 text-green-600 rounded text-xs font-mono">GET</span>
                        <code className="text-primary">/api/v1/positions</code>
                      </div>
                      <p className="text-foreground-secondary text-sm">Get user's positions</p>
                    </div>

                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-red-500/20 text-red-600 rounded text-xs font-mono">DELETE</span>
                        <code className="text-primary">/api/v1/positions/{'{positionId}'}</code>
                      </div>
                      <p className="text-foreground-secondary text-sm">Close a position</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WebSocket API */}
            <section className="glass-card p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">WebSocket API</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Connection</h3>
                  <div className="bg-card-bg p-4 rounded-lg font-mono text-sm mb-4">
                    <div className="text-foreground-secondary mb-2">WebSocket URL:</div>
                    <div className="text-primary">wss://api.lightchain.solana/ws</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Market Data</h3>
                  <div className="space-y-4">
                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="font-mono text-sm mb-2">
                        <span className="text-blue-500">Subscribe:</span> {"{"}"type": "subscribe", "channel": "ticker", "symbol": "SOL-USDC"{"}"}
                      </div>
                      <p className="text-foreground-secondary text-sm">Subscribe to real-time ticker data</p>
                    </div>

                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="font-mono text-sm mb-2">
                        <span className="text-blue-500">Subscribe:</span> {"{"}"type": "subscribe", "channel": "orderbook", "symbol": "SOL-USDC"{"}"}
                      </div>
                      <p className="text-foreground-secondary text-sm">Subscribe to order book updates</p>
                    </div>

                    <div className="border border-glass-border rounded-lg p-4">
                      <div className="font-mono text-sm mb-2">
                        <span className="text-blue-500">Subscribe:</span> {"{"}"type": "subscribe", "channel": "trades", "symbol": "SOL-USDC"{"}"}
                      </div>
                      <p className="text-foreground-secondary text-sm">Subscribe to trade updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Rate Limits */}
            <section className="glass-card p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">Rate Limits</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">REST API</h3>
                  <ul className="space-y-2 text-foreground-secondary">
                    <li><strong>Public endpoints:</strong> 10 requests/second</li>
                    <li><strong>Private endpoints:</strong> 5 requests/second</li>
                    <li><strong>Order placement:</strong> 2 requests/second</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">WebSocket</h3>
                  <ul className="space-y-2 text-foreground-secondary">
                    <li><strong>Connection limit:</strong> 10 concurrent connections</li>
                    <li><strong>Subscription limit:</strong> 50 subscriptions/connection</li>
                    <li><strong>Message rate:</strong> 100 messages/second</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SDK */}
            <section className="glass-card p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">SDK</h2>

              <div className="space-y-6">
                <p className="text-foreground-secondary leading-relaxed">
                  Our JavaScript/TypeScript SDK provides a convenient way to interact with the {APP_CONFIG.fullName} API.
                </p>

                <div className="bg-card-bg p-4 rounded-lg font-mono text-sm">
                  <div className="text-foreground-secondary mb-2">Installation:</div>
                  <div className="text-primary">npm install @lightchain/solana-sdk</div>
                </div>

                <div className="bg-card-bg p-4 rounded-lg font-mono text-sm">
                  <div className="text-foreground-secondary mb-2">Usage:</div>
                  <pre className="text-primary overflow-x-auto">
{`import { LightChainClient } from '@lightchain/solana-sdk';

const client = new LightChainClient({
  apiKey: 'your_api_key',
  wallet: yourWallet
});

// Place an order
await client.placeOrder({
  symbol: 'SOL-USDC',
  side: 'buy',
  type: 'market',
  quantity: 1,
  leverage: 5
});`}
                  </pre>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}