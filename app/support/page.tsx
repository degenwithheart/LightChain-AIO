'use client';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { APP_CONFIG } from '../../lib/constants';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main 
        className="container mx-auto px-4 py-8 pt-16"
        style={{ 
          minHeight: `clamp(${APP_CONFIG.ui.minContentHeight.mobile}, 50vh, ${APP_CONFIG.ui.minContentHeight.desktop})`
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent mb-4">
              Support Center
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Get help with your {APP_CONFIG.fullName} experience. We're here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Support */}
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Contact Support</h3>
              <p className="text-foreground-secondary mb-4">
                Need help with trading, technical issues, or account problems? Our support team is ready to assist.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-foreground-secondary">
                  <strong>Email:</strong> {APP_CONFIG.contact.support.email}
                </p>
                <p className="text-sm text-foreground-secondary">
                  <strong>Response time:</strong> Within 24 hours
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Community</h3>
              <p className="text-foreground-secondary mb-4">
                Join our community of traders and developers. Get help from fellow users and stay updated.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-foreground-secondary">
                  <strong>Discord:</strong> {APP_CONFIG.social.discord.handle}
                </p>
                <p className="text-sm text-foreground-secondary">
                  <strong>Twitter:</strong> {APP_CONFIG.social.twitter.handle}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div className="border-b border-glass-border pb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">How do I connect my wallet?</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Click the "Connect Wallet" button in the top right corner. Choose your preferred Solana wallet
                    (Phantom, Solflare, etc.) and approve the connection. Make sure you have SOL for transaction fees.
                  </p>
                </div>

                <div className="border-b border-glass-border pb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">What is leverage and how does it work?</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Leverage allows you to control larger positions with smaller amounts of capital. For example,
                    5x leverage means you can control $5000 worth of position with $1000. However, losses are also amplified.
                  </p>
                </div>

                <div className="border-b border-glass-border pb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">What happens if my position gets liquidated?</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    If your position's value falls below the maintenance margin requirement, it will be automatically
                    closed to prevent further losses. You'll lose the margin used for that position, but liquidation
                    protects you from owing more than your initial investment.
                  </p>
                </div>

                <div className="border-b border-glass-border pb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">How do I deposit funds?</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Connect your wallet and click "Deposit" in your portfolio. You can deposit USDC directly from
                    your wallet or bridge from other chains. Deposits are instant and require only Solana network fees.
                  </p>
                </div>

                <div className="border-b border-glass-border pb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">What are the trading fees?</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    We charge 0.1% maker fee and 0.1% taker fee. There are no deposit or withdrawal fees,
                    only standard Solana network fees for transactions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">How do AI trading agents work?</h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    AI agents use predefined strategies to automatically execute trades based on market conditions.
                    You can configure parameters like leverage, risk levels, and trading pairs. Agents run 24/7
                    and can be monitored through your dashboard.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-primary mb-6">Troubleshooting</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-red-500 mb-2">Transaction Failed</h4>
                  <ul className="text-sm text-foreground-secondary space-y-1">
                    <li>• Check if you have enough SOL for fees</li>
                    <li>• Ensure your wallet is connected</li>
                    <li>• Try refreshing the page</li>
                    <li>• Contact support if issue persists</li>
                  </ul>
                </div>

                <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-yellow-500 mb-2">Slow Loading</h4>
                  <ul className="text-sm text-foreground-secondary space-y-1">
                    <li>• Check your internet connection</li>
                    <li>• Clear browser cache</li>
                    <li>• Try a different browser</li>
                    <li>• Disable VPN if using one</li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-500 mb-2">Wallet Issues</h4>
                  <ul className="text-sm text-foreground-secondary space-y-1">
                    <li>• Ensure wallet extension is installed</li>
                    <li>• Check wallet is unlocked</li>
                    <li>• Try disconnecting and reconnecting</li>
                    <li>• Verify network is set to Solana</li>
                  </ul>
                </div>

                <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-500 mb-2">Order Not Executing</h4>
                  <ul className="text-sm text-foreground-secondary space-y-1">
                    <li>• Check market conditions</li>
                    <li>• Verify sufficient balance</li>
                    <li>• Ensure order parameters are valid</li>
                    <li>• Check for network congestion</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-primary mb-6">Contact Us</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-4">Support Hours</h3>
                  <div className="space-y-2 text-foreground-secondary">
                    <p><strong>Monday - Friday:</strong> {APP_CONFIG.contact.support.hours.monday}</p>
                    <p><strong>Saturday:</strong> {APP_CONFIG.contact.support.hours.saturday}</p>
                    <p><strong>Sunday:</strong> {APP_CONFIG.contact.support.hours.sunday}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-4">Before Contacting Support</h3>
                  <ul className="space-y-2 text-foreground-secondary">
                    <li>• Check our documentation</li>
                    <li>• Search existing community discussions</li>
                    <li>• Include relevant transaction hashes</li>
                    <li>• Describe steps to reproduce issues</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <h4 className="text-lg font-semibold text-primary mb-2">Emergency Support</h4>
                <p className="text-foreground-secondary mb-4">
                  For urgent issues like stuck transactions or security concerns, contact us immediately.
                </p>
                <p className="text-foreground-secondary">
                  <strong>Emergency Email:</strong> {APP_CONFIG.contact.support.emergencyEmail}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}