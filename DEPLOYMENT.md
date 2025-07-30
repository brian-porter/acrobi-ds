# Deployment Guide

This guide covers deploying the Acrobi Design System documentation (VitePress) and component library (Storybook) to Cloudflare Pages.

## Overview

- **VitePress Documentation**: Component documentation and guides
- **Storybook**: Interactive component library and testing environment

## Prerequisites

### GitHub Secrets

Add these secrets to your GitHub repository settings:

1. `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Pages permissions
2. `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Cloudflare Pages Projects

Create two projects in Cloudflare Pages:

1. **acrobi-docs** - For VitePress documentation
2. **acrobi-storybook** - For Storybook component library

## Deployment Methods

### 1. Automatic Deployment (Recommended)

Deployments trigger automatically on push to `main` branch:

- **VitePress**: Triggers when files in `packages/ui/docs/` or `packages/ui/src/` change
- **Storybook**: Triggers when files in `packages/ui/src/` or `packages/ui/.storybook/` change

### 2. Manual Deployment

#### Using GitHub Actions

1. Go to the "Actions" tab in your GitHub repository
2. Select "Deploy All Sites" workflow
3. Click "Run workflow"
4. Choose which sites to deploy (docs, storybook, or both)

#### Using npm scripts

```bash
# Deploy documentation
npm run deploy:docs

# Deploy storybook  
npm run deploy:storybook
```

### 3. Local Testing

Test builds locally before deployment:

```bash
# Test both builds
npm run deploy:test

# Or test individually
cd packages/ui
pnpm docs:build    # Test VitePress build
pnpm build-storybook  # Test Storybook build
```

## Build Configuration

### VitePress
- **Source**: `packages/ui/docs/`
- **Build Command**: `pnpm docs:build`
- **Output**: `packages/ui/docs/.vitepress/dist`

### Storybook
- **Source**: `packages/ui/src/` + `packages/ui/.storybook/`
- **Build Command**: `pnpm build-storybook`
- **Output**: `packages/ui/storybook-static`

## URLs

After deployment, your sites will be available at:

- **Documentation**: `https://acrobi-docs.pages.dev`
- **Storybook**: `https://acrobi-storybook.pages.dev`

## Troubleshooting

### Build Failures

1. **Check dependencies**: Ensure all packages are installed
2. **Check Node version**: Workflows use Node.js 20
3. **Check build logs**: Review GitHub Actions logs for specific errors

### Common Issues

- **Missing secrets**: Verify `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set
- **Project names**: Ensure Cloudflare Pages projects match the names in workflows
- **Build timeouts**: Large builds may need optimization

### Local Development

```bash
# Start VitePress dev server
cd packages/ui
pnpm docs:dev

# Start Storybook dev server  
cd packages/ui
pnpm dev
```

## Custom Domains

To use custom domains:

1. Configure custom domains in Cloudflare Pages dashboard
2. Update DNS records to point to Cloudflare
3. SSL certificates are automatically provisioned

## Environment Variables

The following environment variables are available during builds:

- `NODE_VERSION`: "20"
- `CLOUDFLARE_ACCOUNT_ID`: Your account ID (in workflows)
- `CLOUDFLARE_API_TOKEN`: Your API token (in workflows)

## Monitoring

Monitor deployments through:

- GitHub Actions tab for build status
- Cloudflare Pages dashboard for deployment history
- Cloudflare Analytics for site performance