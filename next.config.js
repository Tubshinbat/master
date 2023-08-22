const nextConfig = {
  // strictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["localhost", " localhost:8000", "127.0.0.1", "germondental.com"],
    allowFutureImage: true,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
