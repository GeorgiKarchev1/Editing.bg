#!/bin/bash

echo "🚀 Building for production..."

# Clean previous build
rm -rf .next
rm -rf out

# Install dependencies
npm install

# Build for production
NODE_ENV=production npm run build

echo "✅ Production build completed!"
echo "📁 Build files are in .next directory"
echo "🌐 Ready for deployment to Plesk"
