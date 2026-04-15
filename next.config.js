/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'export',
  basePath: '/emponboarding',
  assetPrefix: '/emponboarding/',
  images: {
    unoptimized: true,
  },
  distDir: 'out',
};

module.exports = nextConfig;
