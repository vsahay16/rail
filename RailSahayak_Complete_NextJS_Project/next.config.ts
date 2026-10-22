import type { NextConfig } from "next";

// Baseline CSP deliberately leaves script/style/connect sources unrestricted.
// A nonce-based script policy needs separate testing with Next.js, GA4 and ads.
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'" },
];
const nextConfig: NextConfig = {
  // Run redirects before internal rewrites. Public English URLs have no prefix.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path+", destination: "/:path+", permanent: true },
    ];
  },
  async rewrites() {
    return { beforeFiles: [
      { source: "/", destination: "/en" },
      { source: "/:path((?!hi(?:/|$)|en(?:/|$)|api(?:/|$)|_next(?:/|$)|.*\\..*).+)", destination: "/en/:path" },
    ] };
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default nextConfig;
