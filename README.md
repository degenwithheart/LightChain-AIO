# LightChain Solana - Modern Trading Platform

A complete perpetual DEX trading platform on Solana with modern glassmorphism design, built with Next.js 15, React 19, and TypeScript. Features AI-powered trading agents, advanced analytics, and production-ready error handling.

## ✨ Features

### Glassmorphism UI
- **Modern Design**: Sleek glassmorphism effects with backdrop blur
- **Gradient Backgrounds**: Subtle animated gradients and floating elements
- **Inter Font**: Clean, modern typography
- **Smooth Animations**: Floating, pulsing, and shimmer effects

### Solana Integration
- **Wallet Support**: Phantom, Solflare, Torus, and more
- **Real Blockchain**: Full Solana Web3.js integration (no mocks)
- **Token Support**: USDC, SOL, BTC, ETH trading pairs
- **Perpetual DEX**: Leverage trading with up to 50x leverage

### AI Trading Agents
- **Autonomous Agents**: AI-powered trading strategies
- **Performance Tracking**: Real-time P&L and metrics
- **Strategy Templates**: Pre-built trading algorithms
- **Multi-Agent Support**: Run multiple strategies simultaneously

### Advanced Analytics
- **Portfolio Analytics**: Diversification and risk metrics
- **Order Book**: Real-time depth visualization
- **Multi-Token Support**: Simultaneous trading across assets
- **Performance Dashboard**: Comprehensive trading metrics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Solana wallet (Phantom recommended)
- Git

### Quick Start

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd lightchain-solana
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## 🏗️ Architecture

### Components
- `AgentCard` - AI agent display with performance metrics
- `PositionsTable` - Trading positions with P&L tracking
- `TradingViewWidget` - Real-time price charts
- `OrderBook` - Real-time order book visualization
- `PortfolioAnalytics` - Advanced portfolio metrics
- `ErrorBoundary` - Comprehensive error handling

### Hooks
- `usePerpDex` - DEX operations (open/close positions)
- `useUSDCBalance` - USDC balance management
- `useUSDCApprove` - Token spending approvals
- `useAITradingAgent` - AI agent management
- `useErrorHandler` - Error handling utilities

### API Routes
- `/api/prices/current/[tokenAddress]` - Real-time price data
- `/api/positions/[traderAddress]` - User positions
- `/api/markets/[tokenAddress]` - Market information
- `/api/create-agent` - AI agent creation
- `/api/generate-agent` - Agent strategy generation

### Libraries
- `lib/error-handling.ts` - Comprehensive error handling
- `lib/security.ts` - Input validation and security
- `lib/config.ts` - Production configuration
- `lib/deployment.ts` - Build and deployment settings

## 🎮 Usage

### Connecting Wallet
1. Click "CONNECT WALLET" in the navbar
2. Select your preferred Solana wallet
3. Approve connection

### Trading
1. Click "START TRADING" on the homepage or "Trade" in the navigation
2. Browse available tokens on the `/tokens` page
3. Click "Trade [SYMBOL]" on any token card
4. Select Long/Short position, set size and leverage (1x-50x)
5. Click "OPEN LONG/SHORT"

### AI Agent Creation
1. Go to `/create` page
2. Select agent template
3. Configure strategy parameters
4. Deploy autonomous agent

### Managing Positions
- View all positions in the positions table
- Monitor real-time P&L
- Close positions automatically or manually

## 🔒 Security & Production

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
# Required
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com/api

# Security (Production)
ENABLE_RATE_LIMITING=true
ENABLE_CSRF_PROTECTION=true
ENABLE_ERROR_REPORTING=true

