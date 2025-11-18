import type { Meta, StoryObj } from '@storybook/react';
import { usePlatform, PlatformUtils } from './use-platform';

// Demo component to showcase the hook
function PlatformDemo() {
  const { platform, isReady } = usePlatform();

  if (!isReady) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Detecting platform...</p>
      </div>
    );
  }

  const cssClasses = PlatformUtils.getCSSClasses(platform);
  const installMethod = PlatformUtils.getInstallMethod(platform);

  const apiSupport = [
    'serviceWorker',
    'pushManager',
    'webShare',
    'geolocation',
    'camera',
    'bluetooth',
    'nfc',
    'webAuthn',
    'fileSystemAccess',
    'wakeLock',
  ].map(api => ({
    name: api,
    supported: PlatformUtils.supportsAPI(api),
  }));

  return (
    <div className="space-y-6">
      {/* Platform Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Platform Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Operating System:</span>
            <span className="ml-2 text-gray-900">{platform.os}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Browser:</span>
            <span className="ml-2 text-gray-900">{platform.browser}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Device Type:</span>
            <span className="ml-2 text-gray-900">{platform.deviceType}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">PWA Mode:</span>
            <span className={`ml-2 ${platform.isPWA ? 'text-green-600' : 'text-red-600'}`}>
              {platform.isPWA ? 'Yes' : 'No'}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Touch Support:</span>
            <span className={`ml-2 ${platform.hasTouch ? 'text-green-600' : 'text-red-600'}`}>
              {platform.hasTouch ? 'Yes' : 'No'}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Mobile Device:</span>
            <span className={`ml-2 ${platform.isMobile ? 'text-green-600' : 'text-red-600'}`}>
              {platform.isMobile ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* CSS Classes */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Generated CSS Classes</h3>
        <div className="flex flex-wrap gap-2">
          {cssClasses.map((className) => (
            <span
              key={className}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {className}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3">
          These classes can be used for platform-specific styling.
        </p>
      </div>

      {/* Installation Method */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">PWA Installation</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">{installMethod}</p>
        </div>
      </div>

      {/* API Support */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Web API Support</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {apiSupport.map(({ name, supported }) => (
            <div key={name} className="flex justify-between items-center py-1">
              <span className="text-gray-700">{name}</span>
              <span className={`font-medium ${supported ? 'text-green-600' : 'text-red-600'}`}>
                {supported ? '✓' : '✗'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Raw User Agent */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Raw User Agent</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <code className="text-xs text-gray-800 break-all">{platform.userAgent}</code>
        </div>
      </div>

      {/* Platform Matching Demo */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Platform Matching Examples</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>Is Mobile iOS?</span>
            <span className={PlatformUtils.matches({ os: 'iOS', isMobile: true }, platform) ? 'text-green-600' : 'text-red-600'}>
              {PlatformUtils.matches({ os: 'iOS', isMobile: true }, platform) ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Is Desktop Chrome?</span>
            <span className={PlatformUtils.matches({ browser: 'Chrome', isDesktop: true }, platform) ? 'text-green-600' : 'text-red-600'}>
              {PlatformUtils.matches({ browser: 'Chrome', isDesktop: true }, platform) ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Is PWA with Touch?</span>
            <span className={PlatformUtils.matches({ isPWA: true, hasTouch: true }, platform) ? 'text-green-600' : 'text-red-600'}>
              {PlatformUtils.matches({ isPWA: true, hasTouch: true }, platform) ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof PlatformDemo> = {
  title: 'Hooks/usePlatform',
  component: PlatformDemo,
  parameters: {
    docs: {
      description: {
        component: `
The \`usePlatform\` hook provides comprehensive platform detection for PWAs and web apps.

## Features

- **Operating System Detection**: Detects iOS, Android, Windows, macOS, Linux
- **Browser Detection**: Identifies Chrome, Safari, Firefox, Edge
- **Device Type Classification**: Mobile, tablet, desktop detection
- **PWA Status**: Detects if running as installed PWA
- **Touch Capability**: Identifies touch-enabled devices
- **API Support Checking**: Tests for various Web API availability
- **SSR Safe**: Only runs detection on client-side
- **Utility Functions**: Platform matching, CSS classes, install methods

## Usage

\`\`\`tsx
import { usePlatform, PlatformUtils } from '@acrobi/ui';

function MyComponent() {
  const { platform, isReady } = usePlatform();
  
  if (!isReady) return <div>Loading...</div>;
  
  return (
    <div className={PlatformUtils.getCSSClasses(platform).join(' ')}>
      {platform.isMobile && <MobileNav />}
      {platform.isDesktop && <DesktopNav />}
      {platform.isPWA && <PWAFeatures />}
    </div>
  );
}
\`\`\`

## Platform Matching

\`\`\`tsx
// Check if platform matches criteria
const isiOSMobile = PlatformUtils.matches(
  { os: 'iOS', deviceType: 'mobile' }, 
  platform
);

// Check API support
const canUseCamera = PlatformUtils.supportsAPI('camera');
\`\`\`

## CSS Classes

The hook generates platform-specific CSS classes:
- \`os-ios\`, \`os-android\`, \`os-windows\`, etc.
- \`browser-chrome\`, \`browser-safari\`, etc.
- \`device-mobile\`, \`device-tablet\`, \`device-desktop\`
- \`pwa\`, \`touch\`, \`mobile\`, \`desktop\`

## Installation Guidance

Get platform-specific PWA installation instructions:

\`\`\`tsx
const installMethod = PlatformUtils.getInstallMethod(platform);
// Returns: "Add to Home Screen via Safari share menu" for iOS Safari
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Platform Detection Demo',
  render: () => <PlatformDemo />,
};

export const MobileOptimized: Story = {
  name: 'Mobile-Optimized View',
  parameters: {
    viewport: {
      defaultViewport: 'iphone13',
    },
  },
  render: () => <PlatformDemo />,
};

export const TabletView: Story = {
  name: 'Tablet View',
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  render: () => <PlatformDemo />,
};

// Usage examples for different scenarios
function ConditionalRenderingExample() {
  const { platform, isReady } = usePlatform();
  
  if (!isReady) return <div>Loading...</div>;
  
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Conditional Rendering Examples</h3>
      
      {platform.isMobile && (
        <div className="bg-blue-100 p-3 rounded">
          <h4 className="font-medium">Mobile Features</h4>
          <p>Special mobile UI components would go here</p>
        </div>
      )}
      
      {platform.isDesktop && (
        <div className="bg-green-100 p-3 rounded">
          <h4 className="font-medium">Desktop Features</h4>
          <p>Desktop-specific features like keyboard shortcuts</p>
        </div>
      )}
      
      {platform.isPWA && (
        <div className="bg-purple-100 p-3 rounded">
          <h4 className="font-medium">PWA Features</h4>
          <p>Native-like features available in PWA mode</p>
        </div>
      )}
      
      {platform.hasTouch && (
        <div className="bg-orange-100 p-3 rounded">
          <h4 className="font-medium">Touch Features</h4>
          <p>Touch-optimized interactions</p>
        </div>
      )}
    </div>
  );
}

export const ConditionalRendering: Story = {
  name: 'Conditional Rendering',
  render: () => <ConditionalRenderingExample />,
};

// API Support checker
function APISupportChecker() {
  const { platform, isReady } = usePlatform();
  
  if (!isReady) return <div>Loading...</div>;
  
  const criticalAPIs = [
    { name: 'Service Worker', api: 'serviceWorker', description: 'Offline functionality' },
    { name: 'Push Manager', api: 'pushManager', description: 'Push notifications' },
    { name: 'Web Share', api: 'webShare', description: 'Native sharing' },
    { name: 'Geolocation', api: 'geolocation', description: 'Location services' },
    { name: 'Camera', api: 'camera', description: 'Photo/video capture' },
    { name: 'WebAuthn', api: 'webAuthn', description: 'Biometric auth' },
  ];
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Critical API Support Check</h3>
      <div className="space-y-3">
        {criticalAPIs.map(({ name, api, description }) => {
          const supported = PlatformUtils.supportsAPI(api);
          return (
            <div key={api} className={`p-3 rounded border-l-4 ${
              supported ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{name}</h4>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  supported ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}>
                  {supported ? 'Supported' : 'Not Available'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const APISupport: Story = {
  name: 'API Support Checker',
  render: () => <APISupportChecker />,
};