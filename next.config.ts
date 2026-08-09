import type { NextConfig } from "next";

const nextConfig = { outputFileTracingIncludes: { "/api/fetch-slides": ["./node_modules/@sparticuz/chromium/bin/**/*"], }, }; export default nextConfig;