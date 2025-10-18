// Application constants and static configuration
// This file contains all hardcoded strings and values that should be centralized

export const APP_CONFIG = {
  // App Identity
  name: 'LightChain',
  fullName: 'LightChain Solana',
  tagline: 'Modern Trading Platform',
  description: 'Advanced perpetual DEX trading with glassmorphism design on Solana',

  // Branding
  logo: {
    text: 'LC',
    fullText: 'LIGHTCHAIN',
    tag: 'SOLANA'
  },

  // Contact Information
  contact: {
    support: {
      email: 'support@lightchain.solana',
      hours: {
        monday: '9:00 AM - 6:00 PM UTC',
        tuesday: '9:00 AM - 6:00 PM UTC',
        wednesday: '9:00 AM - 6:00 PM UTC',
        thursday: '9:00 AM - 6:00 PM UTC',
        friday: '9:00 AM - 6:00 PM UTC',
        saturday: '10:00 AM - 4:00 PM UTC',
        sunday: 'Emergency support only'
      },
      emergencyEmail: 'emergency@lightchain.solana'
    },
    privacy: {
      email: 'privacy@lightchain.solana'
    },
    business: {
      address: 'TBD - Business Address',
      jurisdiction: 'TBD - Legal Jurisdiction'
    }
  },

  // Social Media
  social: {
    discord: {
      url: 'https://discord.gg/lightchain',
      handle: 'discord.gg/lightchain'
    },
    twitter: {
      url: 'https://twitter.com/LightChainSol',
      handle: '@LightChainSol'
    },
    github: {
      url: 'https://github.com/degenwithheart/LightChain-AIO',
      handle: 'github.com/degenwithheart/LightChain-AIO'
    },
    linkedin: {
      url: '#',
      handle: 'LightChain Solana'
    }
  },

  // Legal Pages
  legal: {
    terms: {
      title: 'Terms of Service',
      lastUpdated: '2025'
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: '2025'
    },
    risk: {
      title: 'Risk Disclosure',
      lastUpdated: '2025'
    }
  },

  // API Information
  api: {
    baseUrl: 'https://api.lightchain.solana',
    websocketUrl: 'wss://api.lightchain.solana/ws',
    version: 'v1',
    documentation: '/api'
  },

  // Trading Configuration
  trading: {
    maxLeverage: 50,
    fees: {
      maker: 0.1, // 0.1%
      taker: 0.1  // 0.1%
    }
  },

  // UI Constants
  ui: {
    minContentHeight: {
      desktop: '800px',
      mobile: '600px'
    }
  },

  // External Links
  links: {
    docs: '/docs',
    api: '/api',
    support: '/support',
    github: 'https://github.com/degenwithheart/LightChain-AIO'
  }
} as const;

// Helper functions for commonly used values
export const getAppTitle = () => `${APP_CONFIG.name} ${APP_CONFIG.logo.tag}`;
export const getFullAppName = () => APP_CONFIG.fullName;
export const getSupportEmail = () => APP_CONFIG.contact.support.email;
export const getEmergencyEmail = () => APP_CONFIG.contact.support.emergencyEmail;
export const getPrivacyEmail = () => APP_CONFIG.contact.privacy.email;
export const getBusinessAddress = () => APP_CONFIG.contact.business.address;
export const getJurisdiction = () => APP_CONFIG.contact.business.jurisdiction;

// Social media helpers
export const getSocialLinks = () => APP_CONFIG.social;
export const getDiscordUrl = () => APP_CONFIG.social.discord.url;
export const getTwitterUrl = () => APP_CONFIG.social.twitter.url;
export const getGithubUrl = () => APP_CONFIG.social.github.url;

// API helpers
export const getApiBaseUrl = () => APP_CONFIG.api.baseUrl;
export const getWebsocketUrl = () => APP_CONFIG.api.websocketUrl;

// Trading helpers
export const getMaxLeverage = () => APP_CONFIG.trading.maxLeverage;
export const getTradingFees = () => APP_CONFIG.trading.fees;