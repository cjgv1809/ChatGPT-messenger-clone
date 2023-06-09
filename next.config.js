/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["links.papareact.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
