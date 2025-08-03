# PWA Protocol Handlers Guide

A comprehensive guide to implementing custom protocol handlers in Progressive Web Apps, enabling deep linking and protocol scheme registration for enhanced user experiences.

## Table of Contents

- [Overview](#overview)
- [Protocol Handler Basics](#protocol-handler-basics)
- [Implementation Examples](#implementation-examples)
- [TypeScript Integration](#typescript-integration)
- [Security Considerations](#security-considerations)
- [Browser Support](#browser-support)
- [Testing & Debugging](#testing--debugging)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Troubleshooting](#troubleshooting)

## Overview

Protocol handlers allow your PWA to register as a handler for specific URL schemes, enabling deep linking capabilities and seamless integration with the operating system. When users click links with registered protocols, your PWA can handle them directly.

### Key Benefits

- **Deep Linking**: Direct navigation to specific app sections
- **OS Integration**: Register as system-level protocol handler
- **Enhanced UX**: Seamless transitions from external sources
- **Cross-Platform**: Works across different operating systems
- **Custom Protocols**: Support for application-specific schemes

### Common Use Cases

- **Email Clients**: Handle `mailto:` links
- **Communication Apps**: Handle `tel:`, `sms:` links  
- **Social Media**: Handle custom `web+yourapp:` schemes
- **File Sharing**: Handle `web+share:` protocols
- **Calendar Apps**: Handle `webcal:` schemes

## Protocol Handler Basics

### Manifest Configuration

Protocol handlers are defined in your web app manifest using the `protocol_handlers` array:

```json
{
  "name": "My PWA",
  "protocol_handlers": [
    {
      "protocol": "mailto",
      "url": "/handle-email?url=%s",
      "title": "My Email Client"
    },
    {
      "protocol": "web+myapp",
      "url": "/handle-custom?protocol=%s",
      "title": "My App Handler"
    }
  ]
}
```

### Protocol Handler Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `protocol` | string | Yes | The protocol scheme to handle |
| `url` | string | Yes | URL template with `%s` placeholder |
| `title` | string | No | Human-readable description |

### URL Template Format

The `url` property uses `%s` as a placeholder for the complete protocol URL:

```typescript
// For protocol: "mailto"
// Input: "mailto:user@example.com?subject=Hello"
// Template: "/handle-email?url=%s"
// Result: "/handle-email?url=mailto%3Auser%40example.com%3Fsubject%3DHello"
```

## Implementation Examples

### 1. Email Handler (Standard Protocol)

```typescript
// manifest.json
{
  "protocol_handlers": [
    {
      "protocol": "mailto",
      "url": "/mail/compose?url=%s",
      "title": "Compose Email"
    }
  ]
}
```

```typescript
// /mail/compose handler
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ParsedMailto {
  to: string;
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
}

export function ComposeEmail() {
  const [searchParams] = useSearchParams();
  const [emailData, setEmailData] = useState<ParsedMailto | null>(null);

  useEffect(() => {
    const protocolUrl = searchParams.get('url');
    if (protocolUrl && protocolUrl.startsWith('mailto:')) {
      const parsed = parseMailtoUrl(protocolUrl);
      setEmailData(parsed);
    }
  }, [searchParams]);

  const parseMailtoUrl = (mailtoUrl: string): ParsedMailto => {
    try {
      const url = new URL(mailtoUrl);
      const searchParams = new URLSearchParams(url.search);
      
      return {
        to: url.pathname,
        subject: searchParams.get('subject') || undefined,
        body: searchParams.get('body') || undefined,
        cc: searchParams.get('cc') || undefined,
        bcc: searchParams.get('bcc') || undefined,
      };
    } catch (error) {
      console.error('Failed to parse mailto URL:', error);
      return { to: '' };
    }
  };

  if (!emailData) {
    return <div>Loading email composer...</div>;
  }

  return (
    <div className="email-composer">
      <h2>Compose Email</h2>
      <form>
        <div>
          <label htmlFor="to">To:</label>
          <input 
            id="to" 
            type="email" 
            defaultValue={emailData.to} 
            required 
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input 
            id="subject" 
            type="text" 
            defaultValue={emailData.subject || ''} 
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea 
            id="body" 
            rows={10} 
            defaultValue={emailData.body || ''}
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}
```

### 2. Custom Protocol Handler

```typescript
// manifest.json
{
  "protocol_handlers": [
    {
      "protocol": "web+taskmanager",
      "url": "/handle-task?action=%s",
      "title": "Task Manager"
    }
  ]
}
```

```typescript
// /handle-task handler
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface TaskAction {
  action: 'create' | 'edit' | 'view' | 'delete';
  taskId?: string;
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

export function TaskHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [taskAction, setTaskAction] = useState<TaskAction | null>(null);

  useEffect(() => {
    const actionParam = searchParams.get('action');
    if (actionParam && actionParam.startsWith('web+taskmanager:')) {
      const parsed = parseTaskProtocol(actionParam);
      setTaskAction(parsed);
      
      // Auto-redirect based on action
      if (parsed) {
        handleTaskAction(parsed);
      }
    }
  }, [searchParams, navigate]);

  const parseTaskProtocol = (protocolUrl: string): TaskAction | null => {
    try {
      // Format: web+taskmanager://create?title=Task&priority=high
      // Format: web+taskmanager://edit/123?title=Updated
      // Format: web+taskmanager://view/123
      
      const url = new URL(protocolUrl);
      const pathParts = url.pathname.split('/').filter(Boolean);
      const action = pathParts[0] as TaskAction['action'];
      const taskId = pathParts[1];
      
      const searchParams = new URLSearchParams(url.search);
      
      return {
        action,
        taskId,
        title: searchParams.get('title') || undefined,
        description: searchParams.get('description') || undefined,
        priority: (searchParams.get('priority') as TaskAction['priority']) || undefined,
      };
    } catch (error) {
      console.error('Failed to parse task protocol URL:', error);
      return null;
    }
  };

  const handleTaskAction = (action: TaskAction) => {
    switch (action.action) {
      case 'create':
        navigate('/tasks/new', { 
          state: { 
            title: action.title, 
            description: action.description,
            priority: action.priority 
          }
        });
        break;
      case 'edit':
        if (action.taskId) {
          navigate(`/tasks/${action.taskId}/edit`, {
            state: { title: action.title, description: action.description }
          });
        }
        break;
      case 'view':
        if (action.taskId) {
          navigate(`/tasks/${action.taskId}`);
        } else {
          navigate('/tasks');
        }
        break;
      case 'delete':
        if (action.taskId) {
          navigate(`/tasks/${action.taskId}/delete`);
        }
        break;
      default:
        navigate('/tasks');
    }
  };

  return (
    <div className="task-handler">
      <h2>Processing Task Action...</h2>
      {taskAction && (
        <div>
          <p>Action: {taskAction.action}</p>
          {taskAction.taskId && <p>Task ID: {taskAction.taskId}</p>}
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
}
```

### 3. Social Media Integration

```typescript
// manifest.json
{
  "protocol_handlers": [
    {
      "protocol": "web+share",
      "url": "/share?content=%s",
      "title": "Share Content"
    }
  ]
}
```

```typescript
// Share handler with rich content support
interface ShareContent {
  type: 'text' | 'url' | 'image' | 'video';
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  videoUrl?: string;
  tags?: string[];
}

export function ShareHandler() {
  const [searchParams] = useSearchParams();
  const [shareContent, setShareContent] = useState<ShareContent | null>(null);

  useEffect(() => {
    const contentParam = searchParams.get('content');
    if (contentParam && contentParam.startsWith('web+share:')) {
      const parsed = parseShareProtocol(contentParam);
      setShareContent(parsed);
    }
  }, [searchParams]);

  const parseShareProtocol = (protocolUrl: string): ShareContent | null => {
    try {
      // Format: web+share://text?title=Title&description=Desc&tags=tag1,tag2
      // Format: web+share://url?url=https://example.com&title=Title
      // Format: web+share://image?url=https://example.com/image.jpg&title=Title
      
      const url = new URL(protocolUrl);
      const type = url.hostname as ShareContent['type'];
      const searchParams = new URLSearchParams(url.search);
      
      return {
        type,
        title: searchParams.get('title') || undefined,
        description: searchParams.get('description') || undefined,
        url: searchParams.get('url') || undefined,
        imageUrl: searchParams.get('imageUrl') || undefined,
        videoUrl: searchParams.get('videoUrl') || undefined,
        tags: searchParams.get('tags')?.split(',') || undefined,
      };
    } catch (error) {
      console.error('Failed to parse share protocol URL:', error);
      return null;
    }
  };

  if (!shareContent) {
    return <div>Loading share content...</div>;
  }

  return (
    <div className="share-handler">
      <h2>Share Content</h2>
      <div className="share-preview">
        {shareContent.type === 'image' && shareContent.imageUrl && (
          <img src={shareContent.imageUrl} alt={shareContent.title} />
        )}
        {shareContent.type === 'video' && shareContent.videoUrl && (
          <video src={shareContent.videoUrl} controls />
        )}
        <h3>{shareContent.title}</h3>
        <p>{shareContent.description}</p>
        {shareContent.url && (
          <a href={shareContent.url} target="_blank" rel="noopener noreferrer">
            {shareContent.url}
          </a>
        )}
        {shareContent.tags && (
          <div className="tags">
            {shareContent.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => handleShare(shareContent)}>
        Share to My Network
      </button>
    </div>
  );
}
```

## TypeScript Integration

### Using Acrobi's PWA Types

```typescript
import { ProtocolHandler, WebAppManifest } from '@acrobi/ui';

// Define protocol handlers with type safety
const emailHandler: ProtocolHandler = {
  protocol: 'mailto',
  url: '/mail/compose?url=%s',
  title: 'Compose Email'
};

const customHandler: ProtocolHandler = {
  protocol: 'web+myapp',
  url: '/handle-custom?protocol=%s',
  title: 'My App Handler'
};

// Integrate into manifest
const manifest: WebAppManifest = {
  name: 'My PWA',
  short_name: 'MyPWA',
  start_url: '/',
  protocol_handlers: [emailHandler, customHandler],
  // ... other manifest properties
};
```

### Protocol Handler Utilities

```typescript
/**
 * Utility class for working with protocol handlers
 */
export class ProtocolHandlerUtils {
  /**
   * Parse a protocol URL and extract components
   */
  static parseProtocolUrl(protocolUrl: string): {
    protocol: string;
    path: string;
    params: URLSearchParams;
  } {
    try {
      const url = new URL(protocolUrl);
      return {
        protocol: url.protocol.replace(':', ''),
        path: url.pathname,
        params: new URLSearchParams(url.search),
      };
    } catch (error) {
      throw new Error(`Invalid protocol URL: ${protocolUrl}`);
    }
  }

  /**
   * Validate protocol handler configuration
   */
  static validateProtocolHandler(handler: ProtocolHandler): string[] {
    const errors: string[] = [];

    if (!handler.protocol) {
      errors.push('Protocol is required');
    } else if (!handler.protocol.match(/^[a-z][a-z0-9+.-]*$/i)) {
      errors.push('Invalid protocol format');
    }

    if (!handler.url) {
      errors.push('URL template is required');
    } else if (!handler.url.includes('%s')) {
      errors.push('URL template must include %s placeholder');
    }

    if (handler.protocol.startsWith('web+') && handler.protocol.length < 5) {
      errors.push('Custom protocols must be at least 5 characters');
    }

    return errors;
  }

  /**
   * Check if a protocol is supported by the browser
   */
  static isProtocolSupported(protocol: string): boolean {
    try {
      // Standard protocols that are widely supported
      const standardProtocols = [
        'mailto', 'tel', 'sms', 'http', 'https', 'ftp', 'file'
      ];

      if (standardProtocols.includes(protocol)) {
        return true;
      }

      // Custom protocols (web+) require PWA installation
      if (protocol.startsWith('web+')) {
        return 'serviceWorker' in navigator && 'permissions' in navigator;
      }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * Generate protocol URLs for testing
   */
  static generateProtocolUrl(
    protocol: string, 
    params: Record<string, string>
  ): string {
    const url = new URL(`${protocol}://`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  }
}
```

### React Hooks for Protocol Handling

```typescript
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook for handling protocol URLs in React components
 */
export function useProtocolHandler<T>(
  protocolPrefix: string,
  parser: (url: string) => T | null
) {
  const [searchParams] = useSearchParams();
  const [protocolData, setProtocolData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processProtocol = () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check for protocol URL in search params
        const urlParam = searchParams.get('url') || 
                        searchParams.get('protocol') || 
                        searchParams.get('action');

        if (urlParam && urlParam.startsWith(protocolPrefix)) {
          const parsed = parser(urlParam);
          setProtocolData(parsed);
        } else {
          setProtocolData(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse protocol');
        setProtocolData(null);
      } finally {
        setIsLoading(false);
      }
    };

    processProtocol();
  }, [searchParams, protocolPrefix, parser]);

  return { protocolData, isLoading, error };
}

// Usage example
export function EmailComposer() {
  const { protocolData, isLoading, error } = useProtocolHandler(
    'mailto:',
    (url) => {
      const parsed = new URL(url);
      return {
        to: parsed.pathname,
        subject: parsed.searchParams.get('subject'),
        body: parsed.searchParams.get('body'),
      };
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!protocolData) return <div>No email data found</div>;

  return (
    <EmailForm
      to={protocolData.to}
      subject={protocolData.subject}
      body={protocolData.body}
    />
  );
}
```

## Security Considerations

### 1. Protocol Validation

Always validate protocol URLs to prevent security vulnerabilities:

```typescript
export class ProtocolSecurityUtils {
  private static readonly ALLOWED_PROTOCOLS = new Set([
    'mailto', 'tel', 'sms', 'web+myapp'
  ]);

  static validateProtocolUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      const protocol = parsed.protocol.replace(':', '');
      
      // Check if protocol is in allowed list
      if (!this.ALLOWED_PROTOCOLS.has(protocol)) {
        return false;
      }

      // Additional validation for custom protocols
      if (protocol.startsWith('web+')) {
        return this.validateCustomProtocol(parsed);
      }

      return true;
    } catch {
      return false;
    }
  }

  private static validateCustomProtocol(url: URL): boolean {
    // Validate custom protocol format and content
    const maxLength = 2048; // Reasonable URL length limit
    if (url.toString().length > maxLength) {
      return false;
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /<script/i,
      /on\w+=/i,
    ];

    return !suspiciousPatterns.some(pattern => 
      pattern.test(url.toString())
    );
  }
}
```

### 2. Content Sanitization

Sanitize all protocol handler inputs:

```typescript
import DOMPurify from 'dompurify';

export function sanitizeProtocolInput(input: string): string {
  // Remove potentially dangerous content
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
  });

  // Additional custom sanitization
  return sanitized
    .replace(/[<>'"]/g, '') // Remove dangerous characters
    .trim()
    .substring(0, 1000); // Limit length
}
```

### 3. Origin Validation

Verify the origin of protocol handler requests:

```typescript
export function validateProtocolOrigin(request: Request): boolean {
  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');
  
  // Only allow requests from trusted origins
  const trustedOrigins = [
    'https://yourdomain.com',
    'https://app.yourdomain.com',
  ];

  return trustedOrigins.some(trusted => 
    origin?.startsWith(trusted) || referer?.startsWith(trusted)
  );
}
```

## Browser Support

### Compatibility Matrix

| Browser | Protocol Handlers | Custom Protocols | Notes |
|---------|------------------|------------------|-------|
| Chrome 89+ | ✅ Full | ✅ Yes | Requires PWA installation |
| Firefox 84+ | ✅ Limited | ❌ No | Standard protocols only |
| Safari 14+ | ⚠️ Partial | ❌ No | iOS limited support |
| Edge 89+ | ✅ Full | ✅ Yes | Same as Chrome |

### Feature Detection

```typescript
export function checkProtocolHandlerSupport(): {
  basicSupport: boolean;
  customProtocols: boolean;
  installRequired: boolean;
} {
  const hasNavigator = typeof navigator !== 'undefined';
  const hasServiceWorker = hasNavigator && 'serviceWorker' in navigator;
  const hasManifest = hasNavigator && 'manifest' in navigator;
  
  // Basic protocol handler support
  const basicSupport = hasServiceWorker && hasManifest;
  
  // Custom protocol support (requires PWA installation)
  const customProtocols = basicSupport && 
    'standalone' in window.matchMedia('(display-mode: standalone)');
  
  // Installation requirement check
  const installRequired = !window.matchMedia('(display-mode: standalone)').matches;

  return {
    basicSupport,
    customProtocols,
    installRequired,
  };
}
```

### Progressive Enhancement

```typescript
export function ProtocolHandlerWithFallback({ 
  protocolUrl, 
  fallbackUrl, 
  children 
}: {
  protocolUrl: string;
  fallbackUrl: string;
  children: React.ReactNode;
}) {
  const [supportsProtocol, setSupportsProtocol] = useState(false);

  useEffect(() => {
    const support = checkProtocolHandlerSupport();
    setSupportsProtocol(support.basicSupport);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!supportsProtocol) {
      e.preventDefault();
      window.open(fallbackUrl, '_blank');
    }
  };

  return (
    <a 
      href={supportsProtocol ? protocolUrl : fallbackUrl}
      onClick={handleClick}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
```

## Testing & Debugging

### 1. Protocol Handler Testing

```typescript
export class ProtocolHandlerTester {
  static testProtocolHandler(handler: ProtocolHandler): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // Create test URL
        const testUrl = handler.url.replace('%s', 
          encodeURIComponent(`${handler.protocol}://test`));
        
        // Test navigation (in development only)
        if (process.env.NODE_ENV === 'development') {
          const link = document.createElement('a');
          link.href = testUrl;
          link.style.display = 'none';
          document.body.appendChild(link);
          
          // Simulate click
          setTimeout(() => {
            link.click();
            document.body.removeChild(link);
            resolve(true);
          }, 100);
        } else {
          resolve(true);
        }
      } catch (error) {
        console.error('Protocol handler test failed:', error);
        resolve(false);
      }
    });
  }

  static validateAllHandlers(manifest: WebAppManifest): Promise<{
    handler: ProtocolHandler;
    valid: boolean;
    errors: string[];
  }[]> {
    const handlers = manifest.protocol_handlers || [];
    
    return Promise.all(
      handlers.map(async (handler) => {
        const errors = ProtocolHandlerUtils.validateProtocolHandler(handler);
        const valid = errors.length === 0 && 
          await this.testProtocolHandler(handler);

        return { handler, valid, errors };
      })
    );
  }
}
```

### 2. Development Tools

```typescript
// Development helper for protocol testing
export function ProtocolDebugger() {
  const [testResults, setTestResults] = useState<any[]>([]);

  const runTests = async () => {
    const manifest = await fetch('/manifest.json').then(r => r.json());
    const results = await ProtocolHandlerTester.validateAllHandlers(manifest);
    setTestResults(results);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="protocol-debugger">
      <h3>Protocol Handler Debugger</h3>
      <button onClick={runTests}>Test All Handlers</button>
      
      {testResults.map((result, index) => (
        <div key={index} className={`test-result ${result.valid ? 'valid' : 'invalid'}`}>
          <h4>{result.handler.protocol}</h4>
          <p>URL: {result.handler.url}</p>
          <p>Status: {result.valid ? '✅ Valid' : '❌ Invalid'}</p>
          {result.errors.length > 0 && (
            <ul>
              {result.errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
```

### 3. Console Debugging

```typescript
// Add to your app for debugging protocol handling
if (process.env.NODE_ENV === 'development') {
  window.debugProtocolHandlers = {
    testProtocol: (protocol: string, params: Record<string, string>) => {
      const url = ProtocolHandlerUtils.generateProtocolUrl(protocol, params);
      console.log('Testing protocol URL:', url);
      window.location.href = url;
    },
    
    listHandlers: async () => {
      const manifest = await fetch('/manifest.json').then(r => r.json());
      console.table(manifest.protocol_handlers || []);
    },
    
    validateHandler: (handler: ProtocolHandler) => {
      const errors = ProtocolHandlerUtils.validateProtocolHandler(handler);
      console.log('Validation results:', { handler, errors, valid: errors.length === 0 });
    }
  };
}
```

## Best Practices

### 1. Protocol Design

- **Use Descriptive Names**: Make protocol names self-explanatory
- **Follow Conventions**: Use standard formats for common use cases
- **Keep URLs Simple**: Minimize complexity in URL templates
- **Plan for Expansion**: Design protocols to accommodate future features

```typescript
// ✅ Good protocol design
const goodProtocols: ProtocolHandler[] = [
  {
    protocol: 'web+taskmanager',
    url: '/tasks/handle?action=%s',
    title: 'Task Manager'
  },
  {
    protocol: 'mailto',
    url: '/mail/compose?mailto=%s',
    title: 'Email Composer'
  }
];

// ❌ Poor protocol design
const badProtocols: ProtocolHandler[] = [
  {
    protocol: 'x', // Too short and unclear
    url: '/h?u=%s', // Cryptic URL template
    // Missing title
  }
];
```

### 2. User Experience

- **Provide Clear Feedback**: Show users what will happen
- **Handle Errors Gracefully**: Provide fallbacks for unsupported protocols
- **Optimize Performance**: Minimize processing time for protocol handling
- **Test Thoroughly**: Validate all protocol scenarios

```typescript
export function ProtocolLinkWithPreview({ 
  protocolUrl, 
  title, 
  description,
  children 
}: {
  protocolUrl: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="protocol-link-container">
      <button
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        onClick={() => window.location.href = protocolUrl}
        className="protocol-link"
      >
        {children}
      </button>
      
      {showPreview && (
        <div className="protocol-preview">
          <h4>{title}</h4>
          <p>{description}</p>
          <small>Opens in app</small>
        </div>
      )}
    </div>
  );
}
```

### 3. Performance Optimization

```typescript
// Lazy load protocol handlers
const LazyProtocolHandler = React.lazy(() => 
  import('./ProtocolHandler').then(module => ({
    default: module.ProtocolHandler
  }))
);

export function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/handle-protocol" 
          element={
            <Suspense fallback={<div>Loading handler...</div>}>
              <LazyProtocolHandler />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
  );
}
```

## Real-World Examples

### 1. Email Client Integration

```typescript
// Complete email protocol handler implementation
export function EmailProtocolHandler() {
  const { protocolData, isLoading, error } = useProtocolHandler(
    'mailto:',
    parseMailtoUrl
  );

  const [emailForm, setEmailForm] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  });

  useEffect(() => {
    if (protocolData) {
      setEmailForm(prev => ({
        ...prev,
        ...protocolData
      }));
    }
  }, [protocolData]);

  const handleSend = async (formData: typeof emailForm) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      // Show success message
      alert('Email sent successfully!');
    } catch (error) {
      alert('Failed to send email. Please try again.');
    }
  };

  if (isLoading) return <EmailLoadingSpinner />;
  if (error) return <EmailErrorMessage error={error} />;

  return (
    <EmailComposer
      initialData={emailForm}
      onSend={handleSend}
      onCancel={() => window.history.back()}
    />
  );
}
```

### 2. Social Media Sharing

```typescript
// Social sharing protocol handler
export function SocialShareHandler() {
  const { protocolData } = useProtocolHandler(
    'web+share:',
    parseSocialShareUrl
  );

  const [shareOptions, setShareOptions] = useState({
    platforms: ['twitter', 'facebook', 'linkedin'],
    addHashtags: true,
    schedulePost: false
  });

  const handleShare = async (platforms: string[], content: ShareContent) => {
    const sharePromises = platforms.map(platform => 
      shareToSocialPlatform(platform, content)
    );

    try {
      await Promise.all(sharePromises);
      showSuccessMessage('Content shared successfully!');
    } catch (error) {
      showErrorMessage('Some shares failed. Please try again.');
    }
  };

  return (
    <SocialShareComposer
      content={protocolData}
      options={shareOptions}
      onShare={handleShare}
    />
  );
}
```

### 3. Task Management Integration

```typescript
// Task management protocol handler with full CRUD
export function TaskProtocolHandler() {
  const { protocolData } = useProtocolHandler(
    'web+taskmanager:',
    parseTaskManagerUrl
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!protocolData) return;

    const handleTaskAction = async () => {
      switch (protocolData.action) {
        case 'create':
          navigate('/tasks/new', { 
            state: { 
              prefilled: {
                title: protocolData.title,
                description: protocolData.description,
                priority: protocolData.priority,
                dueDate: protocolData.dueDate
              }
            }
          });
          break;

        case 'edit':
          if (protocolData.taskId) {
            navigate(`/tasks/${protocolData.taskId}/edit`, {
              state: { updates: protocolData }
            });
          }
          break;

        case 'complete':
          if (protocolData.taskId) {
            await completeTask(protocolData.taskId);
            navigate('/tasks', { 
              state: { message: 'Task completed!' }
            });
          }
          break;

        case 'view':
          navigate(protocolData.taskId ? 
            `/tasks/${protocolData.taskId}` : 
            '/tasks'
          );
          break;

        default:
          navigate('/tasks');
      }
    };

    handleTaskAction();
  }, [protocolData, navigate]);

  return (
    <div className="task-protocol-handler">
      <h2>Processing Task Action...</h2>
      <p>Redirecting to the appropriate task view...</p>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Protocol Not Recognized**
   ```typescript
   // Check browser support
   const support = checkProtocolHandlerSupport();
   if (!support.basicSupport) {
     console.warn('Protocol handlers not supported');
   }
   ```

2. **Custom Protocols Not Working**
   ```typescript
   // Ensure PWA is installed
   if (!window.matchMedia('(display-mode: standalone)').matches) {
     console.warn('Custom protocols require PWA installation');
   }
   ```

3. **URL Encoding Issues**
   ```typescript
   // Properly encode protocol URLs
   const encodedUrl = encodeURIComponent(protocolUrl);
   const handlerUrl = handlerTemplate.replace('%s', encodedUrl);
   ```

4. **Missing Protocol Handlers**
   ```typescript
   // Validate manifest configuration
   const manifest = await fetch('/manifest.json').then(r => r.json());
   if (!manifest.protocol_handlers) {
     console.error('No protocol handlers defined in manifest');
   }
   ```

### Debug Checklist

- [ ] Manifest includes protocol_handlers array
- [ ] Protocol names follow correct format
- [ ] URL templates include %s placeholder
- [ ] PWA is properly installed (for custom protocols)
- [ ] HTTPS is enabled in production
- [ ] Protocol URLs are properly encoded
- [ ] Handler routes are correctly configured
- [ ] Error handling is implemented

### Error Recovery

```typescript
export function ProtocolErrorBoundary({ 
  children, 
  fallback 
}: {
  children: React.ReactNode;
  fallback: React.ComponentType<{ error: Error }>;
}) {
  return (
    <ErrorBoundary
      fallback={fallback}
      onError={(error, errorInfo) => {
        console.error('Protocol handler error:', error, errorInfo);
        
        // Report to error tracking service
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'exception', {
            description: `Protocol handler error: ${error.message}`,
            fatal: false
          });
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

---

## Next Steps

- **Epic 74**: [PWA App Badging](./app-badging.md) - Badge API integration
- **Epic 73**: [PWA Window Management](./window-management.md) - Multi-window support
- **Epic 72**: [Advanced File System Access](./file-system-access.md) - File API integration
- **Epic 71**: [Web Share Target](./web-share-target.md) - Enhanced sharing capabilities
- **Epic 70**: [Periodic Background Sync](./periodic-background-sync.md) - Background data sync

For questions or contributions, visit our [GitHub repository](https://github.com/acrobi/acrobi-design-system).