// Production configuration and environment setup for LightChain
// This file contains production-ready configurations and security settings

export interface AppConfig {
  // Environment
  isProduction: boolean;
  isDevelopment: boolean;
  nodeEnv: string;

  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;

  // Solana Configuration
  solanaRpcUrl: string;
  solanaNetwork: 'mainnet-beta' | 'devnet' | 'testnet';

  // Security
  enableRateLimiting: boolean;
  maxRequestsPerMinute: number;
  enableCSRFProtection: boolean;

  // Trading Limits
  maxLeverage: number;
  minOrderSize: number;
  maxOrderSize: number;

  // Error Reporting
  enableErrorReporting: boolean;
  errorReportingEndpoint?: string;

  // Analytics
  enableAnalytics: boolean;
  analyticsEndpoint?: string;

  // Feature Flags
  features: {
    aiTrading: boolean;
    multiTokenSupport: boolean;
    portfolioAnalytics: boolean;
    orderBook: boolean;
    advancedCharts: boolean;
  };
}

// Default configuration
const defaultConfig: AppConfig = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  nodeEnv: process.env.NODE_ENV || 'development',

  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  apiTimeout: parseInt(process.env.API_TIMEOUT || '10000'),

  solanaRpcUrl: process.env.RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com',
  solanaNetwork: (process.env.NEXT_PUBLIC_SOLANA_NETWORK as any) || 'mainnet-beta',

  enableRateLimiting: process.env.ENABLE_RATE_LIMITING !== 'false',
  maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '60'),
  enableCSRFProtection: process.env.ENABLE_CSRF_PROTECTION !== 'false',

  maxLeverage: parseInt(process.env.MAX_LEVERAGE || '50'),
  minOrderSize: parseFloat(process.env.MIN_ORDER_SIZE || '0.01'),
  maxOrderSize: parseFloat(process.env.MAX_ORDER_SIZE || '1000000'),

  enableErrorReporting: process.env.ENABLE_ERROR_REPORTING === 'true',
  errorReportingEndpoint: process.env.ERROR_REPORTING_ENDPOINT,

  enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
  analyticsEndpoint: process.env.ANALYTICS_ENDPOINT,

  features: {
    aiTrading: process.env.FEATURE_AI_TRADING !== 'false',
    multiTokenSupport: process.env.FEATURE_MULTI_TOKEN_SUPPORT !== 'false',
    portfolioAnalytics: process.env.FEATURE_PORTFOLIO_ANALYTICS !== 'false',
    orderBook: process.env.FEATURE_ORDER_BOOK !== 'false',
    advancedCharts: process.env.FEATURE_ADVANCED_CHARTS !== 'false',
  },
};

// Validate configuration on load
function validateConfig(config: AppConfig): void {
  const errors: string[] = [];

  // Validate API timeout
  if (config.apiTimeout < 1000 || config.apiTimeout > 60000) {
    errors.push('API timeout must be between 1000ms and 60000ms');
  }

  // Validate Solana network
  if (!['mainnet-beta', 'devnet', 'testnet'].includes(config.solanaNetwork)) {
    errors.push('Invalid Solana network. Must be mainnet-beta, devnet, or testnet');
  }

  // Validate trading limits
  if (config.maxLeverage < 1 || config.maxLeverage > 100) {
    errors.push('Max leverage must be between 1 and 100');
  }

  if (config.minOrderSize <= 0) {
    errors.push('Minimum order size must be greater than 0');
  }

  if (config.maxOrderSize <= config.minOrderSize) {
    errors.push('Maximum order size must be greater than minimum order size');
  }

  if (errors.length > 0) {
    console.error('Configuration validation errors:', errors);
    if (config.isProduction) {
      throw new Error(`Invalid configuration: ${errors.join(', ')}`);
    }
  }
}

// Load and validate configuration
const config = { ...defaultConfig };
validateConfig(config);

export { config };

// Environment variable validation helper
export function validateEnvironmentVariables(): { isValid: boolean; missing: string[] } {
  const requiredVars = [
    'NEXT_PUBLIC_SOLANA_RPC_URL',
    'NEXT_PUBLIC_API_BASE_URL',
  ];

  const optionalVars = [
    'API_TIMEOUT',
    'ENABLE_RATE_LIMITING',
    'MAX_REQUESTS_PER_MINUTE',
    'ENABLE_CSRF_PROTECTION',
    'MAX_LEVERAGE',
    'MIN_ORDER_SIZE',
    'MAX_ORDER_SIZE',
    'ENABLE_ERROR_REPORTING',
    'ERROR_REPORTING_ENDPOINT',
    'ENABLE_ANALYTICS',
    'ANALYTICS_ENDPOINT',
    'FEATURE_AI_TRADING',
    'FEATURE_MULTI_TOKEN_SUPPORT',
    'FEATURE_PORTFOLIO_ANALYTICS',
    'FEATURE_ORDER_BOOK',
    'FEATURE_ADVANCED_CHARTS',
  ];

  const missing: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  return {
    isValid: missing.length === 0,
    missing
  };
}

// Security headers for production
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://api.mainnet-beta.solana.com https://api.devnet.solana.com",
    "frame-ancestors 'none'",
  ].join('; '),
};

// CORS configuration
export const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://lightchain-solana.com', 'https://www.lightchain-solana.com']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
};