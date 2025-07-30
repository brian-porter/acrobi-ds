# usePlatform Hook

The `usePlatform` hook provides comprehensive platform detection for building adaptive, responsive experiences across different devices, browsers, and PWA contexts.

## Overview

Modern web applications need to adapt to diverse environments - from iOS Safari to Android Chrome, from desktop browsers to PWA installations. The `usePlatform` hook solves this by providing reliable, real-time platform information that enables conditional rendering and feature-specific logic.

## Key Features

- **Operating System Detection**: Identifies iOS, Android, Windows, macOS, Linux
- **Browser Engine Detection**: Recognizes Chrome, Safari, Firefox, Edge  
- **Device Classification**: Distinguishes mobile, tablet, desktop devices
- **PWA Status Detection**: Knows when app runs as installed PWA
- **Touch Capability**: Detects touch-enabled devices
- **SSR Safe**: Only runs detection client-side
- **Utility Functions**: Platform matching, CSS classes, installation guidance

## Installation

```bash
npm install @acrobi/ui
```

## Basic Usage

```tsx
import { usePlatform } from '@acrobi/ui';

function MyComponent() {
  const { platform, isReady } = usePlatform();
  
  if (!isReady) {
    return <div>Detecting platform...</div>;
  }
  
  return (
    <div>
      <p>OS: {platform.os}</p>
      <p>Browser: {platform.browser}</p>
      <p>Device: {platform.deviceType}</p>
      <p>PWA: {platform.isPWA ? 'Yes' : 'No'}</p>
      
      {platform.isMobile && <MobileFeatures />}
      {platform.isDesktop && <DesktopFeatures />}
    </div>
  );
}
```

## Platform Information

The hook returns detailed platform information:

```tsx
interface PlatformInfo {
  os: 'iOS' | 'Android' | 'Windows' | 'macOS' | 'Linux' | 'Unknown';
  browser: 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Unknown';
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  isPWA: boolean;
  hasTouch: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  userAgent: string;
}
```

## Conditional Rendering

Use platform information for adaptive experiences:

```tsx
function AdaptiveUI() {
  const { platform } = usePlatform();
  
  return (
    <div>
      {/* Mobile-specific UI */}
      {platform.isMobile && (
        <MobileNavigationDrawer />
      )}
      
      {/* Desktop-specific UI */}
      {platform.isDesktop && (
        <DesktopSidebar />
      )}
      
      {/* PWA-specific features */}
      {platform.isPWA && (
        <PWAInstallPrompt />
      )}
      
      {/* Touch-optimized controls */}
      {platform.hasTouch && (
        <TouchGestures />
      )}
    </div>
  );
}
```

## Platform Utilities

### Platform Matching

Check if current platform matches specific criteria:

```tsx
import { PlatformUtils } from '@acrobi/ui';

function PlatformSpecificFeature() {
  const { platform } = usePlatform();
  
  // Check for iOS mobile
  const isiOSMobile = PlatformUtils.matches(
    { os: 'iOS', deviceType: 'mobile' }, 
    platform
  );
  
  // Check for desktop Chrome
  const isDesktopChrome = PlatformUtils.matches(
    { browser: 'Chrome', isDesktop: true }, 
    platform
  );
  
  return (
    <div>
      {isiOSMobile && <iOSSpecificUI />}
      {isDesktopChrome && <ChromeOptimizedFeature />}
    </div>
  );
}
```

### CSS Classes

Generate platform-specific CSS classes for styling:

```tsx
function StyledComponent() {
  const { platform } = usePlatform();
  const cssClasses = PlatformUtils.getCSSClasses(platform);
  
  return (
    <div className={cssClasses.join(' ')}>
      {/* Styles applied: os-ios, browser-safari, device-mobile, pwa, touch, mobile */}
      Platform-adaptive content
    </div>
  );
}
```

Available classes:
- **OS**: `os-ios`, `os-android`, `os-windows`, `os-macos`, `os-linux`
- **Browser**: `browser-chrome`, `browser-safari`, `browser-firefox`, `browser-edge`
- **Device**: `device-mobile`, `device-tablet`, `device-desktop`
- **Capabilities**: `pwa`, `touch`, `mobile`, `desktop`

### API Support Checking

Check for Web API availability:

```tsx
function FeatureBasedUI() {
  const { platform } = usePlatform();
  
  const hasCamera = PlatformUtils.supportsAPI('camera');
  const hasGeolocation = PlatformUtils.supportsAPI('geolocation');
  const hasWebShare = PlatformUtils.supportsAPI('webShare');
  
  return (
    <div>
      {hasCamera && <CameraButton />}
      {hasGeolocation && <LocationButton />}
      {hasWebShare && <ShareButton />}
    </div>
  );
}
```

