import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://url-shortener-kappa-six.vercel.app/**"),
    ],
  },
};

export default nextConfig;
