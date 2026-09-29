import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // VSCode/OneDrive syncs create temp files; ignore common noise.
  typedRoutes: false,
};

export default nextConfig;