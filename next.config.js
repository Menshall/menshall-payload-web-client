const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DATABASE_URI: process.env.DATABASE_URI,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "localhost",
      "ryfl1djfrijdesdy.public.blob.vercel-storage.com",
      "https://assets.alteg.io",
      "https://be.cdn.alteg.io",
      "storage.googleapis.com",
      "utfs.io",
    ]
      .filter(Boolean)
      .map((url) => url.replace(/https?:\/\//, "")),
  },
};

module.exports = withBundleAnalyzer(nextConfig);
