# PWA Web Share Target Guide

This guide demonstrates how to configure your Acrobi PWA as a Web Share Target, enabling it to receive shared content from other applications on the user's device.

## Overview

The Web Share Target API allows your PWA to be registered as a destination for content shared from other applications. When users share text, URLs, or files from other apps, your PWA can appear in the system share sheet and receive the shared data.

## Browser Support

- **Chrome/Edge 89+**: Full support (PWA must be installed)
- **Firefox**: Not supported
- **Safari**: Not supported
- **Android**: Chrome/Edge browsers only
- **iOS**: Not supported

## Key Concepts

### Share Target Registration

Share targets are defined in your PWA manifest and require the following:

1. **Action URL**: Where to send the shared data
2. **HTTP Method**: GET or POST
3. **Parameter Mapping**: How to handle shared data
4. **File Support**: Optional file sharing configuration

### Data Types

Your PWA can receive:
- **Text content**: Titles, descriptions, notes
- **URLs**: Links from web pages
- **Files**: Images, documents, media (POST only)

## Implementation

### 1. Define Share Target in Manifest

```typescript
// app/manifest.ts
import type { WebAppManifest, ShareTarget } from '@acrobi/ui/types/pwa';

const shareTarget: ShareTarget = {
  // URL to handle shared content (relative to app scope)
  action: '/share-received',
  
  // HTTP method - GET for text/URLs, POST for files
  method: 'GET',
  
  // Parameter mapping for shared data
  params: {
    title: 'title',    // Maps shared title to ?title= query param
    text: 'text',      // Maps shared text to ?text= query param  
    url: 'url'         // Maps shared URL to ?url= query param
  }
};

export const manifest: WebAppManifest = {
  name: 'My Acrobi App',
  short_name: 'MyApp',
  start_url: '/',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#ffffff',
  
  // Register as share target
  share_target: shareTarget,
  
  icons: [
    {
      src: '/icon-192.png',
      sizes: '192x192',
      type: 'image/png'
    }
  ]
};
```

### 2. Create Share Handler Page

Create a page to handle the shared content:

```typescript
// pages/share-received.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from '@acrobi/ui/components';

interface SharedData {
  title?: string;
  text?: string;
  url?: string;
}

export default function ShareReceived() {
  const router = useRouter();
  const [sharedData, setSharedData] = useState<SharedData>({});
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Extract shared data from query parameters
    const { title, text, url } = router.query;
    
    const data: SharedData = {
      title: Array.isArray(title) ? title[0] : title,
      text: Array.isArray(text) ? text[0] : text,
      url: Array.isArray(url) ? url[0] : url
    };

    setSharedData(data);
    setIsProcessing(false);

    // Log for debugging
    console.log('Received shared data:', data);
  }, [router.query]);

  const handleSaveContent = async () => {
    // Save shared content to your app's storage
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: sharedData.title || 'Shared Content',
          content: sharedData.text || '',
          url: sharedData.url || '',
          source: 'share_target',
          timestamp: new Date().toISOString()
        })
      });

      // Redirect to main app
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save shared content:', error);
    }
  };

  const handleDiscard = () => {
    router.push('/');
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse h-4 bg-gray-300 rounded w-48 mb-4"></div>
          <p className="text-gray-600">Processing shared content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Shared Content Received
          </h1>
          <p className="text-gray-600">
            Content has been shared to your app. Review and save it below.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            {sharedData.title && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={sharedData.title}
                  onChange={(e) => setSharedData({...sharedData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {sharedData.url && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={sharedData.url}
                  onChange={(e) => setSharedData({...sharedData, url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {sharedData.text && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={sharedData.text}
                  onChange={(e) => setSharedData({...sharedData, text: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {!sharedData.title && !sharedData.text && !sharedData.url && (
              <div className="text-center py-8">
                <p className="text-gray-500">No shared content received</p>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-3">
          <button
            onClick={handleSaveContent}
            disabled={!sharedData.title && !sharedData.text && !sharedData.url}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save to App
          </button>
          <button
            onClick={handleDiscard}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Advanced Configurations

### File Sharing with POST Method

For receiving files, use POST method with multipart form data:

```typescript
// app/manifest.ts
const fileShareTarget: ShareTarget = {
  action: '/share-files',
  method: 'POST',
  enctype: 'multipart/form-data',
  
  // Parameter mapping for form fields
  params: {
    title: 'title',
    text: 'description'
  },
  
  // File configuration
  files: [
    {
      name: 'images',
      accept: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    },
    {
      name: 'documents', 
      accept: ['application/pdf', 'text/plain']
    }
  ]
};
```

### File Handler Page

```typescript
// pages/share-files.tsx
import { NextApiRequest } from 'next';
import { IncomingForm, File } from 'formidable';