### Installation Guidance

Get platform-specific PWA installation instructions:

```tsx
function InstallPrompt() {
  const { platform } = usePlatform();
  const installMethod = PlatformUtils.getInstallMethod(platform);
  
  return (
    <div className="install-prompt">
      <h3>Install this App</h3>
      <p>{installMethod}</p>
    </div>
  );
}
```

Example outputs:
- iOS Safari: "Add to Home Screen via Safari share menu"
- Android Chrome: "Install app prompt or Chrome menu"
- Desktop Chrome: "Install app via Chrome address bar icon"

## Advanced Examples

### Platform-Specific Navigation

```tsx
function Navigation() {
  const { platform } = usePlatform();
  
  if (platform.isMobile) {
    return <MobileNavigation />;
  }
  
  if (platform.isDesktop) {
    return <DesktopNavigation />;
  }
  
  return <DefaultNavigation />;
}
```

### PWA Installation Flow

```tsx
function PWAInstallation() {
  const { platform } = usePlatform();
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    // Show install prompt for supported platforms
    if (!platform.isPWA && platform.isMobile) {
      setShowPrompt(true);
    }
  }, [platform]);
  
  if (!showPrompt) return null;
  
  return (
    <div className="pwa-install-banner">
      <p>Install our app for the best experience!</p>
      <p>{PlatformUtils.getInstallMethod(platform)}</p>
      <button onClick={() => setShowPrompt(false)}>
        Maybe Later
      </button>
    </div>
  );
}
```

### Touch-Optimized Interactions

```tsx
function InteractiveElement() {
  const { platform } = usePlatform();
  
  const handleInteraction = platform.hasTouch 
    ? handleTouchInteraction 
    : handleMouseInteraction;
  
  return (
    <div 
      className={platform.hasTouch ? 'touch-target' : 'mouse-target'}
      onClick={handleInteraction}
      onTouchStart={platform.hasTouch ? handleTouchStart : undefined}
    >
      {platform.hasTouch ? 'Tap me' : 'Click me'}
    </div>
  );
}
```

## Best Practices

### Feature Detection Over User Agent Sniffing

✅ **Good**: Use feature detection when possible
```tsx
const hasWebShare = 'share' in navigator;
```

✅ **Good**: Use platform info for UI adaptation
```tsx
const { platform } = usePlatform();
if (platform.isMobile) {
  // Show mobile-optimized UI
}
```

❌ **Avoid**: Raw user agent parsing
```tsx
// Don't do this
const isMobile = /Android|iPhone|iPad/.test(navigator.userAgent);
```

### Graceful Degradation

Always provide fallbacks for platform-specific features:

```tsx
function ShareButton() {
  const { platform } = usePlatform();
  
  if (PlatformUtils.supportsAPI('webShare')) {
    return <NativeShareButton />;
  }
  
  return <CopyLinkButton />;
}
```

### Performance Considerations

The platform detection runs once on mount and caches results:

```tsx
// ✅ Efficient - detection runs once
function App() {
  const { platform } = usePlatform();
  
  return (
    <div className={PlatformUtils.getCSSClasses(platform).join(' ')}>
      <Navigation platform={platform} />
      <Content platform={platform} />
    </div>
  );
}
```

## TypeScript Support

Full TypeScript definitions are included:

```tsx
import { PlatformInfo, UsePlatformReturn } from '@acrobi/ui';

const platformInfo: PlatformInfo = {
  os: 'iOS',
  browser: 'Safari',
  deviceType: 'mobile',
  isPWA: true,
  hasTouch: true,
  isMobile: true,
  isDesktop: false,
  userAgent: '...',
};

const hookResult: UsePlatformReturn = {
  platform: platformInfo,
  isReady: true,
};
```

## Browser Support

Platform detection works in all modern browsers. On older browsers or during SSR, it gracefully defaults to safe values and completes detection client-side.

## Related Hooks

- [`useFeatureDetection`](./use-feature-detection) - Check Web API availability
- [`FeatureGuard`](../structures/feature-guard) - Conditional rendering based on features
- [`useGeolocation`](./use-geolocation) - Location services with fallbacks
- [`useCamera`](./use-camera) - Camera access with device detection

## Examples in Storybook

View interactive examples and test the hook across different simulated platforms:

- [Platform Detection Demo](/?path=/story/hooks-useplatform--default)
- [Conditional Rendering](/?path=/story/hooks-useplatform--conditional-rendering)
- [CSS Classes](/?path=/story/hooks-useplatform--css-classes)