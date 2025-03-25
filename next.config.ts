//import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: false,
  // Optional: bring your own cache handler
  //cacheHandler: path.resolve('./cache-handler.mjs'),
  //cacheMaxMemorySize: 0, // Disable default in-memory caching
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
