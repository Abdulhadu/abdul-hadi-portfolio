import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── IMAGES ────────────────────────────────────────────────────────────────
  images: {
    // Only allow your own domain + supabase storage in production
    remotePatterns: [
      { protocol: "https", hostname: "ekywvnhllxnopmaotjui.supabase.co" },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },

  // ── SECURITY HEADERS ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Stops MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send referrer on same origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Blocks XSS in older browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Permissions policy — disable unused browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // HSTS — tells browser to always use HTTPS for 1 year
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      // ── API CACHE CONTROL ────────────────────────────────────────────────
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ];
  },

  // ── PERFORMANCE ───────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // ── COMPILER ─────────────────────────────────────────────────────────────
  // Strip console.log in production; keep console.error for monitoring
  compiler: {
    removeConsole: {
      exclude: ["error", "warn"],
    },
  },

  // ── STRICT MODE ──────────────────────────────────────────────────────────
  reactStrictMode: true,

  // ── TRAILING SLASH (Vercel default) ──────────────────────────────────────
  trailingSlash: false,

  // ── BUNDLE ANALYSIS (set ANALYZE=true to inspect) ─────────────────────
  // Run: ANALYZE=true npm run build
};

export default nextConfig;
