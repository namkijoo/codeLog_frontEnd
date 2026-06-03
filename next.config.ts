import type { NextConfig } from 'next';

const apiBackendUrl = process.env.API_BACKEND_URL ?? 'http://localhost:8080';

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiBackendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
