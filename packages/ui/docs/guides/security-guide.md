# PWA Security Best Practices Guide

A comprehensive guide to building secure Progressive Web Apps (PWAs) using the Acrobi Design System. This guide covers essential security considerations from manifest configuration to application-level security measures.

## Overview

Security is paramount when building PWAs that handle user data and operate across various network conditions. This guide provides practical, production-ready security measures that every PWA should implement.

## Table of Contents

1. [PWA Manifest Security](#pwa-manifest-security)
2. [HTTPS Everywhere](#https-everywhere)
3. [Content Security Policy (CSP)](#content-security-policy-csp)
4. [Security Headers](#security-headers)
5. [Application-Level Security](#application-level-security)
6. [Authentication and Authorization](#authentication-and-authorization)
7. [Data Storage Security](#data-storage-security)
8. [Dependency Security](#dependency-security)
9. [Security Testing Checklist](#security-testing-checklist)

## PWA Manifest Security

The Web App Manifest is your PWA's first line of defense. Proper configuration prevents security vulnerabilities and ensures your app operates within defined boundaries.

### Scope Configuration

The `scope` property defines which URLs your PWA can control. This is critical for preventing unauthorized access to other parts of your domain.

```json
{
  "name": "Secure PWA",
  "short_name": "SecurePWA",
  "start_url": "/app/",
  "scope": "/app/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### ✅ Manifest Security Best Practices

**1. Restrictive Scope**
```json
// ✅ Good: Specific scope
{
  "scope": "/dashboard/",
  "start_url": "/dashboard/"
}

// ❌ Bad: Too broad scope
{
  "scope": "/",
  "start_url": "/dashboard/"
}
```

**2. Secure Start URL**
```json
// ✅ Good: HTTPS with specific path
{
  "start_url": "https://yourapp.com/app/?utm_source=pwa"
}

// ❌ Bad: HTTP or ambiguous path
{
  "start_url": "http://yourapp.com/"
}
```

**3. Icon Security**
```json
// ✅ Good: Same-origin icons with proper sizes
{
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}

// ❌ Bad: External CDN icons (potential security risk)
{
  "icons": [
    {
      "src": "https://cdn.example.com/icon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Manifest Validation

Use tools to validate your manifest security:

```javascript
// manifest-validator.js
function validateManifest(manifest) {
  const issues = [];
  
  // Check scope restriction
  if (manifest.scope === '/' || !manifest.scope) {
    issues.push('Scope is too broad - consider restricting to specific paths');
  }
  
  // Check HTTPS start_url
  if (!manifest.start_url?.startsWith('https://')) {
    issues.push('start_url should use HTTPS');
  }
  
  // Check same-origin icons
  manifest.icons?.forEach(icon => {
    if (icon.src.startsWith('http') && !icon.src.includes(window.location.hostname)) {
      issues.push(`External icon detected: ${icon.src}`);
    }
  });
  
  return issues;
}
```

## HTTPS Everywhere

HTTPS isn't optional for PWAs—it's a hard requirement. Service Workers, many Web APIs, and PWA installation all require secure contexts.

### Why HTTPS is Mandatory

**1. Service Worker Requirement**
```javascript
// This will FAIL on HTTP
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js'); // Requires HTTPS
}
```

**2. Secure Web APIs**
```javascript
// These APIs require HTTPS
navigator.geolocation.getCurrentPosition(); // Requires HTTPS in modern browsers
navigator.mediaDevices.getUserMedia(); // Always requires HTTPS
navigator.serviceWorker.register(); // Requires HTTPS (except localhost)
```

**3. PWA Installation**
```javascript
// Installation prompts only work over HTTPS
window.addEventListener('beforeinstallprompt', (e) => {
  // This event only fires on HTTPS
  showInstallPrompt(e);
});
```

### HTTPS Implementation Strategies

**1. Development Setup**
```javascript
// next.config.js - Development HTTPS
const nextConfig = {
  experimental: {
    https: true, // Enable HTTPS in development
  },
  // Alternative: Use local SSL certificates
  server: {
    https: {
      key: 'path/to/private-key.pem',
      cert: 'path/to/certificate.pem',
    },
  },
};
```

**2. Production Deployment**
```yaml
# docker-compose.yml - Production HTTPS with reverse proxy
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
  
  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - app
```

**3. HTTPS Redirects**
```javascript
// middleware.js - Force HTTPS redirects
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production' && 
      request.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
```

### HTTPS Best Practices

**1. HSTS Headers**
```javascript
// next.config.js - Force HTTPS with HSTS
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};
```

**2. Certificate Management**
```bash
# Automated certificate renewal with Let's Encrypt
certbot certonly --webroot -w /var/www/html -d yourapp.com
```

## Content Security Policy (CSP)

Content Security Policy is your application's defense against XSS attacks and unauthorized resource loading.

### Production-Ready CSP Configuration

```javascript
// next.config.js - Comprehensive CSP setup
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' blob:",
              "connect-src 'self' https://api.yourapp.com wss://api.yourapp.com",
              "worker-src 'self' blob:",
              "child-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "manifest-src 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};
```

### CSP Directive Explanations

**Core Directives:**
```javascript
// Understanding each CSP directive
const cspDirectives = {
  "default-src": "'self'", // Fallback for all resource types
  "script-src": "'self' 'unsafe-eval'", // JavaScript sources
  "style-src": "'self' 'unsafe-inline'", // CSS sources
  "img-src": "'self' data: https:", // Image sources
  "font-src": "'self' https://fonts.gstatic.com", // Font sources
  "connect-src": "'self' https://api.yourapp.com", // XHR, WebSocket, EventSource
  "media-src": "'self' blob:", // Video and audio sources
  "object-src": "'none'", // Plugins (Flash, etc.)
  "frame-src": "'self'", // Embedded frames
  "worker-src": "'self' blob:", // Web Workers and Service Workers
  "manifest-src": "'self'", // Web App Manifest
  "base-uri": "'self'", // Base element href
  "form-action": "'self'", // Form submission targets
  "frame-ancestors": "'none'" // Who can embed this page
};
```

### Removing Unsafe Directives

**1. Replace 'unsafe-inline' for Scripts**
```javascript
// ❌ Bad: Using unsafe-inline
<script>
  const data = { user: 'John' };
  processData(data);
</script>

// ✅ Good: External script file
// pages/api/nonce.js - Generate nonce for inline scripts
export default function handler(req, res) {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader('X-Script-Nonce', nonce);
  res.json({ nonce });
}

// Use nonce in CSP
"script-src 'self' 'nonce-${nonce}'"
```

**2. Replace 'unsafe-eval'**
```javascript
// ❌ Bad: Using eval
const userFunction = new Function('return ' + userInput);

// ✅ Good: Safe alternatives
const allowedFunctions = {
  calculate: (a, b) => a + b,
  format: (str) => str.toUpperCase()
};

const safeExecute = (funcName, ...args) => {
  if (allowedFunctions[funcName]) {
    return allowedFunctions[funcName](...args);
  }
  throw new Error('Function not allowed');
};
```

### CSP Testing and Monitoring

```javascript
// CSP violation reporting
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "report-uri /api/csp-violation-report"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

// pages/api/csp-violation-report.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('CSP Violation:', req.body);
    // Log to your monitoring service
    // analytics.track('csp_violation', req.body);
  }
  res.status(204).end();
}
```

## Security Headers

Beyond CSP, several other headers provide essential security protections.

### Essential Security Headers

```javascript
// next.config.js - Complete security headers
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Enable XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: [
              'geolocation=(self)',
              'microphone=()',
              'camera=(self)',
              'payment=(self)',
              'usb=()',
              'magnetometer=()',
              'accelerometer=()',
              'gyroscope=()'
            ].join(', ')
          },
          // Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};
```

### Header-by-Header Breakdown

**1. X-Frame-Options**
```javascript
// Prevent clickjacking attacks
{
  key: 'X-Frame-Options',
  value: 'DENY' // or 'SAMEORIGIN' if you need iframes
}
```

**2. X-Content-Type-Options**
```javascript
// Prevent MIME type confusion attacks
{
  key: 'X-Content-Type-Options',
  value: 'nosniff'
}
```

**3. Permissions Policy**
```javascript
// Control which browser features can be used
{
  key: 'Permissions-Policy',
  value: [
    'geolocation=(self "https://maps.googleapis.com")', // Allow geolocation from trusted sources
    'camera=(self)', // Allow camera only for same origin
    'microphone=()', // Disable microphone entirely
    'payment=(self)', // Allow payment API for same origin
    'usb=()', // Disable USB API
    'bluetooth=()' // Disable Bluetooth API
  ].join(', ')
}
```

### Header Testing

```javascript
// Test security headers
async function testSecurityHeaders(url) {
  const response = await fetch(url);
  const headers = response.headers;
  
  const requiredHeaders = [
    'content-security-policy',
    'x-frame-options',
    'x-content-type-options',
    'strict-transport-security'
  ];
  
  const missingHeaders = requiredHeaders.filter(
    header => !headers.has(header)
  );
  
  if (missingHeaders.length > 0) {
    console.warn('Missing security headers:', missingHeaders);
  }
  
  return {
    secure: missingHeaders.length === 0,
    missing: missingHeaders,
    present: requiredHeaders.filter(header => headers.has(header))
  };
}
```

## Application-Level Security

### Input Validation

**Client-Side Validation (First Line of Defense)**
```typescript
// Form validation with security in mind
import { z } from 'zod';

const userInputSchema = z.object({
  email: z.string().email().max(254), // RFC 5321 limit
  name: z.string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed'),
  message: z.string()
    .min(1)
    .max(1000)
    .refine(val => !/<script|javascript:|data:/i.test(val), 'Potentially unsafe content detected')
});

function validateUserInput(input: unknown) {
  try {
    return userInputSchema.parse(input);
  } catch (error) {
    throw new Error('Invalid input detected');
  }
}
```

**Server-Side Validation (Critical Defense)**
```typescript
// pages/api/secure-endpoint.ts
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

const requestSchema = z.object({
  content: z.string().max(5000),
  category: z.enum(['general', 'support', 'billing'])
});

export default async function handler(req, res) {
  try {
    // 1. Validate input structure
    const validatedInput = requestSchema.parse(req.body);
    
    // 2. Sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(validatedInput.content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
      ALLOWED_ATTR: []
    });
    
    // 3. Additional validation
    if (sanitizedContent !== validatedInput.content) {
      return res.status(400).json({ error: 'Content contains unsafe HTML' });
    }
    
    // 4. Process safely
    await processUserContent(sanitizedContent, validatedInput.category);
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
}
```

### Rate Limiting

```typescript
// lib/rate-limiter.ts
import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 60 * 1000 // 1 minute
});

export function checkRateLimit(identifier: string, limit: number = 10): boolean {
  const current = rateLimit.get(identifier) || 0;
  
  if (current >= limit) {
    return false;
  }
  
  rateLimit.set(identifier, current + 1);
  return true;
}

// Usage in API routes
export default async function handler(req, res) {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  if (!checkRateLimit(clientIP, 10)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  // Process request
}
```

## Authentication and Authorization

The Acrobi Design System provides secure authentication through the `useWebAuthn` hook for passwordless authentication.

### WebAuthn Integration

```typescript
// Using the secure useWebAuthn hook
import { useWebAuthn } from '@acrobi/ui/hooks/use-webauthn';

function SecureLoginForm() {
  const { register, authenticate, isSupported } = useWebAuthn();
  
  const handleSecureLogin = async () => {
    try {
      if (!isSupported) {
        // Fallback to traditional auth
        return handleTraditionalLogin();
      }
      
      const credential = await authenticate();
      
      // Send credential to server for verification
      await fetch('/api/auth/webauthn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential)
      });
      
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };
  
  return (
    <button onClick={handleSecureLogin}>
      {isSupported ? 'Sign in with Biometrics' : 'Sign in with Password'}
    </button>
  );
}
```

**Learn more**: [WebAuthn Implementation Guide](../hooks/use-webauthn)

### JWT Security

```typescript
// Secure JWT handling
import jwt from 'jsonwebtoken';

// Server-side JWT creation
function createSecureToken(userId: string) {
  return jwt.sign(
    { userId, type: 'access' },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
      issuer: 'yourapp.com',
      audience: 'yourapp.com',
      algorithm: 'HS256'
    }
  );
}

// Client-side secure storage (avoid localStorage for sensitive data)
class SecureTokenStorage {
  private static readonly TOKEN_KEY = 'auth_token';
  
  static store(token: string) {
    // Use httpOnly cookies instead of localStorage for production
    document.cookie = `${this.TOKEN_KEY}=${token}; secure; samesite=strict; max-age=900`;
  }
  
  static retrieve(): string | null {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith(this.TOKEN_KEY));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  
  static clear() {
    document.cookie = `${this.TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
```

## Data Storage Security

### Secure vs. Insecure Storage Options

**❌ Insecure: localStorage for Sensitive Data**
```javascript
// Don't store sensitive data in localStorage
localStorage.setItem('userToken', token); // Accessible to any script
localStorage.setItem('creditCard', cardNumber); // Never do this!
```

**✅ Secure: Appropriate Storage by Data Type**

```typescript
// 1. HTTP-Only Cookies for Authentication
// Set from server only
res.setHeader('Set-Cookie', [
  `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=900`,
  `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/api/auth`
]);

// 2. Encrypted IndexedDB for Offline Data
import { openDB } from 'idb';
import CryptoJS from 'crypto-js';

class SecureOfflineStorage {
  private db: any;
  private encryptionKey: string;
  
  constructor(encryptionKey: string) {
    this.encryptionKey = encryptionKey;
  }
  
  async init() {
    this.db = await openDB('SecureAppDB', 1, {
      upgrade(db) {
        db.createObjectStore('userData');
      }
    });
  }
  
  async storeSecurely(key: string, data: any) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.encryptionKey
    ).toString();
    
    await this.db.put('userData', encrypted, key);
  }
  
  async retrieveSecurely(key: string) {
    const encrypted = await this.db.get('userData', key);
    if (!encrypted) return null;
    
    const decrypted = CryptoJS.AES.decrypt(encrypted, this.encryptionKey);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
}

// 3. SessionStorage for Temporary UI State
sessionStorage.setItem('currentTab', 'dashboard'); // OK for non-sensitive data
```

### Data Classification

```typescript
// Classify data by sensitivity level
enum DataSensitivity {
  PUBLIC = 'public',           // Can be stored anywhere
  INTERNAL = 'internal',       // Encrypted storage only
  CONFIDENTIAL = 'confidential', // Server-side only
  RESTRICTED = 'restricted'    // Encrypted server-side + audit trail
}

interface DataClassification {
  level: DataSensitivity;
  storageMethod: 'none' | 'localStorage' | 'sessionStorage' | 'indexedDB' | 'httpOnly' | 'server';
  encryptionRequired: boolean;
}

const dataClassificationRules: Record<string, DataClassification> = {
  'user.preferences': { level: DataSensitivity.PUBLIC, storageMethod: 'localStorage', encryptionRequired: false },
  'session.tempData': { level: DataSensitivity.INTERNAL, storageMethod: 'sessionStorage', encryptionRequired: false },
  'user.personalInfo': { level: DataSensitivity.CONFIDENTIAL, storageMethod: 'httpOnly', encryptionRequired: true },
  'payment.info': { level: DataSensitivity.RESTRICTED, storageMethod: 'server', encryptionRequired: true }
};
```

## Dependency Security

### Automated Security Auditing

```bash
# Regular dependency auditing
npm audit --audit-level high
npm audit fix

# Advanced scanning with additional tools
npx audit-ci --high
npx better-npm-audit audit
```

**Package.json Security Configuration**
```json
{
  "scripts": {
    "security:audit": "npm audit --audit-level high",
    "security:fix": "npm audit fix",
    "security:check": "npm run security:audit && npx audit-ci --high",
    "precommit": "npm run security:check && npm run lint && npm run test"
  },
  "auditConfig": {
    "report-type": "full",
    "audit-level": "moderate"
  }
}
```

### Dependency Pinning

```json
// package.json - Pin exact versions for security
{
  "dependencies": {
    "react": "18.2.0",           // Exact version
    "next": "13.4.19",          // Exact version
    "@acrobi/ui": "^1.0.0"      // Allow patch updates for internal packages
  },
  "devDependencies": {
    "typescript": "5.1.6",      // Exact version for build consistency
    "eslint": "8.45.0"          // Exact version
  }
}
```

### Supply Chain Security

```javascript
// .npmrc - Secure package registry configuration
registry=https://registry.npmjs.org/
audit-level=moderate
fund=false
save-exact=true
package-lock=true

// Verify package integrity
npm install --ignore-scripts  // Disable potentially dangerous scripts
npm ci --only=production      // Install from lockfile only
```

## Security Testing Checklist

### Automated Security Testing

```javascript
// security-tests.js - Automated security testing
import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
  test('should have secure headers', async ({ page }) => {
    const response = await page.goto('/');
    
    // Test security headers
    expect(response.headers()['x-frame-options']).toBe('DENY');
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['strict-transport-security']).toContain('max-age=');
    expect(response.headers()['content-security-policy']).toBeTruthy();
  });
  
  test('should enforce HTTPS redirect', async ({ page }) => {
    // Test HTTP to HTTPS redirect
    const response = await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle' 
    });
    expect(page.url()).toMatch(/^https:/);
  });
  
  test('should sanitize user input', async ({ page }) => {
    await page.goto('/contact');
    
    // Test XSS prevention
    await page.fill('#message', '<script>alert("xss")</script>');
    await page.click('#submit');
    
    // Should not execute script
    const alerts = [];
    page.on('dialog', dialog => {
      alerts.push(dialog.message());
      dialog.dismiss();
    });
    
    expect(alerts).toHaveLength(0);
  });
});
```

### Manual Security Testing

**1. Authentication Testing**
- [ ] Test password strength requirements
- [ ] Verify account lockout mechanisms
- [ ] Test session timeout functionality
- [ ] Verify secure logout (clears all tokens)
- [ ] Test WebAuthn fallback mechanisms

**2. Authorization Testing**
- [ ] Test role-based access controls
- [ ] Verify API endpoint authorization
- [ ] Test privilege escalation prevention
- [ ] Check resource access controls

**3. Input Validation Testing**
- [ ] Test XSS prevention in all input fields
- [ ] Verify SQL injection protection
- [ ] Test file upload restrictions
- [ ] Check for command injection vulnerabilities

**4. Session Management**
- [ ] Verify secure session creation
- [ ] Test session fixation prevention
- [ ] Check concurrent session limits
- [ ] Test secure session termination

**5. Data Protection**
- [ ] Verify encryption of sensitive data
- [ ] Test secure data transmission
- [ ] Check for data leakage in logs
- [ ] Verify secure data deletion

### Security Monitoring

```typescript
// lib/security-monitor.ts
interface SecurityEvent {
  type: 'login_attempt' | 'csp_violation' | 'rate_limit_exceeded' | 'suspicious_activity';
  userId?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  details: Record<string, any>;
}

class SecurityMonitor {
  static async logSecurityEvent(event: SecurityEvent) {
    // Log to your security monitoring service
    console.warn('Security Event:', event);
    
    // Send to external monitoring (e.g., Sentry, DataDog)
    if (process.env.NODE_ENV === 'production') {
      await fetch('/api/security/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    }
  }
  
  static async checkSuspiciousActivity(userId: string, ip: string): Promise<boolean> {
    // Implement suspicious activity detection logic
    const recentEvents = await this.getRecentEvents(userId, ip);
    
    // Example: More than 10 failed login attempts in 5 minutes
    const failedLogins = recentEvents.filter(
      e => e.type === 'login_attempt' && 
           e.details.success === false &&
           Date.now() - e.timestamp.getTime() < 5 * 60 * 1000
    );
    
    return failedLogins.length > 10;
  }
}
```

## Production Security Deployment

### Environment Security

```bash
# .env.example - Template for secure environment variables
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/db"

# Authentication
JWT_SECRET="generate-a-strong-random-secret-key"
WEBAUTHN_RP_ID="yourapp.com"
WEBAUTHN_RP_NAME="Your App Name"

# External Services
STRIPE_SECRET_KEY="sk_live_..."
SENDGRID_API_KEY="SG...."

# Security
CSP_REPORT_URI="/api/csp-violation"
RATE_LIMIT_MAX="100"
SESSION_TIMEOUT="900" # 15 minutes

# Never commit actual values - use secure secret management
```

### Docker Security

```dockerfile
# Dockerfile - Security-focused container
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY --chown=nextjs:nodejs . .

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
```

## Emergency Response Plan

### Security Incident Response

```typescript
// lib/incident-response.ts
interface SecurityIncident {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  description: string;
  affectedUsers?: string[];
  containmentActions: string[];
  timestamp: Date;
}

class IncidentResponse {
  static async reportIncident(incident: SecurityIncident) {
    // 1. Immediate containment
    if (incident.severity === 'critical') {
      await this.enableMaintenanceMode();
    }
    
    // 2. Log incident
    console.error('Security Incident:', incident);
    
    // 3. Notify security team
    await this.notifySecurityTeam(incident);
    
    // 4. Begin investigation
    await this.startInvestigation(incident);
  }
  
  private static async enableMaintenanceMode() {
    // Temporarily disable the application
    process.env.MAINTENANCE_MODE = 'true';
  }
  
  private static async notifySecurityTeam(incident: SecurityIncident) {
    // Send alerts to security team
    // Implementation depends on your alerting system
  }
}
```

## Related Security Resources

### Internal Documentation
- [WebAuthn Authentication Guide](../hooks/use-webauthn)
- [Feature Detection Security](../hooks/use-feature-detection)
- [Platform Detection](../hooks/use-platform)

### External Security Resources
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **MDN Web Security**: https://developer.mozilla.org/en-US/docs/Web/Security
- **CSP Reference**: https://content-security-policy.com/
- **Security Headers**: https://securityheaders.com/

### Security Tools
- **Lighthouse Security Audit**: Built into Chrome DevTools
- **Mozilla Observatory**: https://observatory.mozilla.org/
- **Security Headers Scanner**: https://securityheaders.com/
- **npm audit**: Built into npm for dependency scanning

Building secure PWAs requires a layered approach combining manifest security, transport security, application security, and ongoing monitoring. This guide provides the foundation for implementing production-ready security measures in your PWA.

Remember: Security is not a one-time implementation but an ongoing process that requires regular updates, monitoring, and incident response capabilities.