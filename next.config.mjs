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
    "playwright-core",
    "@sparticuz/chromium",
  ],
};

export default nextConfig;