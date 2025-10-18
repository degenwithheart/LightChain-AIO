// Deployment configuration for LightChain Solana
// This file contains build and deployment settings

export interface BuildConfig {
  // Build settings
  outputDir: string;
  staticAssetPrefix: string;

  // Optimization settings
  enableCompression: boolean;
  enableImageOptimization: boolean;
  enableServiceWorker: boolean;

  // CDN settings
  cdnUrl?: string;
  assetDomains: string[];

  // Security settings
  enableSecurityHeaders: boolean;
  enableCSP: boolean;

  // Performance settings
  enablePreload: boolean;
  enablePrefetch: boolean;
}

export const buildConfig: BuildConfig = {
  outputDir: 'out',
  staticAssetPrefix: process.env.NODE_ENV === 'production' ? '/_next/static' : '',

  enableCompression: true,
  enableImageOptimization: true,
  enableServiceWorker: false, // Enable after thorough testing

  cdnUrl: process.env.CDN_URL,
  assetDomains: [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    ...(process.env.CDN_URL ? [new URL(process.env.CDN_URL).hostname] : [])
  ],

  enableSecurityHeaders: process.env.NODE_ENV === 'production',
  enableCSP: process.env.NODE_ENV === 'production',

  enablePreload: true,
  enablePrefetch: true,
};

// Next.js configuration for production builds
export const nextConfig = {
  // Build optimization
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    domains: buildConfig.assetDomains,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Headers for security and performance
  async headers() {
    const headers = [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];

    if (buildConfig.enableCSP) {
      headers[0].headers.push({
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self' https://fonts.gstatic.com",
          "connect-src 'self' https://api.mainnet-beta.solana.com https://api.devnet.solana.com",
          "frame-ancestors 'none'",
        ].join('; '),
      });
    }

    return headers;
  },

  // Redirects for SEO and user experience
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/trading/:token*',
        destination: '/trade/:token*',
        permanent: true,
      },
    ];
  },

  // Rewrites for API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Webpack configuration for optimization
  webpack: (config: any, { dev, isServer }: any) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
        },
      };
    }

    // Bundle analyzer (only in development)
    if (dev && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
    }

    return config;
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

// Docker configuration for containerized deployment
export const dockerConfig = {
  baseImage: 'node:18-alpine',
  buildCommand: 'npm run build',
  startCommand: 'npm start',
  port: 3000,
  healthCheck: {
    path: '/api/health',
    interval: 30,
    timeout: 10,
    retries: 3,
  },
};

// CI/CD pipeline configuration
export const ciConfig = {
  nodeVersion: '18',
  cacheDirectories: ['.next/cache', 'node_modules'],
  buildSteps: [
    'npm ci',
    'npm run lint',
    'npm run type-check',
    'npm run build',
    'npm run test',
  ],
  deployConditions: {
    branch: 'main',
    statusChecks: ['lint', 'type-check', 'build', 'test'],
  },
};

// Monitoring and logging configuration
export const monitoringConfig = {
  enableApplicationMonitoring: process.env.NODE_ENV === 'production',
  enablePerformanceMonitoring: process.env.NODE_ENV === 'production',
  logLevel: process.env.LOG_LEVEL || 'info',
  metrics: {
    enableRequestMetrics: true,
    enableErrorMetrics: true,
    enablePerformanceMetrics: true,
  },
};