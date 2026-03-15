// Polyfill localStorage for Node.js server-side to prevent framer-motion errors
// Check if localStorage exists AND has proper methods (Node 25+ may have partial localStorage)
if (typeof globalThis.localStorage === 'undefined' || typeof globalThis.localStorage?.getItem !== 'function') {
  const storage = new Map()
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
    clear: () => storage.clear(),
    key: (index) => Array.from(storage.keys())[index] ?? null,
    get length() { return storage.size },
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  // swcMinify: true, // Use SWC minifier for better performance

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
  },
  
  // Vercel configuration
  // output: 'standalone', // Commented for Vercel
  trailingSlash: true,
  
  // Static file optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Compression
  compress: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
}

module.exports = nextConfig 