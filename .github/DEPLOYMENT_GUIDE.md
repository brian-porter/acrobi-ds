# Acrobi Design System - Deployment Guide

This guide covers the automated CI/CD deployment setup for the Acrobi Design System's documentation and development environments.

## 🎯 Deployment Overview

The Acrobi Design System uses **Cloudflare Pages** for hosting two separate environments:

- **📖 Documentation Site**: `docs.acrobi.com` - Public VitePress documentation
- **🔒 Development Storybook**: `dev.acrobi.com` - Password-protected development environment

## 🚀 Quick Setup

### 1. Cloudflare Configuration

**Create Cloudflare Pages Projects:**

```bash
# Via Cloudflare Dashboard:
# 1. Create project "acrobi-docs" for docs.acrobi.com
# 2. Create project "acrobi-storybook" for dev.acrobi.com
```

**Required GitHub Secrets:**
```bash
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
```

### 2. Domain Configuration

**Custom Domains in Cloudflare:**
- `docs.acrobi.com` → acrobi-docs project
- `dev.acrobi.com` → acrobi-storybook project

### 3. Trigger Deployments

**Documentation (VitePress):**
```bash
# Triggers on changes to:
git push origin main  # When docs/** files change
```

**Storybook (Development):**
```bash
# Triggers on changes to:
git push origin main  # When src/** or .storybook/** files change
```

## 📖 Documentation Deployment

### Workflow: `.github/workflows/deploy-docs-cloudflare.yml`

**Features:**
- ✅ Automated VitePress build and deployment
- ✅ SEO optimization (sitemap.xml, robots.txt)
- ✅ Public access for documentation
- ✅ Cloudflare Pages integration

**Build Process:**
1. Install dependencies with pnpm
2. Configure VitePress if not already setup
3. Build VitePress site
4. Generate SEO files (sitemap, robots.txt)
5. Deploy to Cloudflare Pages

**Access:** https://docs.acrobi.com (Public)

## 🔒 Storybook Deployment

### Workflow: `.github/workflows/deploy-storybook-cloudflare.yml`

**Features:**
- ✅ Automated Storybook build and deployment
- ✅ Password protection via Cloudflare Functions
- ✅ Security headers configuration
- ✅ Search engine blocking (robots.txt)

**Build Process:**
1. Install dependencies with pnpm
2. Build Storybook static site
3. Create password protection middleware
4. Add security headers and robots.txt
5. Deploy to Cloudflare Pages

**Access:** https://dev.acrobi.com  
**Password:** `acrobi-storybook-2024`  
**Session:** 24 hours

## 🔧 Local Testing

### Test Documentation Build

```bash
# Test VitePress build locally
cd packages/ui/docs
npx vitepress build
npx vitepress preview

# Test deployment configuration
pnpm run build:docs  # If script exists
```

### Test Storybook Build

```bash
# Test Storybook build locally
cd packages/ui
pnpm run build-storybook
npx serve storybook-static

# Test with authentication simulation
# (Password protection only works on Cloudflare Pages)
```

### Validate Deployment Scripts

```bash
# Run deployment validation
chmod +x .github/scripts/test-deployments.sh
.github/scripts/test-deployments.sh
```

## 🛡️ Security Features

### Documentation Site Security
- **Public Access**: Intentionally public for documentation
- **SEO Optimized**: Sitemap and robots.txt configured
- **HTTPS**: Automatic HTTPS via Cloudflare

### Storybook Security
- **Password Protection**: Form-based authentication
- **Session Management**: 24-hour secure cookies
- **Security Headers**: XSS, CSRF, and frame protection
- **Search Engine Blocking**: robots.txt disallows all
- **Static Asset Bypass**: Performance optimization

## 📊 Monitoring & Maintenance

### Deployment Status

**Check Deployment Status:**
```bash
# Via GitHub Actions
# Check: https://github.com/acrobi/design-system/actions

# Via Cloudflare Dashboard
# Check: Cloudflare Pages > Projects > Deployments
```

**Manual Deployment:**
```bash
# Trigger deployment without code changes
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

### Password Updates

**Update Storybook Password:**
1. Edit `.github/workflows/deploy-storybook-cloudflare.yml`
2. Change `const PASSWORD = 'new-password-here';`
3. Commit and push changes
4. Inform team of new password

### Troubleshooting

**Common Issues:**

1. **Deployment Fails - Missing Secrets**
   ```bash
   # Add to GitHub Repository Secrets:
   CLOUDFLARE_API_TOKEN=xxx
   CLOUDFLARE_ACCOUNT_ID=xxx
   ```

2. **VitePress Build Fails**
   ```bash
   # Check VitePress configuration
   cat packages/ui/docs/.vitepress/config.ts
   
   # Install VitePress if missing
   pnpm add -D vitepress
   ```

3. **Password Protection Not Working**
   ```bash
   # Verify Cloudflare Functions are enabled
   # Check middleware file in deployment
   # Test with incognito/private browser
   ```

4. **Domain Not Resolving**
   ```bash
   # Check Cloudflare DNS settings
   # Verify custom domain configuration
   # Check SSL/TLS encryption mode
   ```

## 🔄 Deployment Workflow

### Documentation Update Process
1. **Edit**: Update markdown files in `packages/ui/docs/`
2. **Commit**: Commit changes to main branch
3. **Deploy**: Automatic deployment to docs.acrobi.com
4. **Verify**: Check live site for updates

### Component Update Process
1. **Develop**: Update components in `packages/ui/src/`
2. **Document**: Update Storybook stories
3. **Commit**: Commit changes to main branch
4. **Deploy**: Automatic deployment to dev.acrobi.com
5. **Test**: Verify components in protected Storybook

## 📋 Checklist for New Deployments

- [ ] Cloudflare API token configured in GitHub secrets
- [ ] Cloudflare account ID configured in GitHub secrets
- [ ] Custom domains configured in Cloudflare
- [ ] VitePress configuration exists
- [ ] Storybook configuration exists
- [ ] Test both workflows with sample changes
- [ ] Verify password protection works
- [ ] Confirm SEO settings (robots.txt, sitemap)
- [ ] Document new password with team

## 🎯 Production Considerations

### Performance
- **CDN**: Cloudflare global edge network
- **Caching**: Automatic static asset caching
- **Compression**: Gzip/Brotli compression enabled

### Security
- **HTTPS**: Automatic SSL/TLS certificates
- **DDoS Protection**: Cloudflare protection enabled
- **Access Control**: Password protection for development

### Scaling
- **Unlimited Bandwidth**: Cloudflare Pages free tier
- **Global Distribution**: Edge locations worldwide
- **Automatic Scaling**: No configuration required

## 📞 Support

**Issues with Deployments:**
- Check GitHub Actions logs
- Review Cloudflare Pages deployment logs
- Verify DNS and domain configuration

**Team Access:**
- Documentation: Public access at docs.acrobi.com
- Storybook: Password `acrobi-storybook-2024` at dev.acrobi.com

---

*This deployment guide ensures reliable, secure, and automated hosting for both public documentation and private development environments.*