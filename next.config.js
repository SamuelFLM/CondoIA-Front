/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Configuração simplificada para o Vercel
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  // Desativar source maps em produção para reduzir o tamanho do build
  productionBrowserSourceMaps: false,
  // Simplified webpack config without crypto-browserify
  webpack: (config, { isServer }) => {
    // Only apply these polyfills in the browser build
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        // Remove crypto polyfill
      };
    }

    return config;
  },
};

module.exports = nextConfig
