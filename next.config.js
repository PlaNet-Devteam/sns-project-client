/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'github-production-user-asset-6210df.s3.amazonaws.com',
      'planet-bucket-staging.s3.ap-northeast-2.amazonaws.com',
      'planet-bucket-prod.s3.ap-northeast-2.amazonaws.com',
      'planet-sns.s3.ap-northeast-2.amazonaws.com',
      'planet-client.s3.ap-northeast-2.amazonaws.com',
      'lh3.googleusercontent.com',
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/$1`,
      },
      // 다른 리다이렉트나 대체 규칙을 추가할 수 있습니다.
    ];
  },
};

module.exports = nextConfig;
