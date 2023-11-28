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
      'planet-sns.s3.ap-northeast-2.amazonaws.com',
      'planet-client.s3.ap-northeast-2.amazonaws.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
