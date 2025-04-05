import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const isProduction = process.env.NODE_ENV === "production";
    return [
      {
        source: "/api/:path*", // catch anything under /api
        destination: isProduction
          ? "https://backend:3001/:path*" // production backend URL
          : "http://localhost:3001/:path*", // local backend for development
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
