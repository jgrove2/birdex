import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname:
          "birdex-media.f06e4d17eec60c4d277fb35f162506ad.r2.cloudflarestorage.com",
      },
    ],
  },
};

if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

export default nextConfig;
