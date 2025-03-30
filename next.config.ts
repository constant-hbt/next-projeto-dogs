import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dogsapi.origamid.dev',
      },
    ],
  },
};

export default nextConfig;
