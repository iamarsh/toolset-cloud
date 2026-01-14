#!/bin/bash

# Umami Analytics Setup Script for toolset.cloud
# This script helps you quickly set up environment variables for Umami Analytics

echo "🎯 Umami Analytics Setup for toolset.cloud"
echo "=========================================="
echo ""
echo "This script will help you configure Umami Analytics."
echo "Make sure you've deployed Umami to Vercel first!"
echo ""
echo "📖 Haven't deployed Umami yet? See: UMAMI_SETUP_GUIDE.md"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
  echo "⚠️  .env.local already exists."
  read -p "Do you want to add Umami variables to it? (y/n): " confirm
  if [ "$confirm" != "y" ]; then
    echo "❌ Cancelled. No changes made."
    exit 0
  fi
  echo ""
else
  echo "✅ Creating new .env.local file..."
  touch .env.local
  echo ""
fi

# Get Website ID
echo "📝 Step 1: Enter your Umami Website ID"
echo "   (Find this in your Umami dashboard → Websites → Click your site)"
read -p "Website ID: " website_id

if [ -z "$website_id" ]; then
  echo "❌ Error: Website ID cannot be empty"
  exit 1
fi

# Get Umami URL
echo ""
echo "📝 Step 2: Enter your Umami instance URL"
echo "   (Your Vercel deployment URL, e.g., your-umami.vercel.app)"
echo "   (Do NOT include https:// or /script.js)"
read -p "Umami URL: " umami_url

if [ -z "$umami_url" ]; then
  echo "❌ Error: Umami URL cannot be empty"
  exit 1
fi

# Remove https:// if user added it
umami_url=$(echo "$umami_url" | sed 's|https://||g')

# Add to .env.local
echo "" >> .env.local
echo "# Umami Analytics Configuration" >> .env.local
echo "NEXT_PUBLIC_UMAMI_WEBSITE_ID=$website_id" >> .env.local
echo "NEXT_PUBLIC_UMAMI_URL=https://$umami_url/script.js" >> .env.local

echo ""
echo "✅ Success! Analytics configuration added to .env.local"
echo ""
echo "📋 Your configuration:"
echo "   Website ID: $website_id"
echo "   Script URL: https://$umami_url/script.js"
echo ""
echo "🚀 Next steps:"
echo "   1. Test locally: npm run build && npm start"
echo "   2. Add these variables to your production environment (Vercel, etc.)"
echo "   3. Deploy to production"
echo "   4. Visit your site and check the Umami dashboard!"
echo ""
echo "📊 Umami Dashboard: https://$umami_url"
echo ""
echo "💡 Tip: See ANALYTICS_IMPLEMENTATION.md to add tracking to your tools"
echo ""
