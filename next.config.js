/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  swcMinify: true, // Use SWC minifier for better performance
  
  // Optimize images for static export
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Optimize compilation
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Enable static exports for better performance
  output: 'export',
  trailingSlash: true,
  
  // Static file optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Compression
  compress: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
}

module.exports = nextConfig 