'use client';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { APP_CONFIG } from '../../lib/constants';

export default function RiskPage() {
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
              Risk Disclosure
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Trading cryptocurrencies and derivatives involves substantial risk. Please read this disclosure carefully.
            </p>
          </div>

          <div className="glass-card p-8 space-y-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-red-500">Important Risk Warning</h2>
              </div>
              <p className="text-red-600 leading-relaxed">
                Trading cryptocurrencies and derivatives is highly speculative and involves significant risk.
                You may lose some or all of your invested capital. Only trade with money you can afford to lose.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Market Risk</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Cryptocurrency markets are highly volatile. Prices can fluctuate dramatically within short periods,
                and you may experience significant losses. Past performance does not guarantee future results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Leverage Risk</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Our perpetual DEX uses leverage, which can amplify both gains and losses. A small market movement
                against your position can result in the total loss of your margin and require additional funds to maintain your position.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Liquidation Risk</h2>
              <p className="text-foreground-secondary leading-relaxed">
                If the value of your position falls below the maintenance margin requirement, your position may be
                liquidated automatically. This can result in the loss of your entire investment in the position.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Technology Risk</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Blockchain technology and smart contracts are still developing. There is a risk of software bugs,
                hacks, or other technical failures that could result in loss of funds. While we implement security
                measures, we cannot guarantee protection against all potential threats.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Regulatory Risk</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Cryptocurrency regulations vary by jurisdiction and are subject to change. Changes in laws or
                regulations may adversely affect the value of cryptocurrencies or restrict your ability to trade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Counterparty Risk</h2>
              <p className="text-foreground-secondary leading-relaxed">
                While our DEX operates on blockchain technology, there may be risks associated with the underlying
                protocols, liquidity providers, or other participants in the ecosystem.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Smart Contract Risk</h2>
              <p className="text-foreground-secondary leading-relaxed">
                Smart contracts, while designed to be immutable, may contain bugs or vulnerabilities.
                We conduct audits and implement security measures, but cannot guarantee that all risks are eliminated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. No Financial Advice</h2>
              <p className="text-foreground-secondary leading-relaxed">
                The information provided on this platform is for educational and informational purposes only.
                It does not constitute financial, investment, or trading advice. You should consult with qualified
                financial advisors before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Acknowledgment</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                By using {APP_CONFIG.fullName}, you acknowledge that you have read, understood, and agree to accept
                all risks associated with cryptocurrency trading and derivatives. You understand that you may lose
                all or a substantial portion of your investment.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-600 text-sm">
                  <strong>Not suitable for all investors:</strong> Trading cryptocurrencies is not suitable for all investors.
                  Only invest what you can afford to lose, and consider your financial situation, risk tolerance, and investment objectives.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">10. Contact Information</h2>
              <p className="text-foreground-secondary leading-relaxed">
                If you have questions about these risks or need assistance, please contact our support team.
              </p>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                <p className="text-foreground-secondary">Email: {APP_CONFIG.contact.support.email}</p>
                <p className="text-foreground-secondary">Discord: {APP_CONFIG.social.discord.handle}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}