export default function ShareFiles({ sharedData, files }: {
  sharedData: { title?: string; description?: string };
  files: File[];
}) {
  const handleProcessFiles = async () => {
    // Process received files
    for (const file of files) {
      console.log('Processing file:', {
        name: file.originalFilename,
        type: file.mimetype,
        size: file.size,
        path: file.filepath
      });

      // Upload to your storage service
      await uploadFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Shared Files Received</h1>
        
        {sharedData.title && (
          <div className="mb-4">
            <h2 className="font-semibold">Title: {sharedData.title}</h2>
          </div>
        )}

        {sharedData.description && (
          <div className="mb-4">
            <p>Description: {sharedData.description}</p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-semibold">Files ({files.length})</h3>
          {files.map((file, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <p><strong>Name:</strong> {file.originalFilename}</p>
              <p><strong>Type:</strong> {file.mimetype}</p>
              <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ))}
        </div>

        <button 
          onClick={handleProcessFiles}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Process Files
        </button>
      </div>
    </div>
  );
}

// Server-side processing for file uploads
export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  if (req.method !== 'POST') {
    return { props: { sharedData: {}, files: [] } };
  }

  const form = new IncomingForm();
  
  return new Promise((resolve) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        resolve({ props: { sharedData: {}, files: [] } });
        return;
      }

      const sharedData = {
        title: Array.isArray(fields.title) ? fields.title[0] : fields.title,
        description: Array.isArray(fields.description) ? fields.description[0] : fields.description
      };

      const fileList = Object.values(files).flat();

      resolve({
        props: {
          sharedData,
          files: fileList
        }
      });
    });
  });
}
```

## Share Target Types

### Text and URL Sharing

```typescript
// Basic text/URL sharing configuration
const textShareTarget: ShareTarget = {
  action: '/share-text',
  method: 'GET',
  params: {
    title: 'title',
    text: 'text', 
    url: 'url'
  }
};

// Usage in manifest
export const manifest: WebAppManifest = {
  // ... other properties
  share_target: textShareTarget
};
```

### Image Sharing

```typescript
// Image sharing configuration
const imageShareTarget: ShareTarget = {
  action: '/share-images',
  method: 'POST',
  enctype: 'multipart/form-data',
  files: [
    {
      name: 'images',
      accept: [
        'image/jpeg',
        'image/png', 
        'image/gif',
        'image/webp',
        'image/svg+xml'
      ]
    }
  ],
  params: {
    title: 'title',
    text: 'caption'
  }
};
```

### Universal Share Target

```typescript
// Accept both text and files
const universalShareTarget: ShareTarget = {
  action: '/share-universal',
  method: 'POST',
  enctype: 'multipart/form-data',
  
  // Text parameters
  params: {
    title: 'title',
    text: 'text',
    url: 'url'
  },
  
  // File support
  files: [
    {
      name: 'media',
      accept: [
        'image/*',
        'video/*',
        'audio/*',
        'text/plain',
        'application/pdf'
      ]
    }
  ]
};
```

## Testing Share Targets

### Local Development Testing

```typescript
// pages/test-share.tsx - Development testing page
export default function TestShare() {
  const testShareData = [
    {
      title: 'Test Article',
      text: 'This is a test article shared from another app.',
      url: 'https://example.com/article'
    },
    {
      title: 'Quick Note',
      text: 'This is a quick note to test text sharing.',
      url: ''
    }
  ];

  const testShare = (data: typeof testShareData[0]) => {
    const params = new URLSearchParams();
    if (data.title) params.set('title', data.title);
    if (data.text) params.set('text', data.text);
    if (data.url) params.set('url', data.url);

    window.location.href = `/share-received?${params.toString()}`;
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Share Targets</h1>
      <div className="space-y-4">
        {testShareData.map((data, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{data.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{data.text}</p>
            {data.url && (
              <p className="text-sm text-blue-600 mb-2">{data.url}</p>
            )}
            <button
              onClick={() => testShare(data)}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Test Share
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Browser Testing

1. **Install your PWA** on Chrome/Edge
2. **Open another app** (like Chrome, Notes, etc.)
3. **Use the share function** and look for your PWA in the share sheet
4. **Share content** and verify it reaches your handler page

## Security Considerations

### Input Validation

```typescript
// utils/shareValidation.ts
export interface ValidatedShareData {
  title?: string;
  text?: string;
  url?: string;
}

export function validateSharedData(rawData: any): ValidatedShareData {
  const validated: ValidatedShareData = {};

  // Validate title
  if (typeof rawData.title === 'string' && rawData.title.trim()) {
    validated.title = rawData.title.trim().slice(0, 200); // Limit length
  }

  // Validate text content  
  if (typeof rawData.text === 'string' && rawData.text.trim()) {
    validated.text = rawData.text.trim().slice(0, 5000); // Limit length
  }

  // Validate URL
  if (typeof rawData.url === 'string' && rawData.url.trim()) {
    try {
      const urlObj = new URL(rawData.url);
      // Only allow HTTP/HTTPS URLs
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        validated.url = urlObj.toString();
      }
    } catch (error) {
      // Invalid URL, ignore
      console.warn('Invalid shared URL:', rawData.url);
    }
  }

  return validated;
}

// Sanitize HTML content
export function sanitizeSharedContent(content: string): string {
  return content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}
```

### File Security

```typescript
// utils/fileValidation.ts
export function validateSharedFile(file: File): boolean {
  // Check file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return false;
  }

  // Check file type against allowed types
  const allowedTypes = [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'text/plain',
    'application/pdf'
  ];

  if (!allowedTypes.includes(file.type)) {
    return false;
  }

  // Check file extension
  const allowedExtensions = ['.jpg', '.png', '.gif', '.webp', '.txt', '.pdf'];
  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
  
  if (!allowedExtensions.includes(extension)) {
    return false;
  }

  return true;
}
```

### Content Security Policy

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/share-received',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
          }
        ]
      }
    ];
  }
};
```

## Best Practices

### 1. User Experience

```typescript
function OptimizedShareHandler() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    // Show immediate feedback
    setIsProcessing(true);
    
    // Process shared data
    const processShare = async () => {
      try {
        const sharedData = await extractSharedData();
        setHasContent(Object.keys(sharedData).length > 0);
        
        // Pre-populate forms or storage
        await preprocessSharedContent(sharedData);
      } finally {
        setIsProcessing(false);
      }
    };

    processShare();
  }, []);

  if (isProcessing) {
    return <LoadingSpinner message="Processing shared content..." />;
  }

  if (!hasContent) {
    return <EmptyState message="No content was shared" />;
  }

  return <ShareContentForm />;
}
```

### 2. Progressive Enhancement

```typescript
// Check if Web Share Target is supported
export function useShareTargetSupport() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if PWA is installed and share target is available
    const checkSupport = () => {
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
      const hasShareTarget = 'share_target' in (navigator as any);
      
      setIsSupported(isInstalled && hasShareTarget);
    };

    checkSupport();
  }, []);

  return isSupported;
}

