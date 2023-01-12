/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: '**',
      },
      {
        protocol: "http",
        hostname: '**',
      },
      {
        protocol: "www",
        hostname: '**',
      },
      {
        protocol: "ipfs",
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
