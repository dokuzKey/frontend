/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
