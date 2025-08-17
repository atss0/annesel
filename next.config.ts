import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crmprojesi.fun",
      },
      {
        protocol: "http",
        hostname: "annesel.local",
      },
      {
        protocol: "https",
        hostname: "annesel.com",
      },
    ],
  },
  eslint: {
    // Build sırasında ESLint hatalarından geçmek için
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Build sırasında TS hatalarından geçmek için
    ignoreBuildErrors: true,
  },
};

export default nextConfig;