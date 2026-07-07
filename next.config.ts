import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Everything is statically generated. If a route ever needs to opt out of
  // static rendering, that must be a deliberate, reviewed decision.
  reactStrictMode: true,
  images: {
    // Marketing assets are local (public/) and MDX covers; keep remote empty.
    remotePatterns: [],
  },
  // Velite writes typed content to ./.velite; Next never bundles that folder
  // directly (we import via the #content alias), so nothing to configure here.
};

export default nextConfig;
