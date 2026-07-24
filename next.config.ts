import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Devicon SVGs used in the AboutMe skills grid
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      // Bun logo
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
      // Prisma logo
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
      // Spotify album art — only needed if MUSIC.enabled = true
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
}

export default nextConfig