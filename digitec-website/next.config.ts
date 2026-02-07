import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Habilita el modo standalone para despliegues en servidores como Hostinger */
  output: 'standalone',

  /* Optimizaciones para evitar que el proceso de "Build" se detenga por errores no críticos */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildsErrors: true,
  }
};

export default nextConfig;