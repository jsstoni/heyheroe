//import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //compress: false,
  //transpilePackages: ['@t3-oss/env-nextjs'],
  // Optional: bring your own cache handler
  //cacheHandler: path.resolve('./cache-handler.mjs'),
  //cacheMaxMemorySize: 0, // Disable default in-memory caching
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
