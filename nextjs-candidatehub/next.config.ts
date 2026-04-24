import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/about.html",
      },
      {
        source: "/contact",
        destination: "/contact.html",
      },
      {
        source: "/demo",
        destination: "/demo.html",
      },
      {
        source: "/markis",
        destination: "/markis.html",
      },
      {
        source: "/platform",
        destination: "/platform.html",
      },
      {
        source: "/pricing",
        destination: "/pricing.html",
      },
      {
        source: "/trial",
        destination: "/trial.html",
      },
    ];
  },
};

export default nextConfig;
