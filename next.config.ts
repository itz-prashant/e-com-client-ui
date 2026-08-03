import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5502",
        pathname: "/uploads/**",
      }
    ]
  }
};

export default nextConfig;
