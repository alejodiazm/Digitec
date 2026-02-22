import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // En Next.js 16, TypeScript se configura aquí pero eslint se maneja vía CLI
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
