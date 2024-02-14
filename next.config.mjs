/** @type {import('next').NextConfig} */

const nextConfig = {
  // delete on build time
  // productionBrowserSourceMaps: false, // Disable source maps in development
  // optimizeFonts: false, // Disable font optimization
  // minify: false, // Disable minification

  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
};

export default nextConfig;
