/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript : {
    ignoreBuildErrors : true,
  },
  eslint : {
    ignoreDuringBuilds : true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname : process.env.PARSE_FILES_HOSTNAME,
      },
    ],
  },
}

module.exports = nextConfig
