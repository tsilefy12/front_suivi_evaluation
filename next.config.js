/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/suivi-evaluation",
  assetPrefix: "/suivi-evaluation/",
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
