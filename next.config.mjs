/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.slidesharecdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.slidesharecdn.com",
        pathname: "/**",
      },
    ],
  },

  serverExternalPackages: [
    "puppeteer-core",
    "@sparticuz/chromium",
  ],

  outputFileTracingIncludes: {
    "/api/fetch-slides": [
      "./node_modules/@sparticuz/chromium/bin/**/*",
    ],
  },
};

export default nextConfig;