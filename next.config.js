const nextConfig = {
  // strictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
