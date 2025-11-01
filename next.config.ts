import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
