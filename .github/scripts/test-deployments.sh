#!/bin/bash

# Test deployment script for Acrobi Design System
# This script builds both VitePress and Storybook locally to test before deployment

set -e

echo "🚀 Testing Acrobi Design System Deployments"
echo "============================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "packages/ui" ]; then
    print_error "Please run this script from the root of the acrobi-design-system repository"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile
print_status "Dependencies installed"

# Build VitePress Documentation
echo ""
echo "📚 Building VitePress Documentation..."
cd packages/ui
if pnpm docs:build; then
    print_status "VitePress documentation built successfully"
    print_status "Output directory: packages/ui/docs/.vitepress/dist"
else
    print_error "VitePress build failed"
    exit 1
fi

# Build Storybook
echo ""
echo "📖 Building Storybook..."
if pnpm build-storybook; then
    print_status "Storybook built successfully"
    print_status "Output directory: packages/ui/storybook-static"
else
    print_error "Storybook build failed"
    exit 1
fi

cd ..

echo ""
echo "🎉 All builds completed successfully!"
echo ""
echo "Next steps:"
echo "1. Commit and push your changes to trigger automatic deployment"
echo "2. Or manually deploy using the GitHub Actions workflows"
echo ""
echo "VitePress docs will be available at: https://acrobi-docs.pages.dev"
echo "Storybook will be available at: https://acrobi-storybook.pages.dev"