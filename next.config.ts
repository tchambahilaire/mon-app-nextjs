import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
