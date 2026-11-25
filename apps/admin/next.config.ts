import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@routely/brand-assets", "@routely/design-tokens", "@routely/ui-web"],
};

export default nextConfig;