# Trading Limits
MAX_LEVERAGE=50
MIN_ORDER_SIZE=0.01
MAX_ORDER_SIZE=1000000
```

### Security Features
- **Input Validation**: Comprehensive validation for all user inputs
- **Rate Limiting**: Prevents abuse and ensures fair usage
- **CSRF Protection**: Prevents cross-site request forgery
- **Error Boundaries**: Graceful error handling and user feedback
- **Security Headers**: Production-ready security headers

### Error Handling
- **Global Error Catching**: Unhandled errors and promise rejections
- **Trading Error Types**: Specific error classes for trading operations
- **Retry Logic**: Automatic retry for transient failures
- **User Feedback**: Clear error messages and recovery options

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Docker Deployment
```bash
# Build image
docker build -t lightchain-solana .

# Run container
docker run -p 3000:3000 lightchain-solana
```

### Environment Setup
1. **Vercel/Netlify**: Set environment variables in dashboard
2. **Docker**: Use environment file or secrets
3. **Cloud**: Configure VPC, load balancers, and monitoring

### Performance Optimization
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: WebP/AVIF formats with lazy loading
- **Caching**: Aggressive caching strategies
- **Compression**: Gzip/Brotli compression enabled

### Monitoring & Analytics
- **Error Reporting**: Sentry integration for error tracking
- **Performance Monitoring**: Core Web Vitals tracking
- **Analytics**: User behavior and conversion tracking
- **Logging**: Structured logging with log levels

## 🧪 Testing

### Run Tests
```bash
npm run test
npm run test:watch
```

### Test Coverage
```bash
npm run test:coverage
```

### E2E Testing
```bash
npm run test:e2e
```

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── prices/            # Price data endpoints
│   │   ├── positions/         # Position management
│   │   ├── markets/           # Market data
│   │   ├── create-agent/      # Agent creation
│   │   └── generate-agent/    # Strategy generation
│   ├── trade/[tokenAddress]/   # Trading interface
│   ├── create/                # Agent creation UI
│   ├── globals.css            # Casino styling
│   ├── layout.tsx             # Root layout with providers
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── AgentCard.tsx          # Agent display
│   ├── PositionsTable.tsx     # Positions management
│   ├── TradingViewWidget.tsx  # Charts
│   ├── OrderBook.tsx          # Order book visualization
│   ├── PortfolioAnalytics.tsx # Portfolio metrics
│   ├── ErrorBoundary.tsx      # Error handling
│   └── WalletProvider.tsx     # Wallet integration
├── hooks/
│   ├── usePerpDex.ts          # DEX operations
│   ├── useUSDCBalance.ts      # Balance management
│   ├── useUSDCApprove.ts      # Token approvals
│   ├── useAITradingAgent.ts   # AI agent management
│   └── useErrorHandler.ts     # Error handling
├── lib/
│   ├── error-handling.ts      # Error handling utilities
│   ├── security.ts            # Security & validation
│   ├── config.ts              # App configuration
│   ├── deployment.ts          # Build & deployment config
│   ├── agent-generator/       # AI agent logic
│   ├── constants/             # Contract ABIs & constants
│   └── utils.ts               # Utility functions
├── config/
│   ├── wagmi.ts               # Web3 configuration
│   └── chains.ts              # Network configurations
└── assets/                    # Static assets
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run test         # Run tests
npm run test:e2e     # Run E2E tests
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb config with React rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality checks

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📊 Performance

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Features
- **Lazy Loading**: Components and routes
- **Code Splitting**: Automatic chunk splitting
- **Image Optimization**: Next.js built-in optimization
- **Caching**: Aggressive caching strategies

## 🤝 Support

### Documentation
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Security Guide](./docs/security.md)

### Community
- [Discord](https://discord.gg/lightchain)
- [Twitter](https://twitter.com/lightchain_sol)
- [GitHub Issues](https://github.com/lightchain/lightchain-solana/issues)

## 📄 License

Built for the Solana ecosystem. Casino theme inspired by modern DeFi platforms.

---

**⚠️ Disclaimer**: This platform involves real financial transactions on the Solana blockchain. Always trade with caution and never invest more than you can afford to lose. The AI agents are for educational and research purposes - past performance does not guarantee future results.