// Provide fallback for unsupported browsers
function ShareContent() {
  const isSupported = useShareTargetSupport();

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-100 rounded">
        <h3>Share content manually</h3>
        <p>Your browser doesn't support Web Share Target. You can manually add content below:</p>
        <ManualContentForm />
      </div>
    );
  }

  return <AutomaticShareHandler />;
}
```

### 3. Error Handling

```typescript
function RobustShareHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleShare = async (sharedData: any) => {
    try {
      // Validate shared data
      const validated = validateSharedData(sharedData);
      
      if (Object.keys(validated).length === 0) {
        throw new Error('No valid shared content received');
      }

      // Process and save
      await saveSharedContent(validated);
      
      // Redirect to success page
      router.push('/dashboard?shared=success');
      
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process shared content';
      setError(message);
      
      // Provide recovery options
      showErrorRecoveryOptions();
    }
  };

  return (
    <div>
      {error && (
        <ErrorAlert 
          message={error}
          onRetry={() => setError(null)}
          onManualEntry={() => router.push('/manual-entry')}
        />
      )}
      {/* Share handler UI */}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Share target not appearing**: PWA must be installed and manifest properly configured
2. **Data not received**: Check parameter mapping and URL encoding
3. **Files not uploading**: Verify POST method and multipart/form-data encoding
4. **Cross-origin errors**: Ensure action URL is within app scope

### Debug Tips

```typescript
// Add debug logging to share handler
export default function ShareReceived() {
  useEffect(() => {
    // Log all received data for debugging
    console.log('Share Target Debug:', {
      query: router.query,
      asPath: router.asPath,
      method: typeof window !== 'undefined' ? 'GET' : 'Unknown',
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
    });
  }, [router]);

  // ... rest of component
}
```

## Manifest Validation

Use the built-in validation utilities:

```typescript
import { AAEValidationUtils } from '@acrobi/ui/types/pwa';

// Validate your share target configuration
const shareTarget: ShareTarget = {
  action: '/share-received',
  method: 'GET',
  params: {
    title: 'title',
    text: 'text',
    url: 'url'
  }
};

const validation = AAEValidationUtils.validateShareTarget(shareTarget);

if (!validation.valid) {
  console.error('Share target validation errors:', validation.errors);
  console.warn('Share target validation warnings:', validation.warnings);
}
```

## Conclusion

Web Share Target enables your Acrobi PWA to integrate seamlessly with the device's sharing ecosystem. By implementing proper validation, error handling, and user experience patterns, you can create a robust sharing experience that feels native to users while maintaining security and performance.

Remember that Web Share Target requires PWA installation and has limited browser support, so always provide alternative ways for users to add content to your application.