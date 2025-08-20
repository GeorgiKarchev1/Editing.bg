#!/bin/bash

echo "🚀 Plesk Webhook Deployment Started..."

# Navigate to project directory
cd /var/www/vhosts/editing.bg

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build for production
echo "🔨 Building for production..."
NODE_ENV=production npm run build

# Restart Node.js application
echo "🔄 Restarting application..."
if pm2 list | grep -q "editing-bg"; then
    pm2 restart editing-bg
else
    pm2 start server.js --name editing-bg
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Website updated: https://editing.bg"
echo "📧 Contact form ready for testing"
