import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.slidesharecdn.com",
        pathname: "/**",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/api/fetch-slides": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: any) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      https: false,
      http: false,
      path: false,
      stream: false,
      util: false,
      buffer: false,
      crypto: false,
    };
    return config;
  },
};

export default nextConfig;