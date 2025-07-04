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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.clerk.dev *.stripe.com *.uploadthing.com *.mux.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob: *.supabase.co *.uploadthing.com *.clerk.dev *.stripe.com *.mux.com; connect-src 'self' *.clerk.dev *.stripe.com *.supabase.co *.uploadthing.com *.mux.com *.openai.com; media-src 'self' *.mux.com *.uploadthing.com; frame-src 'self' *.stripe.com *.clerk.dev;"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
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
    ignoreDuringBuilds: false, // Enable ESLint checking
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript error checking
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