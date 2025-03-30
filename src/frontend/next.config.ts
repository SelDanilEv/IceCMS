import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // catch anything under /api
        destination: "http://localhost:3001/:path*", // forward to backend
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
