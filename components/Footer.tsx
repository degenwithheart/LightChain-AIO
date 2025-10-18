export function Footer() {
  return (
    <footer className="glass-card border-t border-glass-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">LC</span>
              </div>
              <span className="font-bold text-xl text-primary">
                LIGHTCHAIN
              </span>
            </div>
            <p className="text-foreground-secondary text-sm leading-relaxed max-w-md">
              The premier modern perpetual DEX on Solana. Trade with confidence,
              powered by AI agents and advanced DeFi protocols.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-secondary mb-4">PLATFORM</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/tokens" className="text-foreground-secondary hover:text-primary transition-colors">Trade</a></li>
              <li><a href="/agents" className="text-foreground-secondary hover:text-primary transition-colors">AI Agents</a></li>
              <li><a href="/positions" className="text-foreground-secondary hover:text-primary transition-colors">Positions</a></li>
              <li><a href="/create" className="text-foreground-secondary hover:text-primary transition-colors">Create Agent</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-secondary mb-4">RESOURCES</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/docs" className="text-foreground-secondary hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="/api" className="text-foreground-secondary hover:text-primary transition-colors">API</a></li>
              <li><a href="/github" className="text-foreground-secondary hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="/support" className="text-foreground-secondary hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-glass-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground-muted text-sm">
            © 2024 LightChain Solana. Built for the future of DeFi trading.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-foreground-muted hover:text-primary transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-foreground-muted hover:text-primary transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-foreground-muted hover:text-primary transition-colors text-sm">
              Risk
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}