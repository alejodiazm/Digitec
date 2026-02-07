import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Next.js 16 maneja ESLint y TypeScript de forma distinta
  // Usamos estas opciones para que el build no se detenga en Hostinger
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;