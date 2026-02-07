import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // En Next.js 16, estas opciones se han movido o simplificado
  // Si quieres ignorar errores durante el build, usa estas:
  typescript: {
    ignoreBuildErrors: true, // Se cambió 'ignoreBuildsErrors' por 'ignoreBuildErrors'
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;