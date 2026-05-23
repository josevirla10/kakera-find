import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.mlstatic.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '*.alicdn.com' },
      { protocol: 'https', hostname: '*.aliexpress.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/_next/image',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ]
  },
}

export default nextConfig
