/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './public',
    }
    return config
  }
}

module.exports = nextConfig