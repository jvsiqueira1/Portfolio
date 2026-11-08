import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Everything the site loads is same-origin (pages, scripts, self-hosted fonts, images and CVs) except
// Google Analytics, which loads only after the visitor accepts cookies. 'unsafe-inline' covers the
// inline scripts Next.js uses to hydrate a static page and the GA bootstrap snippet; inline styles
// come from React style props and Motion. 'unsafe-eval' is only for `next dev`.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.wordpress.com',
        pathname: '/mshots/v1/**',
      },
    ],
  },
  experimental: {
    // One root layout per language: src/app/global-not-found.tsx gives unknown URLs a full document.
    globalNotFound: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
