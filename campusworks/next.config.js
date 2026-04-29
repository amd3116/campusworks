/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Required for next-auth compatibility with Next.js 15
  },
}

module.exports = nextConfig
