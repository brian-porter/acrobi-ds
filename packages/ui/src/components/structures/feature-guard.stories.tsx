import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGuard, MultipleFeatureGuard, FeatureDetectionProvider } from './feature-guard';
import { useFeatureDetection, type FeatureAPI } from '../../hooks/use-feature-detection';
import React from 'react';

// Demo components for stories
function MockFeatureComponent({ feature }: { feature: string }) {
  return (
    <div className="p-4 bg-green-100 border border-green-400 rounded">
      <h4 className="font-semibold text-green-800">{feature} Feature Available</h4>
      <p className="text-green-700">This content is shown when the feature is supported.</p>
    </div>
  );
}

function MockFallbackComponent({ feature }: { feature: string }) {
  return (
    <div className="p-4 bg-red-100 border border-red-400 rounded">
      <h4 className="font-semibold text-red-800">{feature} Not Available</h4>
      <p className="text-red-700">This fallback content is shown when the feature is not supported.</p>
    </div>
  );
}

function FeatureGuardDemo() {
  const commonFeatures: FeatureAPI[] = [
    'serviceWorker',
    'webShare',
    'clipboard',
    'geolocation',
    'camera',
    'bluetooth',
    'nfc',
    'wakeLock',
    'badging',
    'paymentRequest'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Feature Support Status</h3>
        <div className="grid grid-cols-2 gap-4">
          {commonFeatures.map(feature => {
            const { isSupported, isReady } = useFeatureDetection(feature);
            
            return (
              <div key={feature} className="flex justify-between items-center text-sm">
                <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                {!isReady ? (
                  <span className="text-gray-500">Checking...</span>
                ) : (
                  <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
                    {isSupported ? '✅' : '❌'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Feature Guard Examples</h3>
        
        {/* Web Share Example */}
        <div>
          <h4 className="font-medium mb-2">Web Share API</h4>
          <FeatureGuard
            feature="webShare"
            fallback={<MockFallbackComponent feature="Web Share" />}
          >
            <MockFeatureComponent feature="Web Share" />
          </FeatureGuard>
        </div>

        {/* Service Worker Example */}
        <div>
          <h4 className="font-medium mb-2">Service Worker (with loading)</h4>
          <FeatureGuard
            feature="serviceWorker"
            loadingComponent={
              <div className="p-4 bg-blue-100 border border-blue-400 rounded">
                <div className="animate-pulse">Checking Service Worker support...</div>
              </div>
            }
            fallback={<MockFallbackComponent feature="Service Worker" />}
          >
            <MockFeatureComponent feature="Service Worker" />
          </FeatureGuard>
        </div>

        {/* Bluetooth Example (likely unsupported) */}
        <div>
          <h4 className="font-medium mb-2">Bluetooth API (likely unsupported)</h4>
          <FeatureGuard
            feature="bluetooth"
            fallback={<MockFallbackComponent feature="Bluetooth" />}
          >
            <MockFeatureComponent feature="Bluetooth" />
          </FeatureGuard>
        </div>
      </div>
    </div>
  );
}

function MultipleFeatureDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Multiple Feature Guard Examples</h3>
        
        {/* AND Logic - Require ALL features */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Video Recording (requires ALL: camera + microphone + mediaRecorder)</h4>
          <MultipleFeatureGuard
            features={['camera', 'microphone', 'mediaRecorder']}
            mode="all"
            fallback={
              <div className="p-4 bg-orange-100 border border-orange-400 rounded">
                <h4 className="font-semibold text-orange-800">Video Recording Unavailable</h4>
                <p className="text-orange-700">Requires camera, microphone, and media recording support.</p>
              </div>
            }
          >
            <div className="p-4 bg-green-100 border border-green-400 rounded">
              <h4 className="font-semibold text-green-800">Video Recording Available</h4>
              <p className="text-green-700">All required features are supported.</p>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Start Recording
              </button>
            </div>
          </MultipleFeatureGuard>
        </div>

        {/* OR Logic - Require ANY feature */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Sharing Options (requires ANY: webShare OR clipboard)</h4>
          <MultipleFeatureGuard
            features={['webShare', 'clipboard']}
            mode="any"
            fallback={
              <div className="p-4 bg-red-100 border border-red-400 rounded">
                <h4 className="font-semibold text-red-800">No Sharing Options</h4>
                <p className="text-red-700">Neither Web Share nor Clipboard APIs are available.</p>
              </div>
            }
          >
            <div className="p-4 bg-blue-100 border border-blue-400 rounded">
              <h4 className="font-semibold text-blue-800">Sharing Available</h4>
              <p className="text-blue-700">At least one sharing method is supported.</p>
              <div className="mt-2 space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Share
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                  Copy Link
                </button>
              </div>
            </div>
          </MultipleFeatureGuard>
        </div>
      </div>
    </div>
  );
}

function InvertedGuardDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Inverted Feature Guard</h3>
      <p className="text-gray-600">Shows content when feature is NOT supported</p>
      
      {/* Show warning for unsupported Service Worker */}
      <FeatureGuard
        feature="serviceWorker"
        invert
        fallback={
          <div className="p-4 bg-blue-100 border border-blue-400 rounded">
            <h4 className="font-semibold text-blue-800">Service Worker Supported</h4>
            <p className="text-blue-700">Your browser supports offline functionality.</p>
          </div>
        }
      >
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
          <h4 className="font-semibold text-yellow-800">⚠️ Limited Functionality</h4>
          <p className="text-yellow-700">
            Your browser doesn't support Service Workers. Some features may not work offline.
          </p>
          <a 
            href="/browser-support" 
            className="mt-2 inline-block text-yellow-800 underline hover:text-yellow-900"
          >
            Learn about browser requirements →
          </a>
        </div>
      </FeatureGuard>
    </div>
  );
}

function ProviderDemo() {
  function ChildComponent() {
    const { isSupported: hasCamera } = useFeatureDetection('camera');
    const { isSupported: hasWebShare } = useFeatureDetection('webShare');
    const { isSupported: hasClipboard } = useFeatureDetection('clipboard');

    return (
      <div className="p-4 bg-gray-50 rounded">
        <h4 className="font-medium mb-2">Child Component Feature Status</h4>
        <div className="space-y-1 text-sm">
          <div>Camera: {hasCamera ? '✅ Available' : '❌ Not available'}</div>
          <div>Web Share: {hasWebShare ? '✅ Available' : '❌ Not available'}</div>
          <div>Clipboard: {hasClipboard ? '✅ Available' : '❌ Not available'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Feature Detection Provider</h3>
      <p className="text-gray-600">
        Pre-loads feature detection for efficient sharing across components
      </p>
      
      <FeatureDetectionProvider features={['camera', 'webShare', 'clipboard']}>
        <div className="space-y-4">
          <div className="p-4 bg-white border rounded">
            <h4 className="font-medium mb-2">Parent Component</h4>
            <p className="text-sm text-gray-600">
              Provider pre-loads and caches feature detection results
            </p>
          </div>
          <ChildComponent />
        </div>
      </FeatureDetectionProvider>
    </div>
  );
}

const meta: Meta<typeof FeatureGuard> = {
  title: 'Structures/FeatureGuard',
  component: FeatureGuard,
  parameters: {
    docs: {
      description: {
        component: `
The \`FeatureGuard\` component provides declarative conditional rendering based on Web API feature support.

## Features

- **Single Feature Guard**: Conditionally render content based on one feature
- **Multiple Feature Guard**: Support for AND/OR logic with multiple features  
- **Inverted Logic**: Show content when features are NOT supported
- **Loading States**: Configurable loading indicators during detection
- **Provider Pattern**: Efficient feature detection sharing across components
- **HOC Pattern**: Higher-order component wrapper for feature guarding
- **TypeScript Support**: Full type safety with 50+ predefined feature APIs

## Usage Patterns

### Basic Feature Guard
\`\`\`tsx
<FeatureGuard feature="webShare">
  <ShareButton />
</FeatureGuard>
\`\`\`

### With Fallback
\`\`\`tsx
<FeatureGuard 
  feature="webShare"
  fallback={<CopyLinkButton />}
>
  <NativeShareButton />
</FeatureGuard>
\`\`\`

### Multiple Features (AND logic)
\`\`\`tsx
<MultipleFeatureGuard 
  features={['camera', 'mediaRecorder']} 
  mode="all"
>
  <VideoRecorder />
</MultipleFeatureGuard>
\`\`\`

### Multiple Features (OR logic)
\`\`\`tsx
<MultipleFeatureGuard 
  features={['webShare', 'clipboard']} 
  mode="any"
>
  <ShareOptions />
</MultipleFeatureGuard>
\`\`\`

### Inverted Logic
\`\`\`tsx
<FeatureGuard 
  feature="serviceWorker"
  invert
>
  <LegacyBrowserWarning />
</FeatureGuard>
\`\`\`

## Supported Feature APIs

The component supports 50+ Web APIs including:
- **Service Worker APIs**: serviceWorker, pushManager, backgroundSync
- **Media APIs**: camera, microphone, mediaRecorder, screenCapture
- **Hardware APIs**: bluetooth, nfc, vibration, gamepad  
- **File APIs**: fileSystemAccess, fileHandling
- **App APIs**: badging, wakeLock, webShare, paymentRequest
- **And many more...**

## Performance

- Feature detection results are cached
- Provider pattern enables efficient sharing
- Minimal re-renders with proper memoization
- SSR-safe with client-side hydration
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Basic Feature Guard',
  render: () => <FeatureGuardDemo />,
};

export const MultipleFeatures: Story = {
  name: 'Multiple Feature Guard',
  render: () => <MultipleFeatureDemo />,
};

export const InvertedLogic: Story = {
  name: 'Inverted Logic',
  render: () => <InvertedGuardDemo />,
};

export const WithProvider: Story = {
  name: 'With Provider',
  render: () => <ProviderDemo />,
};

// Interactive examples for different scenarios
function InteractiveExample() {
  const [selectedFeature, setSelectedFeature] = React.useState<FeatureAPI>('webShare');
  const [showFallback, setShowFallback] = React.useState(true);
  const [invertLogic, setInvertLogic] = React.useState(false);

  const features: FeatureAPI[] = [
    'webShare',
    'clipboard',
    'geolocation',
    'camera',
    'bluetooth',
    'serviceWorker',
    'badging',
    'wakeLock'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Interactive Feature Guard</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Feature to Test</label>
            <select 
              value={selectedFeature} 
              onChange={(e) => setSelectedFeature(e.target.value as FeatureAPI)}
              className="w-full p-2 border rounded"
            >
              {features.map(feature => (
                <option key={feature} value={feature}>
                  {feature.replace(/([A-Z])/g, ' $1')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="flex items-center space-x-2 mt-6">
              <input 
                type="checkbox" 
                checked={showFallback}
                onChange={(e) => setShowFallback(e.target.checked)}
              />
              <span className="text-sm">Show fallback content</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2 mt-6">
              <input 
                type="checkbox" 
                checked={invertLogic}
                onChange={(e) => setInvertLogic(e.target.checked)}
              />
              <span className="text-sm">Invert logic</span>
            </label>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">Result:</h4>
          <FeatureGuard
            feature={selectedFeature}
            invert={invertLogic}
            fallback={showFallback ? (
              <div className="p-4 bg-red-100 border border-red-400 rounded">
                <span className="text-red-800">
                  {invertLogic 
                    ? `${selectedFeature} is supported` 
                    : `${selectedFeature} is not supported`
                  }
                </span>
              </div>
            ) : undefined}
          >
            <div className="p-4 bg-green-100 border border-green-400 rounded">
              <span className="text-green-800">
                {invertLogic 
                  ? `${selectedFeature} is not supported` 
                  : `${selectedFeature} is supported`
                }
              </span>
            </div>
          </FeatureGuard>
        </div>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  name: 'Interactive Example',
  render: () => <InteractiveExample />,
};

// Real-world usage examples
function RealWorldExamples() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Real-World Usage Examples</h3>
      </div>

      {/* Photo Capture Example */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">📷 Photo Capture Feature</h4>
        <FeatureGuard
          feature="camera"
          fallback={
            <div className="text-center py-8 bg-gray-50 rounded border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-2">📁</div>
              <h5 className="font-medium text-gray-900 mb-2">Camera Not Available</h5>
              <p className="text-sm text-gray-600 mb-4">Upload a photo instead</p>
              <input 
                type="file" 
                accept="image/*" 
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          }
        >
          <div className="text-center py-8 bg-blue-50 rounded border-2 border-blue-200">
            <div className="text-4xl mb-2">📸</div>
            <h5 className="font-medium text-blue-900 mb-2">Camera Ready</h5>
            <p className="text-sm text-blue-700 mb-4">Take a photo directly</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Open Camera
            </button>
          </div>
        </FeatureGuard>
      </div>

      {/* Offline Support Example */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">🔄 Offline Support</h4>
        <FeatureGuard
          feature="serviceWorker"
          fallback={
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-start space-x-3">
                <div className="text-xl">⚠️</div>
                <div>
                  <h5 className="font-medium text-yellow-900">Limited Offline Support</h5>
                  <p className="text-sm text-yellow-800 mt-1">
                    Your browser doesn't support Service Workers. The app will work online only.
                  </p>
                </div>
              </div>
            </div>
          }
        >
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <div className="flex items-start space-x-3">
              <div className="text-xl">✅</div>
              <div>
                <h5 className="font-medium text-green-900">Offline Ready</h5>
                <p className="text-sm text-green-800 mt-1">
                  This app works offline! Your data will sync when you're back online.
                </p>
              </div>
            </div>
          </div>
        </FeatureGuard>
      </div>

      {/* Advanced Sharing Example */}
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">📤 Smart Sharing</h4>
        <MultipleFeatureGuard
          features={['webShare', 'clipboard']}
          mode="any"
          fallback={
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <h5 className="font-medium text-gray-900 mb-2">Manual Sharing</h5>
              <div className="text-sm text-gray-600 mb-3">
                Copy the URL manually to share:
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={window.location.href}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm border rounded bg-white"
                />
                <button className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                  Select All
                </button>
              </div>
            </div>
          }
          onSupportDetermined={({ supported, anySupported }) => {
            console.log('Sharing capabilities:', { supported, anySupported });
          }}
        >
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h5 className="font-medium text-blue-900 mb-2">Native Sharing Available</h5>
            <p className="text-sm text-blue-700 mb-3">
              Use your device's built-in sharing options
            </p>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Share Link
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Copy to Clipboard
              </button>
            </div>
          </div>
        </MultipleFeatureGuard>
      </div>
    </div>
  );
}

export const RealWorldUsage: Story = {
  name: 'Real-World Examples',
  render: () => <RealWorldExamples />,
};