'use client';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { APP_CONFIG } from '../../lib/constants';
import Link from 'next/link';

export default function DocsPage() {
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
              Documentation
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Comprehensive guides and resources for {APP_CONFIG.fullName} platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Getting Started */}
            <div className="glass-card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Getting Started</h3>
              <p className="text-foreground-secondary mb-4">
                Learn the basics of {APP_CONFIG.fullName} and how to get started with trading.
              </p>
              <Link href="#getting-started" className="text-primary hover:text-primary-light transition-colors">
                Read Guide →
              </Link>
            </div>

            {/* Trading Guide */}
            <div className="glass-card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Trading Guide</h3>
              <p className="text-foreground-secondary mb-4">
                Master perpetual futures trading with our comprehensive trading guides.
              </p>
              <Link href="#trading" className="text-primary hover:text-primary-light transition-colors">
                Read Guide →
              </Link>
            </div>

            {/* API Reference */}
            <div className="glass-card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">API Reference</h3>
              <p className="text-foreground-secondary mb-4">
                Integrate with {APP_CONFIG.fullName} using our REST and WebSocket APIs.
              </p>
              <Link href="/api" className="text-primary hover:text-primary-light transition-colors">
                View API →
              </Link>
            </div>
          </div>

          <div className="glass-card p-8 space-y-8">
            <section id="getting-started">
              <h2 className="text-3xl font-bold text-primary mb-6">Getting Started</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">1. Connect Your Wallet</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Connect your Solana-compatible wallet to start trading. We support Phantom, Solflare, and other popular wallets.
                    Make sure you have SOL in your wallet for transaction fees.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">2. Deposit USDC</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Deposit USDC to your trading account. This will be used as collateral for your positions.
                    You can deposit from exchanges or bridge from other chains.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">3. Start Trading</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Choose a token pair, set your leverage, and place your order. Monitor your positions in real-time
                    and manage your risk with our advanced tools.
                  </p>
                </div>
              </div>
            </section>

            <section id="trading">
              <h2 className="text-3xl font-bold text-primary mb-6">Trading Fundamentals</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Perpetual Futures</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Perpetual futures are derivative contracts that allow you to speculate on the price of cryptocurrencies
                    without expiration dates. They use leverage to amplify both gains and losses.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Leverage and Margin</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Leverage allows you to control larger positions with smaller amounts of capital. However, it also
                    increases risk. Always use appropriate leverage levels based on your risk tolerance.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">Liquidation</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    If your position's value falls below the maintenance margin, it will be automatically liquidated
                    to prevent further losses. Monitor your positions closely and set stop-losses.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-primary mb-6">Advanced Features</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-primary/5 rounded-lg">
                  <h4 className="text-lg font-semibold text-primary mb-2">AI Trading Agents</h4>
                  <p className="text-foreground-secondary">
                    Automate your trading strategies with our AI-powered agents. Configure custom parameters
                    and let algorithms execute trades on your behalf.
                  </p>
                </div>

                <div className="p-6 bg-secondary/5 rounded-lg">
                  <h4 className="text-lg font-semibold text-secondary mb-2">Portfolio Analytics</h4>
                  <p className="text-foreground-secondary">
                    Track your performance with detailed analytics, P&L reports, and risk metrics.
                    Optimize your strategies based on historical data.
                  </p>
                </div>

                <div className="p-6 bg-accent/5 rounded-lg">
                  <h4 className="text-lg font-semibold text-accent mb-2">Multi-Token Support</h4>
                  <p className="text-foreground-secondary">
                    Trade multiple cryptocurrency pairs with unified liquidity and consistent trading experience.
                  </p>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg">
                  <h4 className="text-lg font-semibold text-primary mb-2">Real-time Charts</h4>
                  <p className="text-foreground-secondary">
                    Advanced charting with technical indicators, drawing tools, and real-time price feeds.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-primary mb-6">Need Help?</h2>
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex gap-4">
                <Link href="/support" className="glass-button">
                  Contact Support
                </Link>
                <Link href="/api" className="glass-button-outline">
                  API Documentation
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}