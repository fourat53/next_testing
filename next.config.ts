import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["media.licdn.com"],
  },
};

export default nextConfig;
