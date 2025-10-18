/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
        pathname: '/private/**',
      },
    ],
  },
  // Solana-specific configurations can be added here
  webpack: (config) => {
    // Add any Solana-specific webpack configurations if needed
    return config;
  },
};

export default nextConfig;