#!/bin/bash

echo "🚀 Starting deployment process..."

# Build the project for production
echo "📦 Building project for production..."
NODE_ENV=production npm run build

# Add all changes to git
echo "📝 Adding changes to Git..."
git add .

# Commit with current timestamp
echo "💾 Committing changes..."
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S') - Contact form update"

# Push to GitHub
echo "🔗 Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete! Plesk will automatically update the website."
echo "🌐 Check your website in 1-2 minutes at: https://editing.bg"
echo "📧 Test the contact form at: https://editing.bg/#contact" 