import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || "https://smartlifetrackerbackend-production.up.railway.app"}/api/:path*`,
      },
    ]
  },
};

export default nextConfig;
