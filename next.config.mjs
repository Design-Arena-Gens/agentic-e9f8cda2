/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "agentic-e9f8cda2.vercel.app"]
    }
  }
};

export default nextConfig;
