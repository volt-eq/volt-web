import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // `pnpm build` sets NEXT_DIST_DIR so a production build never overwrites the
  // .next directory a running `pnpm dev` is serving from.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // The Remotion compositions import the same components as the site, but they
  // are only ever bundled by the Remotion CLI — keep them out of `next build`.
  outputFileTracingExcludes: { "*": ["./remotion/**"] },
};

export default config;
