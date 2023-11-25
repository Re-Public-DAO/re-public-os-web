/** @type {import('next').NextConfig} */
const { version, } = require('./package.json',)

const nextConfig = {
  publicRuntimeConfig : {
    version,
  },
  experimental : {
    appDir : true,
  },
  typescript : {
    ignoreBuildErrors : true,
  },
  eslint : {
    ignoreDuringBuilds : true,
  },
  images : {
    remotePatterns : [
      {
        protocol : 'http',
        hostname : 'localhost',
        port     : '8000',
        pathname : '/media/**',
      },
    ],
  },
}

module.exports = nextConfig
