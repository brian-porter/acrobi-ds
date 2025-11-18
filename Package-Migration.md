# Acrobi Design System - Package Migration Plan

**Version:** 1.0.0
**Created:** 2025-11-18
**Status:** Planning Phase
**Estimated Timeline:** 12-16 weeks

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Migration Overview](#migration-overview)
3. [Package Architecture](#package-architecture)
4. [Migration Strategy](#migration-strategy)
5. [Package Specifications](#package-specifications)
6. [Dependency Management](#dependency-management)
7. [Build & Deployment](#build--deployment)
8. [Testing Strategy](#testing-strategy)
9. [Migration Phases](#migration-phases)
10. [Risk Assessment](#risk-assessment)
11. [Success Metrics](#success-metrics)
12. [Appendix](#appendix)

---

## Executive Summary

### Purpose

This document outlines the migration strategy for transforming the Acrobi Design System from a monolithic monorepo into 13 independent, Acrobi Framework-compatible packages. Each package will integrate with the framework's extension system, supporting hooks, lifecycle management, and modular composition.

### Goals

1. **Framework Compatibility**: Make all packages compatible with Acrobi Framework extension system
2. **Independent Deployment**: Enable independent versioning and publishing
3. **Reduce Bundle Size**: Allow consumers to install only what they need
4. **Maintain Functionality**: Preserve all existing features and capabilities
5. **Improve Developer Experience**: Provide better package discovery and management

### Current State

- **Structure**: Monorepo with 4 packages (@acrobi/ui, @acrobi/cli, @acrobi/tailwind-config, @acrobi/tsconfig)
- **Components**: 49+ components in single @acrobi/ui package
- **Hooks**: 50+ AAE hooks bundled with components
- **Distribution**: CLI-first, source code installation
- **Size**: 6.5MB source code in @acrobi/ui

### Target State

- **Structure**: 13 independent packages
- **Distribution**: npm registry + Acrobi package manager
- **Integration**: Full Acrobi Framework extension support
- **Granularity**: Fine-grained package selection
- **Interoperability**: Clear dependency graph

### Key Benefits

1. **Selective Installation**: Install only needed packages
2. **Smaller Bundles**: Reduced application bundle sizes
3. **Independent Updates**: Update packages individually
4. **Framework Integration**: Leverage Acrobi hooks and shells
5. **Better Discovery**: Packages searchable in Acrobi ecosystem

---

## Migration Overview

### Approach

**Incremental Migration**: Migrate packages in priority order while maintaining backward compatibility. The monolithic @acrobi/ui package will remain available during transition.

### Migration Principles

1. **No Breaking Changes**: Maintain backward compatibility during migration
2. **Gradual Adoption**: Allow projects to migrate at their own pace
3. **Dual Publishing**: Publish both monolithic and modular packages
4. **Clear Documentation**: Provide comprehensive migration guides
5. **Automated Testing**: Ensure feature parity through testing

### Package Categories

#### Category 1: Foundation Packages (Weeks 1-4)
- Core packages that other packages depend on
- @acrobi/tsconfig (existing)
- @acrobi/tailwind-config (existing)
- @acrobi/primitives (new)
- @acrobi/theme-system (new)

#### Category 2: Feature Packages (Weeks 5-8)
- Standalone feature sets with minimal dependencies
- @acrobi/aae-hooks (new)
- @acrobi/service-worker (new)
- @acrobi/socket-client (new)

#### Category 3: Composed Packages (Weeks 9-12)
- Packages that depend on foundation packages
- @acrobi/form-components (new)
- @acrobi/auth-flow (new)
- @acrobi/data-display (new)

#### Category 4: Specialized Packages (Weeks 13-16)
- Domain-specific packages
- @acrobi/scanning (new)
- @acrobi/location (new)
- @acrobi/menu-system (new)

---

## Package Architecture

### Package Structure Template

Each package follows this standard structure:

```
@acrobi/package-name/
├── src/
│   ├── index.ts              # Main entry point with activate()
│   ├── components/           # React components (if applicable)
│   ├── hooks/                # React hooks (if applicable)
│   ├── lib/                  # Utility functions
│   ├── types/                # TypeScript definitions
│   └── styles/               # CSS/Tailwind styles (if applicable)
├── dist/                     # Compiled output
├── acrobi.json              # Acrobi extension manifest
├── package.json             # npm package manifest
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind config (if applicable)
├── README.md                # Package documentation
├── CHANGELOG.md             # Version history
└── LICENSE                  # MIT license
```

### Extension Integration Pattern

All packages that qualify as Acrobi Extensions must:

1. **Export activation function**:
```typescript
import { ExtensionContext } from '@acrobi/core';

export async function activate(context: ExtensionContext): Promise<void> {
  // Register hooks, initialize services, etc.
  context.logger.info(`${context.extensionId} activated`);
}

export async function deactivate(): Promise<void> {
  // Cleanup logic
}
```

2. **Include acrobi.json manifest**:
```json
{
  "id": "acrobi.package-name",
  "name": "Package Name",
  "version": "1.0.0",
  "category": "ui-component",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

3. **Register hooks (if applicable)**:
```typescript
context.hooks.addAction('event:name', handler);
context.hooks.addFilter('filter:name', transformer);
```

### Hook System Integration

Packages can register hooks for:

- **Component Lifecycle**: Mount, unmount, update events
- **Theme Changes**: Theme switch, dark mode toggle
- **Data Operations**: Before/after data operations
- **User Actions**: Custom user interaction events

---

## Migration Strategy

### Phase-Based Approach

#### Phase 1: Foundation (Weeks 1-4)

**Goal**: Extract core building blocks

**Packages**:
1. @acrobi/primitives
2. @acrobi/theme-system

**Activities**:
- Set up package scaffolding
- Create acrobi.json manifests
- Implement activation functions
- Set up build pipelines
- Create initial tests
- Publish alpha versions

**Success Criteria**:
- Packages build successfully
- Tests pass
- Can be installed independently
- Activation/deactivation works

#### Phase 2: Feature Extraction (Weeks 5-8)

**Goal**: Extract standalone features

**Packages**:
1. @acrobi/aae-hooks
2. @acrobi/service-worker
3. @acrobi/socket-client

**Activities**:
- Extract hook implementations
- Implement feature detection
- Create comprehensive tests
- Document APIs
- Publish beta versions

**Success Criteria**:
- All hooks function independently
- Service worker strategies work
- Socket communication stable

#### Phase 3: Composed Components (Weeks 9-12)

**Goal**: Build composed packages from foundations

**Packages**:
1. @acrobi/form-components
2. @acrobi/auth-flow
3. @acrobi/data-display

**Activities**:
- Compose from foundation packages
- Implement complex workflows
- Integration testing
- Performance optimization
- Publish RC versions

**Success Criteria**:
- Component composition works
- Dependencies resolve correctly
- Performance acceptable

#### Phase 4: Specialization (Weeks 13-16)

**Goal**: Extract specialized packages

**Packages**:
1. @acrobi/scanning
2. @acrobi/location
3. @acrobi/menu-system

**Activities**:
- Extract specialized features
- Optimize bundle sizes
- Final integration testing
- Complete documentation
- Publish stable versions

**Success Criteria**:
- All packages stable
- Documentation complete
- Migration guide ready

### Backward Compatibility Strategy

**Monolithic Package Preservation**:
- Keep @acrobi/ui as meta-package
- Re-export from new packages
- Maintain existing import paths
- Deprecation warnings in v2.0.0

**Example**:
```typescript
// @acrobi/ui/src/index.ts
export * from '@acrobi/primitives';
export * from '@acrobi/aae-hooks';
export * from '@acrobi/theme-system';
// ... etc
```

---

## Package Specifications

### 1. @acrobi/primitives

**Category**: ui-component
**Priority**: High (Phase 1)
**Extension**: Yes
**Size**: ~150KB source

#### Description
Core UI building blocks - 24 primitive components including buttons, inputs, cards, badges, and basic layout components.

#### acrobi.json
```json
{
  "id": "acrobi.primitives",
  "name": "Acrobi UI Primitives",
  "version": "1.0.0",
  "description": "Core UI building blocks for Acrobi applications",
  "author": {
    "name": "Acrobi",
    "email": "design-system@acrobi.com",
    "url": "https://acrobi.com"
  },
  "license": {
    "type": "MIT",
    "url": "https://opensource.org/licenses/MIT"
  },
  "category": "ui-component",
  "keywords": ["ui", "components", "primitives", "react", "tailwind"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "homepage": "https://github.com/acrobi/acrobi-design-system/tree/main/packages/primitives",
  "repository": "https://github.com/acrobi/acrobi-design-system",
  "bugs": "https://github.com/acrobi/acrobi-design-system/issues",
  "dependencies": [
    "acrobi.theme-system"
  ],
  "coreVersion": ">=0.1.0",
  "capabilities": [
    {
      "id": "ui.primitives",
      "name": "UI Primitives Provider",
      "description": "Provides core UI building blocks",
      "version": "1.0.0"
    }
  ]
}
```

#### package.json
```json
{
  "name": "@acrobi/primitives",
  "version": "1.0.0",
  "description": "Core UI building blocks for Acrobi applications",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": [
    "dist",
    "src",
    "acrobi.json",
    "README.md"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "test": "vitest",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@acrobi/theme-system": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@acrobi/core": ">=0.1.0"
  },
  "devDependencies": {
    "@acrobi/tsconfig": "^1.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "tsup": "^8.0.0",
    "vitest": "^2.0.0"
  }
}
```

#### Activation Logic
```typescript
import { ExtensionContext } from '@acrobi/core';

export async function activate(context: ExtensionContext): Promise<void> {
  // Register theme integration hook
  context.hooks.addAction('theme:changed', (theme) => {
    context.logger.debug('Theme changed, updating primitives', { theme });
  });

  // Register component mount tracking (optional analytics)
  context.hooks.addFilter('component:beforeMount', (component) => {
    context.logger.debug('Component mounting', { component: component.name });
    return component;
  });

  context.logger.info('Acrobi Primitives activated');
}

export async function deactivate(): Promise<void> {
  // Cleanup: remove event listeners, etc.
}
```

#### Components Included
- Button, Switch, Checkbox, Radio, Slider
- Headline, Paragraph, Text, Label
- Card, Avatar, Badge, Banner, Progress
- Input, Textarea, Select, Dialog, Alert
- Accordion, Chip, Chiclet, Tooltip
- All Control components (CboxCtrl, RdoCtrl, etc.)

#### Migration Tasks
- [ ] Extract components from @acrobi/ui
- [ ] Create barrel exports
- [ ] Implement activation function
- [ ] Set up build pipeline (tsup)
- [ ] Create unit tests
- [ ] Create Storybook stories
- [ ] Write README
- [ ] Publish alpha version

---

### 2. @acrobi/theme-system

**Category**: tool
**Priority**: High (Phase 1)
**Extension**: Yes
**Size**: ~80KB source

#### Description
Complete theming solution with CSS custom properties, light/dark modes, and theme builder scripts.

#### acrobi.json
```json
{
  "id": "acrobi.theme-system",
  "name": "Acrobi Theme System",
  "version": "1.0.0",
  "description": "Dynamic theming system with CSS custom properties",
  "author": {
    "name": "Acrobi"
  },
  "category": "tool",
  "keywords": ["theme", "design-tokens", "css-variables", "dark-mode"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "coreVersion": ">=0.1.0",
  "capabilities": [
    {
      "id": "theme.provider",
      "name": "Theme Provider",
      "description": "Provides dynamic theming capabilities",
      "version": "1.0.0"
    }
  ],
  "configSchema": {
    "type": "object",
    "properties": {
      "defaultTheme": {
        "type": "string",
        "description": "Default theme name",
        "default": "acrobi"
      },
      "enableDarkMode": {
        "type": "boolean",
        "description": "Enable dark mode support",
        "default": true
      }
    }
  }
}
```

#### Activation Logic
```typescript
import { ExtensionContext } from '@acrobi/core';
import { applyTheme } from './lib/theme-manager';

export async function activate(context: ExtensionContext): Promise<void> {
  const config = context.config;

  // Apply default theme
  applyTheme(config.defaultTheme || 'acrobi');

  // Register theme switching hook
  context.hooks.addAction('theme:switch', (themeName: string) => {
    applyTheme(themeName);
    context.logger.info('Theme switched', { theme: themeName });
  });

  // Register dark mode toggle hook
  context.hooks.addAction('theme:toggleDarkMode', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    context.logger.info('Dark mode toggled', { enabled: isDark });
  });

  // Emit theme ready event
  await context.hooks.doAction('theme:ready', config.defaultTheme);

  context.logger.info('Acrobi Theme System activated');
}

export async function deactivate(): Promise<void> {
  // Reset to default theme
  document.documentElement.removeAttribute('data-theme');
}
```

#### Features
- ThemeProvider component
- useTheme hook
- Theme builder scripts
- CSS custom property generation
- Light/dark mode switching
- Multiple theme presets

#### Migration Tasks
- [ ] Extract theme code from @acrobi/ui
- [ ] Create theme provider
- [ ] Build theme scripts
- [ ] Generate CSS variables
- [ ] Create theme documentation
- [ ] Publish alpha version

---

### 3. @acrobi/aae-hooks

**Category**: tool
**Priority**: High (Phase 2)
**Extension**: Yes
**Size**: ~200KB source

#### Description
50+ React hooks for accessing modern web platform APIs (camera, GPS, Bluetooth, NFC, etc.).

#### acrobi.json
```json
{
  "id": "acrobi.aae-hooks",
  "name": "Acrobi Advanced Experiences Hooks",
  "version": "1.0.0",
  "description": "React hooks for modern web platform APIs",
  "author": {
    "name": "Acrobi"
  },
  "category": "tool",
  "keywords": ["hooks", "web-apis", "camera", "geolocation", "bluetooth", "nfc"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "coreVersion": ">=0.1.0",
  "capabilities": [
    {
      "id": "aae.hooks",
      "name": "Advanced Experience Hooks",
      "description": "Provides hooks for platform capabilities",
      "version": "1.0.0"
    },
    {
      "id": "aae.feature-detection",
      "name": "Feature Detection",
      "description": "Browser feature detection utilities",
      "version": "1.0.0"
    }
  ]
}
```

#### Activation Logic
```typescript
import { ExtensionContext } from '@acrobi/core';
import { detectFeatures } from './lib/feature-detection';

export async function activate(context: ExtensionContext): Promise<void> {
  // Detect available platform features
  const features = await detectFeatures();

  // Store in extension context
  context.storage.set('aae:features', features);

  // Register feature check hook
  context.hooks.addFilter('aae:checkFeature', (featureName: string) => {
    return features[featureName] || false;
  });

  // Log available features
  context.logger.info('AAE Hooks activated', {
    availableFeatures: Object.keys(features).filter(k => features[k])
  });

  // Emit features detected event
  await context.hooks.doAction('aae:featuresDetected', features);
}

export async function deactivate(): Promise<void> {
  // Cleanup: release any held resources (camera streams, etc.)
}
```

#### Hooks Included

**Hardware & Sensors (12)**:
- useCamera, useVideoRecorder, useAudioRecorder
- useGeolocation, useDeviceMotion, useDeviceOrientation
- useBarcodeScanner, useQRScanner
- useCompassHeading, useShake, useScreenCapture, useImageLoader

**Connectivity (7)**:
- useBluetooth, useWebBluetooth, useNetwork
- useSocket, useSocketEvent, useSocketEmit, useSocketRoom

**Input Methods (5)**:
- useKeyboard, useKeyboardAAE, useVisualViewport
- useContactPicker, useFilePicker

**Native Platform (8)**:
- useNative, usePlatform, useFeatureDetection
- useAAEDisplay, usePWADisplay, useWindowManager
- useScreenOrientation, useWakeLock

**User Interaction (5)**:
- useHaptics, useWebShare, useFileSystem
- usePaymentRequest, useAppBadge

**Security & Auth (2)**:
- useWebAuthn, usePushNotifications

**Voice & Audio (2)**:
- useTTS, useSpeechRecognition

**Advanced APIs (2)**:
- useNFC, usePaymentRequest

**Offline & PWA (4)**:
- useBackgroundSync, useBackgroundFetch
- usePeriodicSync, useCachedApi

**State Management (3)**:
- useLocalStorage, usePersistentForm, useAuthFlow

#### Migration Tasks
- [ ] Extract all hooks from @acrobi/ui
- [ ] Create feature detection utilities
- [ ] Implement permission handling
- [ ] Write comprehensive tests
- [ ] Document each hook
- [ ] Create usage examples
- [ ] Publish beta version

---

### 4. @acrobi/form-components

**Category**: ui-component
**Priority**: Medium (Phase 3)
**Extension**: Yes
**Size**: ~100KB source

#### Description
Complete form system with 7 field types, validation, and accessibility.

#### acrobi.json
```json
{
  "id": "acrobi.form-components",
  "name": "Acrobi Form Components",
  "version": "1.0.0",
  "description": "Complete form system with validation and accessibility",
  "author": {
    "name": "Acrobi"
  },
  "category": "ui-component",
  "keywords": ["forms", "validation", "inputs", "react-hook-form"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": [
    "acrobi.primitives"
  ],
  "coreVersion": ">=0.1.0"
}
```

#### Activation Logic
```typescript
import { ExtensionContext } from '@acrobi/core';

export async function activate(context: ExtensionContext): Promise<void> {
  // Register form validation hooks
  context.hooks.addFilter('form:validate', async (formData, schema) => {
    // Custom validation logic
    context.logger.debug('Validating form', { fields: Object.keys(formData) });
    return { valid: true, errors: {} };
  });

  // Register form submission hook
  context.hooks.addAction('form:submit', async (formData) => {
    context.logger.info('Form submitted', { formData });
  });

  context.logger.info('Form Components activated');
}
```

#### Components Included
- TextField, TextareaField, SelectField
- CheckboxField, SwitchField, RadioField, SliderField
- UploadField, Form wrapper
- Validation utilities

#### Dependencies
- @acrobi/primitives (for base controls)
- react-hook-form (optional peer dependency)

---

### 5. @acrobi/auth-flow

**Category**: workflow
**Priority**: Medium (Phase 3)
**Extension**: Yes
**Size**: ~120KB source

#### Description
Complete authentication flow with state machine orchestration and 8 onboarding screens.

#### acrobi.json
```json
{
  "id": "acrobi.auth-flow",
  "name": "Acrobi Authentication Flow",
  "version": "1.0.0",
  "description": "Complete authentication and onboarding workflow",
  "author": {
    "name": "Acrobi"
  },
  "category": "workflow",
  "keywords": ["auth", "authentication", "onboarding", "state-machine"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": [
    "acrobi.primitives",
    "acrobi.form-components",
    "acrobi.aae-hooks"
  ],
  "coreVersion": ">=0.1.0",
  "capabilities": [
    {
      "id": "auth.flow",
      "name": "Authentication Flow",
      "description": "Complete user onboarding workflow",
      "version": "1.0.0"
    }
  ]
}
```

#### Activation Logic
```typescript
import { ExtensionContext } from '@acrobi/core';

export async function activate(context: ExtensionContext): Promise<void> {
  // Register authentication hooks
  context.hooks.addAction('auth:started', () => {
    context.logger.info('Auth flow started');
  });

  context.hooks.addAction('auth:completed', (user) => {
    context.logger.info('Auth flow completed', { userId: user.id });
  });

  context.hooks.addFilter('auth:validateStep', (step, data) => {
    // Custom step validation
    return { valid: true, errors: [] };
  });

  // Integrate with shell auth system
  const authShell = context.shells.get('auth');
  if (authShell) {
    context.logger.info('Auth shell integration enabled');
  }

  context.logger.info('Auth Flow activated');
}
```

#### Screens Included
- Account Creation
- Contact Verification
- Secondary Contact
- Passkey Setup
- Handle Selection
- Account Type Fork
- Social Connections
- Favorites/Interests

#### Features
- State machine orchestration
- Step validation
- Progress tracking
- WebAuthn integration
- Social auth support

---

### 6. @acrobi/service-worker

**Category**: tool
**Priority**: High (Phase 2)
**Extension**: Yes
**Size**: ~40KB source

#### Description
PWA capabilities with multi-strategy caching, background sync, and offline support.

#### acrobi.json
```json
{
  "id": "acrobi.service-worker",
  "name": "Acrobi Service Worker",
  "version": "1.0.0",
  "description": "PWA capabilities with advanced caching strategies",
  "author": {
    "name": "Acrobi"
  },
  "category": "tool",
  "keywords": ["pwa", "service-worker", "offline", "caching"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "coreVersion": ">=0.1.0",
  "configSchema": {
    "type": "object",
    "properties": {
      "cacheStrategy": {
        "type": "string",
        "enum": ["cacheFirst", "networkFirst", "staleWhileRevalidate"],
        "default": "networkFirst"
      },
      "enableBackgroundSync": {
        "type": "boolean",
        "default": true
      }
    }
  }
}
```

#### Activation Logic
```typescript
import { ExtensionContext } from '@acrobi/core';

export async function activate(context: ExtensionContext): Promise<void> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      context.logger.info('Service Worker registered', { scope: registration.scope });

      // Store registration in context
      context.storage.set('sw:registration', registration);

      // Register update hook
      registration.addEventListener('updatefound', () => {
        context.hooks.doAction('sw:updateFound', registration);
      });

      // Register offline hook
      window.addEventListener('offline', () => {
        context.hooks.doAction('app:offline');
      });

      window.addEventListener('online', () => {
        context.hooks.doAction('app:online');
      });

    } catch (error) {
      context.logger.error('Service Worker registration failed', error);
    }
  }
}

export async function deactivate(): Promise<void> {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    await registration.unregister();
  }
}
```

#### Features
- Cache-first strategy
- Network-first strategy
- Stale-while-revalidate
- Background sync
- Offline fallback
- Cache versioning

---

### 7. @acrobi/socket-client

**Category**: tool
**Priority**: Medium (Phase 2)
**Extension**: Yes
**Size**: ~30KB source

#### Description
WebSocket/Socket.IO integration with connection management and event handling.

#### acrobi.json
```json
{
  "id": "acrobi.socket-client",
  "name": "Acrobi Socket Client",
  "version": "1.0.0",
  "description": "Real-time communication via WebSocket/Socket.IO",
  "author": {
    "name": "Acrobi"
  },
  "category": "tool",
  "keywords": ["websocket", "socketio", "realtime"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "coreVersion": ">=0.1.0",
  "configSchema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "WebSocket server URL"
      },
      "autoConnect": {
        "type": "boolean",
        "default": true
      }
    },
    "required": ["url"]
  }
}
```

#### Activation Logic
```typescript
import { ExtensionContext } from '@acrobi/core';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export async function activate(context: ExtensionContext): Promise<void> {
  const config = context.config;

  if (config.autoConnect && config.url) {
    socket = io(config.url);

    socket.on('connect', () => {
      context.logger.info('Socket connected', { id: socket?.id });
      context.hooks.doAction('socket:connected', socket);
    });

    socket.on('disconnect', () => {
      context.logger.warn('Socket disconnected');
      context.hooks.doAction('socket:disconnected');
    });

    socket.on('error', (error) => {
      context.logger.error('Socket error', error);
      context.hooks.doAction('socket:error', error);
    });

    // Store socket in context
    context.storage.set('socket:instance', socket);
  }

  context.logger.info('Socket Client activated');
}

export async function deactivate(): Promise<void> {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
```

#### Hooks Included
- useSocket
- useSocketEvent
- useSocketEmit
- useSocketRoom
- useSocketMessages
- useSocketHealth

---

### 8. @acrobi/data-display

**Category**: ui-component
**Priority**: Medium (Phase 3)
**Extension**: Yes
**Size**: ~50KB source

#### Description
Data display components including tables, grids, and empty states.

#### Components Included
- DataTable
- ListGrid
- EmptyState (variants: Collection, Search, Filter, Error)
- BreadcrumbStructure

#### Dependencies
- @acrobi/primitives

---

### 9. @acrobi/scanning

**Category**: tool
**Priority**: Medium (Phase 4)
**Extension**: Yes
**Size**: ~35KB source

#### Description
Barcode and QR code scanning with camera integration.

#### acrobi.json
```json
{
  "id": "acrobi.scanning",
  "name": "Acrobi Scanning",
  "version": "1.0.0",
  "description": "Barcode and QR code scanning",
  "author": {
    "name": "Acrobi"
  },
  "category": "tool",
  "keywords": ["barcode", "qr-code", "scanner", "zxing"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": [
    "acrobi.aae-hooks"
  ],
  "coreVersion": ">=0.1.0"
}
```

#### Features
- useBarcodeScanner hook
- useQRScanner hook
- Scanner module
- Format detection
- Camera access

#### Dependencies
- @acrobi/aae-hooks (for useCamera)
- @zxing/library
- @zxing/browser

---

### 10. @acrobi/location

**Category**: tool
**Priority**: Low (Phase 4)
**Extension**: Yes
**Size**: ~40KB source

#### Description
Location services and interactive mapping.

#### acrobi.json
```json
{
  "id": "acrobi.location",
  "name": "Acrobi Location Services",
  "version": "1.0.0",
  "description": "GPS location and interactive maps",
  "author": {
    "name": "Acrobi"
  },
  "category": "tool",
  "keywords": ["geolocation", "gps", "maps", "leaflet"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": [
    "acrobi.aae-hooks"
  ],
  "coreVersion": ">=0.1.0"
}
```

#### Features
- useGeolocation hook
- LocationMap component
- Geofencing support
- Map utilities

#### Dependencies
- @acrobi/aae-hooks
- leaflet
- react-leaflet

---

### 11. @acrobi/menu-system

**Category**: ui-component
**Priority**: Low (Phase 4)
**Extension**: Yes
**Size**: ~60KB source

#### Description
Complete menu system with 7 pre-built menu types.

#### Menus Included
- MenuActions
- MenuPosts
- MenuAdmin
- MenuViewStyle
- MenuSortStyle
- MenuSearch
- MenuPrivacy

#### Dependencies
- @acrobi/primitives

---

### 12. @acrobi/cli (Existing - Upgrade)

**Category**: tool
**Priority**: High (Phase 1)
**Extension**: No (standalone CLI)
**Size**: Current

#### Enhancements Needed

1. **Registry Updates**: Update to support new package structure
2. **Dependency Resolution**: Automatically install package dependencies
3. **Migration Helper**: Command to help migrate from monolithic to modular
4. **Package Search**: Enhanced search across new packages
5. **Update Management**: Handle updates of individual packages

#### New Commands
```bash
# List all available packages
acrobi packages list

# Search packages
acrobi packages search "form"

# Show package info
acrobi packages info @acrobi/primitives

# Migrate from monolithic to modular
acrobi migrate

# Update single package
acrobi update @acrobi/primitives
```

---

### 13. @acrobi/ui (Existing - Meta Package)

**Category**: ui-component
**Priority**: Ongoing
**Extension**: Yes
**Size**: Aggregation

#### Purpose
Meta-package that re-exports all packages for backward compatibility.

#### package.json
```json
{
  "name": "@acrobi/ui",
  "version": "2.0.0",
  "description": "Acrobi Design System - Complete UI library (meta-package)",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": {
    "@acrobi/primitives": "^1.0.0",
    "@acrobi/theme-system": "^1.0.0",
    "@acrobi/aae-hooks": "^1.0.0",
    "@acrobi/form-components": "^1.0.0",
    "@acrobi/auth-flow": "^1.0.0",
    "@acrobi/data-display": "^1.0.0",
    "@acrobi/service-worker": "^1.0.0",
    "@acrobi/socket-client": "^1.0.0",
    "@acrobi/scanning": "^1.0.0",
    "@acrobi/location": "^1.0.0",
    "@acrobi/menu-system": "^1.0.0"
  }
}
```

#### Migration Strategy
- v1.x: Monolithic (current)
- v2.x: Meta-package (backward compatible)
- v3.x: Deprecation warnings
- v4.x: Meta-package only (no source code)

---

## Dependency Management

### Dependency Graph

```
┌─────────────────────────────────────────────────────┐
│ @acrobi/tsconfig                                    │
└────────────┬────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────┐
│ @acrobi/tailwind-config                             │
└────────────┬────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────┐
│ @acrobi/theme-system                                │
└────┬────────────────────────────────────────────────┘
     │
┌────▼────────────────────────────────────────────────┐
│ @acrobi/primitives                                  │
└────┬─────────┬──────────┬─────────────┬─────────────┘
     │         │          │             │
     │         │          │             │
┌────▼─────┐ ┌▼────────┐ ┌▼──────────┐ ┌▼─────────────┐
│ form-    │ │ auth-   │ │ data-     │ │ menu-        │
│ comp.    │ │ flow    │ │ display   │ │ system       │
└──────────┘ └─────────┘ └───────────┘ └──────────────┘

┌──────────────────────────────────────────────────────┐
│ @acrobi/aae-hooks                                    │
└────┬─────────────┬────────────────────┬──────────────┘
     │             │                    │
┌────▼─────┐ ┌────▼─────────┐ ┌────────▼──────┐
│ scanning │ │ location     │ │ socket-client │
└──────────┘ └──────────────┘ └───────────────┘

┌──────────────────────────────────────────────────────┐
│ @acrobi/service-worker (standalone)                  │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ @acrobi/cli (standalone)                             │
└──────────────────────────────────────────────────────┘
```

### Peer Dependencies

All UI packages should declare React as a peer dependency:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@acrobi/core": ">=0.1.0"
  }
}
```

### Version Pinning Strategy

- **Exact versions** for critical dependencies
- **Caret (^) ranges** for peer dependencies
- **Tilde (~) ranges** for dev dependencies
- **>= ranges** for @acrobi/core compatibility

---

## Build & Deployment

### Build Tools

#### Primary: tsup
Fast TypeScript bundler for libraries.

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true
});
```

#### Alternative: Vite Library Mode
For packages with CSS/assets.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
});
```

### Publishing Strategy

#### Version Management
Use **Changesets** for version management:

```bash
# Add changeset
pnpm changeset

# Version packages
pnpm changeset version

# Publish packages
pnpm changeset publish
```

#### Release Workflow

1. **Development**: Work on feature branches
2. **PR Review**: Create changeset in PR
3. **Merge**: Merge to main
4. **Version Bot**: Changesets creates version PR
5. **Release**: Merge version PR → auto-publish

#### Publishing Channels

1. **npm Registry**:
   - Latest: Stable releases
   - Next: Beta releases
   - Alpha: Early releases

2. **Acrobi Package Manager**:
   - Upload to Acrobi registry
   - Include acrobi.json
   - Provide package metadata

#### GitHub Actions Workflow

```yaml
name: Release Packages

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install
      - run: pnpm build
      - run: pnpm test

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Upload to Acrobi Registry
        run: pnpm run upload:acrobi
        env:
          ACROBI_TOKEN: ${{ secrets.ACROBI_TOKEN }}
```

### Package Size Optimization

1. **Tree Shaking**: Ensure all exports are tree-shakeable
2. **Code Splitting**: Split large packages into sub-modules
3. **External Dependencies**: Mark heavy deps as external/peer deps
4. **CSS Optimization**: Use Tailwind JIT, purge unused styles
5. **Bundle Analysis**: Regular bundle size monitoring

---

## Testing Strategy

### Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical user flows
- **E2E Tests**: Key workflows
- **Visual Regression**: Storybook snapshots

### Testing Approach Per Package

#### @acrobi/primitives
- Component rendering tests
- Prop validation tests
- Accessibility tests
- Visual regression tests (Storybook)

#### @acrobi/aae-hooks
- Hook behavior tests
- Feature detection tests
- Permission handling tests
- Browser compatibility tests

#### @acrobi/form-components
- Form submission tests
- Validation tests
- Error handling tests
- Accessibility tests

#### @acrobi/auth-flow
- State machine tests
- Flow navigation tests
- Validation tests
- Integration tests with auth shell

### Test Infrastructure

#### Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      threshold: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    }
  }
});
```

#### Continuous Testing
- Run tests on every PR
- Block merge if tests fail
- Run coverage reports
- Monitor test performance

---

## Migration Phases

### Phase 1: Foundation (Weeks 1-4)

#### Week 1: Setup & Planning
- [ ] Create new package directories
- [ ] Set up build configurations
- [ ] Create acrobi.json templates
- [ ] Set up CI/CD pipelines

#### Week 2: @acrobi/primitives
- [ ] Extract primitive components
- [ ] Create barrel exports
- [ ] Implement activation logic
- [ ] Write unit tests
- [ ] Create Storybook stories
- [ ] Publish alpha version

#### Week 3: @acrobi/theme-system
- [ ] Extract theme code
- [ ] Create ThemeProvider
- [ ] Build theme scripts
- [ ] Write documentation
- [ ] Publish alpha version

#### Week 4: Integration Testing
- [ ] Test primitives + theme integration
- [ ] Fix any dependency issues
- [ ] Update documentation
- [ ] Publish beta versions

**Deliverables**:
- @acrobi/primitives@1.0.0-beta
- @acrobi/theme-system@1.0.0-beta

---

### Phase 2: Feature Extraction (Weeks 5-8)

#### Week 5: @acrobi/aae-hooks
- [ ] Extract all hooks
- [ ] Implement feature detection
- [ ] Write comprehensive tests
- [ ] Create hook documentation
- [ ] Publish alpha version

#### Week 6: @acrobi/service-worker
- [ ] Extract service worker code
- [ ] Implement caching strategies
- [ ] Write tests
- [ ] Create documentation
- [ ] Publish alpha version

#### Week 7: @acrobi/socket-client
- [ ] Extract socket code
- [ ] Create SocketProvider
- [ ] Implement hooks
- [ ] Write tests
- [ ] Publish alpha version

#### Week 8: Integration Testing
- [ ] Test all Phase 2 packages
- [ ] Performance testing
- [ ] Fix issues
- [ ] Publish beta versions

**Deliverables**:
- @acrobi/aae-hooks@1.0.0-beta
- @acrobi/service-worker@1.0.0-beta
- @acrobi/socket-client@1.0.0-beta

---

### Phase 3: Composed Components (Weeks 9-12)

#### Week 9: @acrobi/form-components
- [ ] Extract form structures
- [ ] Implement validation
- [ ] Write tests
- [ ] Create documentation
- [ ] Publish alpha version

#### Week 10: @acrobi/auth-flow
- [ ] Extract auth screens
- [ ] Implement state machine
- [ ] Write tests
- [ ] Create documentation
- [ ] Publish alpha version

#### Week 11: @acrobi/data-display
- [ ] Extract data components
- [ ] Implement features
- [ ] Write tests
- [ ] Create documentation
- [ ] Publish alpha version

#### Week 12: Integration Testing
- [ ] Test all Phase 3 packages
- [ ] End-to-end testing
- [ ] Fix issues
- [ ] Publish RC versions

**Deliverables**:
- @acrobi/form-components@1.0.0-rc
- @acrobi/auth-flow@1.0.0-rc
- @acrobi/data-display@1.0.0-rc

---

### Phase 4: Specialization (Weeks 13-16)

#### Week 13: @acrobi/scanning & @acrobi/location
- [ ] Extract scanning components
- [ ] Extract location components
- [ ] Write tests
- [ ] Create documentation
- [ ] Publish alpha versions

#### Week 14: @acrobi/menu-system
- [ ] Extract menu modules
- [ ] Write tests
- [ ] Create documentation
- [ ] Publish alpha version

#### Week 15: Final Integration & Testing
- [ ] Complete system integration tests
- [ ] Performance optimization
- [ ] Bundle size optimization
- [ ] Documentation review
- [ ] Publish RC versions

#### Week 16: Stable Release
- [ ] Final bug fixes
- [ ] Complete documentation
- [ ] Migration guide
- [ ] Publish stable 1.0.0 versions
- [ ] Announcement & marketing

**Deliverables**:
- All 13 packages@1.0.0 (stable)
- Complete migration guide
- Updated CLI
- Meta-package @acrobi/ui@2.0.0

---

## Risk Assessment

### Technical Risks

#### Risk 1: Circular Dependencies
**Probability**: Medium
**Impact**: High
**Mitigation**:
- Careful dependency planning
- Use dependency injection where possible
- Regular dependency audits

#### Risk 2: Breaking Changes
**Probability**: Medium
**Impact**: High
**Mitigation**:
- Maintain backward compatibility
- Keep meta-package @acrobi/ui
- Gradual deprecation strategy

#### Risk 3: Build Complexity
**Probability**: Low
**Impact**: Medium
**Mitigation**:
- Use proven build tools (tsup, Vite)
- Standardize build configs
- Automated CI/CD

#### Risk 4: Testing Coverage
**Probability**: Medium
**Impact**: Medium
**Mitigation**:
- Set coverage thresholds
- Automated testing in CI
- Regular test reviews

### Organizational Risks

#### Risk 5: Timeline Delays
**Probability**: Medium
**Impact**: Medium
**Mitigation**:
- Buffer time in schedule
- Prioritize critical packages
- Parallel development where possible

#### Risk 6: Documentation Lag
**Probability**: High
**Impact**: Medium
**Mitigation**:
- Document as you build
- Use automated doc generation
- Dedicate documentation time

#### Risk 7: Adoption Resistance
**Probability**: Low
**Impact**: High
**Mitigation**:
- Clear migration guides
- Maintain backward compatibility
- Provide migration support

---

## Success Metrics

### Quantitative Metrics

1. **Package Adoption**:
   - Target: 50% projects use modular packages within 6 months
   - Metric: npm download counts per package

2. **Bundle Size Reduction**:
   - Target: 40-60% reduction in bundle size for selective usage
   - Metric: Bundle analyzer reports

3. **Build Time**:
   - Target: <30s per package build
   - Metric: CI build times

4. **Test Coverage**:
   - Target: >80% coverage across all packages
   - Metric: Coverage reports

5. **Breaking Changes**:
   - Target: 0 breaking changes in v1.x
   - Metric: Semver compliance checks

### Qualitative Metrics

1. **Developer Experience**:
   - Easy package discovery
   - Clear documentation
   - Minimal friction in adoption

2. **Code Quality**:
   - Type safety maintained
   - Accessibility preserved
   - Performance optimized

3. **Community Feedback**:
   - Positive npm reviews
   - GitHub stars/forks
   - Issue response time

---

## Appendix

### A. Package Naming Conventions

**Pattern**: `@acrobi/<name>`

**Rules**:
- Use kebab-case
- Be descriptive but concise
- Reflect package purpose
- Avoid generic names

**Examples**:
- ✅ @acrobi/form-components
- ✅ @acrobi/aae-hooks
- ❌ @acrobi/utils
- ❌ @acrobi/components

### B. acrobi.json Schema

```typescript
interface AcrobiManifest {
  // Required
  id: string;                    // Format: "acrobi.package-name"
  name: string;                  // Human-readable name
  version: string;               // Semver version
  description: string;           // Brief description
  author: {
    name: string;
    email?: string;
    url?: string;
  };
  category: ExtensionCategory;   // See categories below
  main: string;                  // Entry point path

  // Optional
  license?: {
    type: string;                // SPDX identifier
    url?: string;
  };
  keywords?: string[];           // Search keywords
  homepage?: string;             // Homepage URL
  repository?: string;           // Repo URL
  bugs?: string;                 // Issue tracker URL
  dependencies?: string[];       // Other Acrobi packages
  coreVersion?: string;          // Core version requirement
  types?: string;                // TypeScript defs path
  capabilities?: Capability[];   // Provided capabilities
  configSchema?: JSONSchema;     // Configuration schema
}

type ExtensionCategory =
  | 'ai-model'
  | 'data-source'
  | 'shell'
  | 'tool'
  | 'ui-component'
  | 'workflow'
  | 'analytics'
  | 'security'
  | 'other';
```

### C. Migration Checklist Template

For each package:

**Pre-Migration**:
- [ ] Identify components/code to extract
- [ ] Map dependencies
- [ ] Plan API surface
- [ ] Review breaking changes

**Implementation**:
- [ ] Create package directory
- [ ] Set up build config
- [ ] Extract code
- [ ] Create acrobi.json
- [ ] Implement activate/deactivate
- [ ] Create barrel exports
- [ ] Set up tests

**Testing**:
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Visual tests pass
- [ ] Coverage meets threshold

**Documentation**:
- [ ] README complete
- [ ] API docs generated
- [ ] Usage examples created
- [ ] CHANGELOG initialized

**Publishing**:
- [ ] Alpha release
- [ ] Beta release
- [ ] RC release
- [ ] Stable release

**Post-Release**:
- [ ] Monitor adoption
- [ ] Address feedback
- [ ] Update meta-package
- [ ] Update CLI

### D. Useful Commands Reference

```bash
# Create new package
mkdir -p packages/new-package/src
cd packages/new-package
pnpm init

# Build specific package
pnpm --filter @acrobi/package-name build

# Test specific package
pnpm --filter @acrobi/package-name test

# Publish specific package
cd packages/package-name
npm publish --access public

# Create changeset
pnpm changeset

# Version all packages
pnpm changeset version

# Publish all changed packages
pnpm changeset publish

# Build all packages
pnpm --recursive build

# Test all packages
pnpm --recursive test

# Check dependency graph
pnpm list --depth 1

# Update dependencies
pnpm update --latest
```

### E. Resources

**Documentation**:
- Acrobi Framework Docs: https://github.com/Acrobi/acrobi-framework/docs
- Package Integration Guide: /docs/PACKAGE_INTEGRATION_GUIDE.md
- Project Details: /Project-Details.md

**Tools**:
- tsup: https://tsup.egoist.dev/
- Changesets: https://github.com/changesets/changesets
- Vitest: https://vitest.dev/
- Storybook: https://storybook.js.org/

**Community**:
- GitHub: https://github.com/acrobi/acrobi-design-system
- Discussions: https://github.com/acrobi/acrobi-design-system/discussions
- Issues: https://github.com/acrobi/acrobi-design-system/issues

---

## Conclusion

This migration plan provides a comprehensive roadmap for transforming the Acrobi Design System into a modular, framework-integrated ecosystem of packages. The phased approach ensures stability while enabling gradual adoption.

**Next Steps**:
1. Review and approve this migration plan
2. Allocate resources for Phase 1
3. Set up infrastructure (CI/CD, registry access)
4. Begin Phase 1 implementation

**Questions & Feedback**:
Please direct questions and feedback to the Acrobi Design System team via GitHub Discussions.

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-18
**Authors**: Acrobi Design System Team
**Status**: Draft - Pending Approval
