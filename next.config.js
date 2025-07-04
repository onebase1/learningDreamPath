const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // Remove the plugins for now as they're causing ESM issues
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", 
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dreampath-platform.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dreampatlearning.com",
        pathname: "/**",
      },
      

      {
        protocol: "https",
        hostname: "dreampatlearning.com",
        pathname: "/**",
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/webhook/clerk',
        destination: '/api/webhook/clerk',
        has: [
          {
            type: 'header',
            key: 'svix-id'
          }
        ]
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);