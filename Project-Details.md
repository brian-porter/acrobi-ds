# Acrobi Design System - Complete Project Documentation

**Version:** 1.0.0
**Owner:** Acrobi (DBA of Bucca.com Inc.)
**License:** MIT
**Last Updated:** 2025-11-18

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Architecture & Structure](#architecture--structure)
4. [Component Library](#component-library)
5. [AAE (Advanced Experiences) System](#aae-advanced-experiences-system)
6. [Theme System](#theme-system)
7. [CLI Tool](#cli-tool)
8. [Technology Stack](#technology-stack)
9. [Build & Deployment](#build--deployment)
10. [Testing Infrastructure](#testing-infrastructure)
11. [Documentation](#documentation)
12. [Packaging Opportunities](#packaging-opportunities)
13. [Integration Points](#integration-points)
14. [Project Metrics](#project-metrics)

---

## Executive Summary

The **Acrobi Design System** is a production-ready, comprehensive React component library and design system that provides a complete ecosystem for building modern, accessible web applications. Built with TypeScript, Tailwind CSS, and following WCAG 2.1 AA accessibility standards, it offers 49+ components, 50+ advanced experience hooks, and a CLI-first distribution model.

### Key Highlights

- **Component Library**: 49+ components organized in 3 tiers (Primitives, Structures, Modules)
- **AAE Hooks**: 50+ hooks for accessing modern web platform APIs (camera, GPS, Bluetooth, NFC, etc.)
- **CLI Distribution**: Source code installation via CLI tool for maximum flexibility
- **Theme System**: Dynamic theming with CSS custom properties supporting light/dark modes
- **Monorepo Architecture**: pnpm workspaces with shared configurations
- **Full Type Safety**: TypeScript-first with strict mode enabled
- **Accessibility First**: WCAG 2.1 AA compliant components
- **Modern Build Pipeline**: Vite, Vitest, Storybook, VitePress
- **Cloud Deployment**: Automated deployments to Cloudflare Pages

---

## Project Overview

### Purpose and Vision

The Acrobi Design System serves as the foundational UI library and design language for the Acrobi ecosystem. It enables rapid development of consistent, accessible, and performant web applications while providing advanced platform capabilities through its AAE (Acrobi's Advanced Experiences) hooks system.

### Package Structure

The project is organized as a monorepo with the following packages:

```
acrobi-design-system/
├── @acrobi/ui              # Core component library (v1.0.0)
├── @acrobi/cli             # CLI installation tool (v1.0.0)
├── @acrobi/tailwind-config # Shared Tailwind configuration
└── @acrobi/tsconfig        # Shared TypeScript configurations
```

### Distribution Philosophy

**CLI-First Approach**: Components are distributed as source code (not pre-compiled) via the CLI tool. This allows:
- Direct integration into projects
- Full customization at the source level
- Tree-shaking optimization
- Framework flexibility
- No build artifact dependencies

---

## Architecture & Structure

### Monorepo Organization

```
/home/user/acrobi-ds/
├── packages/              # Published packages
│   ├── ui/               # @acrobi/ui - Core component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── primitives/    # 24 core UI building blocks
│   │   │   │   ├── structures/    # 22 advanced compositions
│   │   │   │   ├── modules/       # Workflow & feature modules
│   │   │   │   └── providers/     # Context providers
│   │   │   ├── hooks/             # 50+ AAE hooks
│   │   │   ├── themes/            # Theme definitions
│   │   │   ├── styles/            # Global styles & CSS
│   │   │   ├── lib/               # Utility functions
│   │   │   ├── service-worker/    # PWA capabilities
│   │   │   ├── types/             # TypeScript definitions
│   │   │   └── stories/           # Storybook stories
│   │   ├── docs/                  # VitePress documentation
│   │   ├── registry.json          # Component catalog
│   │   └── package.json
│   │
│   ├── cli/              # @acrobi/cli - CLI tool
│   │   ├── src/
│   │   │   ├── commands/          # CLI commands
│   │   │   ├── utils/             # Utilities
│   │   │   └── index.ts           # Entry point
│   │   └── package.json
│   │
│   ├── tailwind-config/  # Shared Tailwind setup
│   └── tsconfig/         # Shared TS configs
│
├── apps/                 # Applications
│   └── docs/            # Documentation app
│
├── devlink/             # Webflow integration (53MB)
├── .github/             # CI/CD workflows & scripts
│   ├── workflows/       # 8 GitHub Actions workflows
│   └── scripts/         # Deployment scripts
│
├── test-cli/            # CLI testing
├── test_patterns/       # Pattern testing
├── .kiro/               # Kiro AI steering
└── .swarm/              # Swarm collaboration config
```

### Three-Tier Component Architecture

```
┌─────────────────────────────────────────┐
│         MODULES (20+)                   │
│  Complete workflows & feature sets      │
│  - Authentication flows                 │
│  - Menu systems                         │
│  - Account management                   │
│  - Product grids                        │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│       STRUCTURES (22)                   │
│  Composed UI patterns                   │
│  - Form fields                          │
│  - Button groups                        │
│  - Data tables                          │
│  - Empty states                         │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│       PRIMITIVES (24)                   │
│  Core UI building blocks                │
│  - Button, Input, Select                │
│  - Card, Avatar, Badge                  │
│  - Typography components                │
└─────────────────────────────────────────┘
```

### Design Patterns

1. **Compound Components**: Related components that work together (e.g., Card + CardHeader + CardTitle)
2. **Polymorphic Components**: `asChild` prop for flexible composition
3. **Controlled/Uncontrolled**: Support for both patterns
4. **Variant System**: CVA (Class Variance Authority) for type-safe variants
5. **Data Attributes**: Styling via data attributes for CSS selector targeting
6. **Barrel Exports**: Clean imports via index.ts files
7. **Colocation**: Tests and stories alongside components

---

## Component Library

### Primitives (24 Components)

Core building blocks that form the foundation of the design system.

#### Interactive Components (5)
- **Button** - Multi-variant button with filled, line, text styles
  - Variants: prime, neutral, focus, danger, warn
  - Sizes: xs, sm, md, lg, dy (dynamic)
  - States: default, hover, active, disabled
- **Switch** - Toggle switch control
- **Checkbox** - Checkbox input with indeterminate support
- **Radio** - Radio button control
- **Slider** - Range slider input

#### Typography Components (4)
- **Headline** - Heading component (h1-h6)
- **Paragraph** - Paragraph text
- **Text** - Generic text component
- **Label** - Form label component

#### Layout Components (5)
- **Card** - Container with Header, Title, Description, Content, Footer
- **Avatar** - User avatar with Image and Fallback
- **Badge** - Status badge/pill
- **Banner** - Notification banner
- **Progress** - Progress indicator

#### Form Primitives (8)
- **Input** - Text input field
- **Textarea** - Multi-line text input
- **Select** - Dropdown select
- **Accordion** - Collapsible sections (AcrdItm, AcrdSec, AcrdSecSub)
- **Dialog** - Modal dialog
- **Alert** - Alert/notification component
- **Chip** - Removable tag/chip
- **Chiclet** - Small interactive chip

#### Advanced Control Primitives (13)
- **CboxCtrl** - Checkbox control
- **RdoCtrl** - Radio control
- **SwitchCtrl** - Switch control
- **TextfieldCtrl** - Text field control
- **TextareaCtrl** - Textarea control
- **UploadCtrl** - File upload control
- **SliderCtrl** - Slider control
- **RateCtrl** - Rating control
- **SelectlistCtrl** - Select list control
- **SegBtnCtrl** - Segmented button control
- **SwitchGrpCtrl** - Switch group control
- **CboxGrpCtrl** - Checkbox group control
- **RdoGrpCtrl** - Radio group control

#### Utility Primitives (5)
- **ObjGrp** - Object grouping
- **Snackbar** - Toast notification
- **Spacer** - Spacing component
- **Tooltip** - Tooltip overlay
- **Tag** - Label tag
- **MenuItem** - Menu item component
- **Breadcrumb** - Breadcrumb navigation
- **List** - List component

### Structures (22 Components)

Advanced compositions built from primitives.

#### Form Structures (7)
- **TextField** - Complete text input with label, error, hint
- **TextareaField** - Complete textarea with label, error, hint
- **SelectField** - Complete select with label, error, hint
- **CheckboxField** - Complete checkbox with label
- **SwitchField** - Complete switch with label
- **RadioField** - Complete radio with label
- **SliderField** - Complete slider with label, value display

#### Grouping Structures (6)
- **ButtonPanel** - Panel of related buttons
- **ButtonGroup** - Grouped buttons
- **ContainerGroup/ObjectGroup** - Container grouping
- **CheckboxGroup** - Group of checkboxes
- **RadioGroup** - Group of radio buttons
- **List/ListItem** - List structure

#### Data Display Structures (5)
- **BannerStructure** - Composed banner
- **HeadlineStructure** - Composed headline
- **BreadcrumbStructure** - Breadcrumb navigation
- **EmptyState** - Empty state with variants (Collection, Search, Filter, Error)
- **DataTable** - Data table component

#### Advanced Input Structures (3)
- **UploadField** - File upload field
- **GrantPermissions** - Permission granting UI
- **FilterBar** - Filter controls

#### Composed Structures (7)
- **InputWBtns** - Input with buttons
- **BtnBar** - Button bar
- **SecHead** - Section header
- **ListGrid** - List grid layout
- **ChipGroup** - Group of chips
- **ListItmContent** - List item content
- **KeyboardAvoidingView** - Keyboard-aware view
- **LocationMap** - Interactive map component

### Authentication Flow Structures (8)

Complete authentication and onboarding screens:

- **SAuthCreateAccount** - Account creation screen
- **SAuthVerifyContact** - Contact verification screen
- **SAuthAddSecondaryContact** - Secondary contact addition
- **SAuthPasskey** - Passkey setup screen
- **SAuthHandle** - Username/handle selection
- **SAuthFork** - Account type selection
- **SAuthConnectSocials** - Social account connection
- **SAuthSetFavorites** - Interest/favorites selection

### Account Management Structures (6)

- **SProfileForm** - Profile editing form
- **SSecurityForm** - Security settings form
- **SSettingsForm** - General settings form
- **SConnectionsList** - Connected accounts list
- **SPermissionsList** - App permissions list
- **SListItemLink/SListItemSwitch** - List item variants

### Platform Detection Structures (3)

- **FeatureGuard** - Feature availability guard
- **MultipleFeatureGuard** - Multiple feature guard
- **FeatureDetectionProvider** - Feature detection context

### Modules (20+)

Complete workflow and feature modules.

#### Content Modules (3)
- **Hero** - Hero section
- **SecList** - Section list
- **ProductGrid** - Product grid display

#### Action Modules (5)
- **AddCollection** - Add to collection
- **AssignTo** - Assignment workflow
- **Copy** - Copy functionality
- **Delete** - Delete workflow
- **Archive** - Archive workflow

#### Content Creation (2)
- **Capture** - Media capture module
- **TextEditor** - Rich text editor

#### Menu System (7)
- **MenuActions** - Action menu
- **MenuPosts** - Post menu
- **MenuAdmin** - Admin menu
- **MenuViewStyle** - View style selector
- **MenuSortStyle** - Sort options menu
- **MenuSearch** - Search menu
- **MenuPrivacy** - Privacy settings menu

#### AAE Modules (3)
- **FindFriends** - Friend finding workflow
- **GrantPermissions** - Permission granting
- **Scanner** - Barcode/QR scanner

#### Account Interface Modules (5)
- **MImgEdit** - Image editing module
- **MPasswordEdit** - Password change module
- **MDeleteAccount** - Account deletion module
- **MGrant** - Grant management
- **MSearchDialog** - Search dialog

#### Core Workflow Module (1)
- **MAuthFlow** - State machine-based authentication flow orchestrator

### Client-Specific Components

Located in `src/components/client/`:

#### Client Modules
- **ActivityGrid** - Activity feed grid
- **PeepSection** - User/peep section
- **GroupSection** - Group section

#### Client Structures
- **AssetHeader** - Asset header component
- **AssetCard** - Asset card display
- **SnippetCard** - Snippet card
- **Various snippets** - Code and content snippets

---

## AAE (Advanced Experiences) System

### Overview

AAE (Acrobi's Advanced Experiences) is a comprehensive collection of 50+ React hooks that provide access to modern web platform APIs, enabling native-like experiences in web applications.

### AAE Categories

#### 1. Hardware & Sensors (12 hooks)

**Camera & Media Capture:**
- `useCamera` - Photo capture with front/rear camera selection
- `useVideoRecorder` - Video recording with controls
- `useAudioRecorder` - Audio recording functionality
- `useScreenCapture` - Screen recording capabilities
- `useImageLoader` - Advanced image loading

**Location & Motion:**
- `useGeolocation` - GPS location with geofencing
- `useDeviceMotion` - Accelerometer, gyroscope data
- `useDeviceOrientation` - Device orientation (alpha, beta, gamma)
- `useCompassHeading` - Compass heading data
- `useShake` - Shake gesture detection

**Scanning & Recognition:**
- `useBarcodeScanner` - Barcode/QR code scanning
- `useQRScanner` - Specialized QR code scanner

#### 2. Connectivity (7 hooks)

- `useBluetooth` - Bluetooth device connection
- `useWebBluetooth` - Web Bluetooth API
- `useNetwork` - Network status monitoring
- `useSocket` - WebSocket connection management
- `useSocketEvent` - Socket event listeners
- `useSocketEmit` - Socket message emission
- `useSocketRoom` - Socket room management
- `useSocketMessages` - Message handling
- `useSocketHealth` - Connection health monitoring

#### 3. Input Methods (5 hooks)

- `useKeyboard` - Keyboard detection and handling
- `useKeyboardAAE` - Advanced keyboard features
- `useVisualViewport` - Visual viewport tracking
- `useContactPicker` - Contact picker API
- `useFilePicker` - File picker API

#### 4. Native Platform (8 hooks)

- `useNative` - Native platform detection
- `usePlatform` - Platform capabilities
- `useFeatureDetection` - Feature availability detection
- `useAAEDisplay` - Display mode detection
- `usePWADisplay` - PWA display mode
- `useWindowManager` - Window management
- `useScreenOrientation` - Screen orientation control
- `useWakeLock` - Screen wake lock

#### 5. User Interaction (5 hooks)

- `useHaptics` - Haptic feedback (vibration)
- `useWebShare` - Native share dialog
- `useFileSystem` - File system access
- `usePaymentRequest` - Payment request API
- `useAppBadge` - App badge updates

#### 6. Security & Auth (2 hooks)

- `useWebAuthn` - WebAuthn/passkey authentication
- `usePushNotifications` - Push notification management

#### 7. Voice & Audio (2 hooks)

- `useTTS` - Text-to-speech
- `useSpeechRecognition` - Speech-to-text

#### 8. Advanced APIs (2 hooks)

- `useNFC` - Near Field Communication
- `usePaymentRequest` - Payment request API

#### 9. Offline & PWA (4 hooks)

- `useBackgroundSync` - Background data sync
- `useBackgroundFetch` - Background downloads
- `usePeriodicSync` - Periodic background sync
- `useCachedApi` - Cached API requests

#### 10. State Management (3 hooks)

- `useLocalStorage` - Persistent local storage
- `usePersistentForm` - Form state persistence
- `useAuthFlow` - Authentication flow state

### AAE Implementation Patterns

All AAE hooks follow consistent patterns:

1. **Permission Handling**: Automatic permission request and management
2. **Feature Detection**: Built-in feature availability checking
3. **Error Handling**: Comprehensive error states and messages
4. **Loading States**: Async operation status tracking
5. **TypeScript Support**: Full type safety with interfaces
6. **Browser Compatibility**: Graceful degradation on unsupported platforms

### Example Usage

```typescript
import { useGeolocation, useCamera, useBarcodeScanner } from '@acrobi/ui';

function MyComponent() {
  const { location, error, loading } = useGeolocation({
    enableHighAccuracy: true,
    watch: true
  });

  const { capture, stream } = useCamera({
    facingMode: 'user'
  });

  const { scan, result } = useBarcodeScanner({
    formats: ['QR_CODE', 'EAN_13']
  });

  // ... component logic
}
```

---

## Theme System

### Architecture

The theme system uses CSS custom properties for runtime theme switching without rebuilds.

#### Theme Structure

```
themes/
├── base/                  # Base theme tokens
│   ├── acrobi/           # Acrobi light theme
│   │   ├── colors.ts     # Color tokens
│   │   ├── typography.ts # Typography tokens
│   │   ├── spacing.ts    # Spacing scale
│   │   ├── motion.ts     # Animation tokens
│   │   ├── audio.ts      # Sound tokens
│   │   └── haptics.ts    # Haptic patterns
│   └── acrobi-dark/      # Acrobi dark theme
│       └── ... (same structure)
├── acrobi.ts             # Theme export
└── index.ts              # Main exports
```

### Theme Tokens

#### Color System
- **Primary Colors**: Brand colors with 9 shades each
- **Semantic Colors**: success, warning, error, info
- **Neutral Colors**: Grayscale palette
- **Surface Colors**: Background and card colors
- **Text Colors**: Typography colors with contrast ratios

#### Typography Tokens
- **Font Families**: Heading, body, mono
- **Font Sizes**: 11 size scale (xs to 5xl)
- **Line Heights**: Corresponding line heights
- **Font Weights**: 100-900 scale
- **Letter Spacing**: Tracking values

#### Spacing Scale
- **0-96**: Consistent 4px-based spacing scale
- **Custom Sizes**: Container, section, component spacing

#### Motion Tokens
- **Durations**: Fast (150ms), base (250ms), slow (350ms)
- **Easings**: Ease-in, ease-out, ease-in-out
- **Spring**: Spring animation configs

#### Audio Tokens
- **Sound Effects**: Click, swipe, success, error sounds
- **Haptic Patterns**: Light, medium, heavy vibrations

### Theme Provider

```typescript
import { ThemeProvider } from '@acrobi/ui';

function App() {
  return (
    <ThemeProvider defaultTheme="acrobi" enableDarkMode>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Features

- **Dynamic Switching**: Runtime theme changes via CSS variables
- **Dark Mode Support**: Built-in light/dark mode toggle
- **Custom Themes**: Create custom themes using base tokens
- **Type Safety**: TypeScript interfaces for theme tokens
- **CSS Export**: Themes compiled to CSS for non-React usage

### Theme Builder

Custom script for theme compilation:

```bash
# Build all themes
npm run build:themes

# Watch mode for development
npm run build:themes:watch

# Create new theme
npm run create:theme
```

**Script Location**: `/home/user/acrobi-ds/packages/ui/scripts/build-themes.js`

---

## CLI Tool

### Overview

The `@acrobi/cli` package provides a command-line interface for installing and managing Acrobi Design System components.

### Philosophy

**Source Code Installation**: Unlike traditional component libraries that distribute compiled code, the Acrobi CLI installs components as source code directly into your project. This provides:

- **Full Customization**: Modify components at the source level
- **Tree Shaking**: Only bundle what you use
- **Zero Dependencies**: No runtime dependencies on the design system
- **Framework Agnostic**: Adapt components to any React setup
- **Version Control**: Track component changes in your repo

### Commands

#### `acrobi init`
Initialize the design system in your project.

```bash
acrobi init
```

Creates:
- `components/acrobi/` directory
- Tailwind configuration
- TypeScript configuration
- Required dependencies in package.json

#### `acrobi add [component]`
Add components to your project.

```bash
# Add specific component
acrobi add button

# Add multiple components
acrobi add button card input

# Interactive selection
acrobi add
```

Features:
- Automatic dependency resolution
- Installs required primitives
- Updates import paths
- Copies component source code

#### `acrobi list`
Browse available components.

```bash
acrobi list

# Filter by category
acrobi list --category primitives
acrobi list --category structures
```

Displays:
- Component name
- Description
- Category
- Dependencies
- Version

#### `acrobi remove [component]`
Remove installed components.

```bash
acrobi remove button
```

Features:
- Safe removal (checks for dependencies)
- Cleanup unused files
- Updates configurations

#### `acrobi theme`
Manage themes.

```bash
# List available themes
acrobi theme list

# Install theme
acrobi theme add acrobi-dark

# Create custom theme
acrobi theme create my-theme
```

### Configuration

The CLI uses `registry.json` to manage components:

```json
{
  "components": [
    {
      "name": "button",
      "category": "primitives",
      "description": "Interactive button component",
      "files": ["components/primitives/button.tsx"],
      "dependencies": [],
      "version": "1.0.0"
    }
  ]
}
```

### Package Details

- **Package**: `@acrobi/cli`
- **Version**: 1.0.0
- **Binary**: `acrobi`
- **Repository**: https://github.com/acrobi/acrobi-design-system
- **License**: MIT

---

## Technology Stack

### Core Technologies

#### Frontend Framework
- **React**: 18.0.0+
  - Modern JSX transform
  - Hooks-based architecture
  - Concurrent features ready

#### Language
- **TypeScript**: 5.0.0+
  - Strict mode enabled
  - Full type coverage
  - Type exports alongside components

#### Styling
- **Tailwind CSS**: 3.0.0+
  - Utility-first approach
  - Custom theme configuration
  - JIT compilation
- **Class Variance Authority (CVA)**: Component variant management
- **clsx**: Conditional classNames
- **tailwind-merge**: Intelligent class merging

### Build Tools

#### Development
- **Vite**: 5.0.0+
  - Fast HMR
  - ESBuild-powered
  - Optimized builds

#### Component Development
- **Storybook**: 9.1.0
  - Component isolation
  - Visual testing
  - Documentation generation
  - Interaction testing

#### Documentation
- **VitePress**: 1.0.0
  - Vue-powered SSG
  - Markdown-based
  - Fast navigation

### Testing Infrastructure

#### Unit Testing
- **Vitest**: 2.0.0+
  - Vite-native testing
  - Jest-compatible API
  - Fast execution
- **@testing-library/react**: 16.0.0+
  - Component testing utilities
  - User-centric queries
  - Accessibility testing

#### E2E Testing
- **Puppeteer**: 23.0.0+
  - Browser automation
  - Visual regression testing
  - Screenshot comparison

#### Test Environment
- **jsdom**: 25.0.0+
  - Browser-like environment
  - DOM manipulation
  - Web API mocking

### Code Quality

#### Linting
- **ESLint**: 8.0.0
  - TypeScript support
  - React plugin
  - React Hooks plugin
  - Storybook plugin

#### Formatting
- **Prettier**: 3.0.0
  - Code formatting
  - Import sorting
  - Consistent style

#### Git Hooks
- **Husky**: 9.1.7
  - Pre-commit hooks
  - Commit message validation

### Package Management

- **pnpm**: 10.13.1
  - Fast, disk-efficient
  - Workspace support
  - Strict dependency resolution
- **Node.js**: 20.0.0+ required

### Specialized Libraries

#### Animation
- **GSAP**: 3.12.5
  - Advanced animations
  - Timeline control
  - Plugin ecosystem

#### Maps
- **Leaflet**: 1.9.4
  - Interactive maps
  - Tile layer support
- **react-leaflet**: 5.0.0
  - React integration

#### Scanning
- **@zxing/library**: 0.21.3
  - Barcode decoding
  - QR code support
- **@zxing/browser**: 0.1.5
  - Browser integration

#### UI Primitives
- **vaul**: 1.1.2
  - Drawer component
  - Gesture support

### CLI Dependencies

- **commander**: 11.0.0 - CLI framework
- **chalk**: 5.0.0 - Terminal styling
- **inquirer**: 9.0.0 - Interactive prompts
- **fs-extra**: 11.0.0 - File system utilities

---

## Build & Deployment

### Build Process

#### UI Package Build

```json
{
  "build": "tsc && npm run build:styles",
  "build:styles": "tailwindcss -i ./src/styles/globals.css -o ./dist/styles.css --minify"
}
```

**Steps:**
1. TypeScript compilation (`tsc`)
2. Style processing with Tailwind
3. Theme building
4. CSS minification

**Output:**
- `packages/ui/dist/` - Compiled TypeScript
- `packages/ui/dist/styles.css` - Minified styles

#### CLI Package Build

```json
{
  "build": "npm run clean && tsc && chmod +x dist/index.js"
}
```

**Output:**
- `packages/cli/dist/` - Compiled CLI
- Executable binary

#### Storybook Build

```bash
npm run storybook:build
```

**Output:**
- `packages/ui/storybook-static/` - Static Storybook site

#### Documentation Build

```bash
npm run docs:build
```

**Output:**
- `packages/ui/docs/.vitepress/dist/` - Static documentation site

### Development Scripts

```json
{
  "dev": "pnpm --filter ui dev",                    // Start Storybook
  "build": "pnpm --recursive --filter ui build && pnpm --recursive --filter cli build",
  "test": "pnpm --recursive test",                  // Run all tests
  "test:coverage": "pnpm --recursive test -- --coverage",
  "lint": "pnpm --recursive lint",                  // Lint all packages
  "lint:fix": "pnpm --recursive lint:fix",         // Fix linting issues
  "format": "prettier --write .",                   // Format code
  "type-check": "pnpm --recursive type-check",     // TypeScript checks
  "docs:dev": "cd packages/ui && npm run docs:dev", // VitePress dev server
  "storybook:dev": "cd packages/ui && pnpm dev"    // Storybook dev server
}
```

### CI/CD Pipeline

#### GitHub Actions Workflows

Located in `.github/workflows/`:

1. **ci.yml** - Continuous Integration
   - Runs on: Pull requests, pushes to main
   - Steps:
     - Install dependencies
     - Run linting
     - Run type checking
     - Run tests
     - Build all packages
   - Size: 12,857 bytes

2. **deploy-docs-cloudflare.yml** - Documentation Deployment
   - Builds VitePress documentation
   - Deploys to Cloudflare Pages
   - Project: `acrobi-docs`
   - URL: `acrobi-docs.pages.dev`
   - Size: 8,340 bytes

3. **deploy-storybook-cloudflare.yml** - Storybook Deployment
   - Builds Storybook static site
   - Deploys to Cloudflare Pages
   - Project: `acrobi-storybook`
   - URL: `acrobi-storybook.pages.dev`
   - Size: 10,826 bytes

4. **deploy-all.yml** - Combined Deployment
   - Manual workflow trigger
   - Deploys all sites simultaneously
   - Size: 2,363 bytes

5. **release.yml** - Release Management
   - Handles versioning
   - Publishes to NPM
   - Creates GitHub releases
   - Size: 14,529 bytes

6. **docs.yml** - Documentation Workflow
   - Additional doc processing
   - Size: 20,718 bytes

#### Deployment Targets

**Cloudflare Pages:**
- Documentation: `https://acrobi-docs.pages.dev`
- Storybook: `https://acrobi-storybook.pages.dev`

**NPM Registry:**
- `@acrobi/ui`
- `@acrobi/cli`

### Release Process

```bash
# Create changeset
npm run changeset

# Version packages
npm run changeset:version

# Build and publish
npm run release
```

Using **Changesets** for version management:
- Semantic versioning
- Automated changelogs
- Monorepo versioning coordination

---

## Testing Infrastructure

### Test Organization

```
Total Test Files: 28
├── Hook Tests (14)
│   ├── use-feature-detection.test.ts
│   ├── use-barcode-scanner.test.ts
│   ├── use-platform.test.ts
│   ├── use-nfc.test.ts
│   ├── use-haptic-feedback.test.ts
│   ├── use-qr-scanner.test.ts
│   ├── use-audio-recorder.test.ts
│   ├── use-geolocation.test.ts
│   ├── use-keyboard-aae.test.ts
│   ├── use-screen-capture.test.ts
│   ├── use-video-recorder.test.ts
│   ├── use-device-orientation.test.ts
│   ├── use-keyboard.test.ts
│   └── use-visual-viewport.test.ts
│
├── Component Tests
│   └── obj-grp.test.tsx
│
├── Acceptance Tests (6)
│   ├── documentation-site.test.ts
│   ├── cli-theme-management.test.ts
│   ├── performance.test.ts
│   ├── theme-application.test.ts
│   ├── themescss.no-root.spec.ts
│   └── themescss.dark-variant.spec.ts
│
└── Structure/Module Tests
```

### Testing Configuration

**Vitest Config** (`vitest.config.ts`):
```typescript
{
  environment: 'jsdom',
  setupFiles: ['src/test/setup.ts'],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html']
  }
}
```

### Test Scripts

```json
{
  "test": "vitest",
  "test:coverage": "vitest --coverage",
  "test:storybook": "vitest run src/test/storybook-visual-testing.test.ts",
  "test:storybook:watch": "vitest src/test/storybook-visual-testing.test.ts"
}
```

### Test Utilities

**Setup File**: `src/test/setup.ts`
- Global test configuration
- Mock setup
- Custom matchers
- Test environment initialization

**Helpers**: `src/test/acceptance/helpers/`
- CSS file utilities
- Test data generators
- Assertion helpers

### Visual Testing

Using **Puppeteer** for:
- Screenshot capture
- Visual regression testing
- Storybook story validation
- Component rendering verification

---

## Documentation

### Documentation Structure

The project includes 112 markdown documentation files organized as follows:

#### Root Documentation (14 files)

- `README.md` - Main project overview
- `CONTRIBUTING.md` - Contributor License Agreement
- `CHANGELOG.md` - Version history
- `DEPLOYMENT.md` - Deployment guide
- `LICENSE.md` - MIT license with dual-licensing
- `V2_RELEASE_NOTES.md` - Version 2 information
- `MIGRATION_STATUS.md` - Migration tracking
- `MIGRATION_COMPLETE_STATUS.md` - Completed migrations
- `COMPREHENSIVE_PRD_AUDIT_REPORT.md` - Product requirements audit
- `BUTTON_THEME_FIX_SUMMARY.md` - Theme fix documentation
- `VITEPRESS_FIXES_SUMMARY.md` - VitePress fixes
- `SWARM_DEPLOYMENT_STATUS.md` - Swarm deployment info
- `NEXT_TASKS_DEPLOYMENT.md` - Upcoming tasks

#### VitePress Documentation Site

Located in `packages/ui/docs/`:

```
docs/
├── getting-started.md        # Installation & setup guide
├── migration-guide.md        # Migration documentation
│
├── components/              # Component documentation
│   ├── primitives/
│   │   ├── README.md
│   │   └── index.md
│   ├── structures/
│   │   ├── README.md
│   │   └── index.md
│   ├── Banner.md
│   └── RdoGrp-Ctrl.md
│
├── hooks/                   # AAE hooks documentation
│   ├── README.md
│   ├── index.md
│   ├── use-geolocation.md
│   ├── use-camera.md
│   ├── use-barcode-scanner.md
│   ├── use-feature-detection.md
│   ├── use-platform.md
│   ├── use-video-recorder.md
│   └── use-audio-recorder.md
│
├── structures/             # Structure components
│   └── location-map.md
│
├── examples/               # Usage examples
│   ├── README.md
│   ├── index.md
│   ├── simple-form.md
│   ├── card-layout.md
│   └── dashboard-app.md
│
└── scripts/               # Build scripts documentation
    └── README.md
```

#### Storybook Documentation

- **Location**: Colocated with components as `.stories.tsx` files
- **Configuration**: `packages/ui/.storybook/`
  - `main.ts` - Storybook configuration
  - `preview.ts` - Global decorators and parameters
- **Purpose**: Component playground and visual documentation
- **Deployment**: `acrobi-storybook.pages.dev`

#### Component Registry

**File**: `packages/ui/registry.json`

Comprehensive component catalog including:
- Component names and descriptions
- Categories (interactive, feedback, layout, form, etc.)
- Version information
- File paths
- Dependencies
- Props documentation
- Usage examples

### Package Documentation

- `packages/ui/README.md` - UI package documentation
- `packages/cli/README.md` - CLI package documentation

---

## Packaging Opportunities

Based on the analysis, here are identified opportunities for extracting reusable packages for the Acrobi ecosystem:

### 1. **@acrobi/aae-hooks** (High Priority)

**Description**: Extract all 50+ AAE hooks into a standalone package

**Contents**:
- All hooks from `src/hooks/`
- Feature detection utilities
- Platform detection
- Type definitions

**Value Proposition**:
- Reusable across any React application
- Framework-agnostic (React only dependency)
- No UI component dependencies
- Can be used independently

**Estimated Size**: ~200KB (source)

**Dependencies**:
- React 18+
- TypeScript types

**Potential Users**:
- Package manager application
- Any Acrobi React app
- External projects

---

### 2. **@acrobi/primitives** (High Priority)

**Description**: Core UI primitives as a standalone package

**Contents**:
- All 24 primitive components
- Base utility functions (cn, etc.)
- Primitive types
- Basic styles

**Value Proposition**:
- Foundation for any UI
- Highly reusable
- Minimal dependencies
- Can be customized per project

**Estimated Size**: ~150KB (source)

**Dependencies**:
- React 18+
- class-variance-authority
- clsx
- tailwind-merge

---

### 3. **@acrobi/theme-system** (Medium Priority)

**Description**: Complete theming solution

**Contents**:
- Theme provider
- Theme builder scripts
- Theme tokens (colors, typography, spacing)
- CSS custom property system
- Light/dark mode utilities

**Value Proposition**:
- Consistent theming across apps
- Runtime theme switching
- Design token management
- Multi-theme support

**Estimated Size**: ~80KB (source)

**Dependencies**:
- React 18+
- Tailwind CSS

---

### 4. **@acrobi/auth-flow** (Medium Priority)

**Description**: Complete authentication flow module

**Contents**:
- All authentication structures (8 screens)
- Auth flow state machine (MAuthFlow)
- Auth hooks (useAuthFlow)
- Type definitions

**Value Proposition**:
- Drop-in authentication UI
- Complete onboarding flow
- Customizable screens
- State machine orchestration

**Estimated Size**: ~120KB (source)

**Dependencies**:
- @acrobi/primitives
- @acrobi/structures
- React 18+

---

### 5. **@acrobi/form-components** (Medium Priority)

**Description**: Complete form system

**Contents**:
- All form structures (7 field types)
- Form primitives (all control components)
- Form validation utilities
- Type definitions

**Value Proposition**:
- Comprehensive form solution
- Type-safe form handling
- Consistent validation
- Accessible by default

**Estimated Size**: ~100KB (source)

**Dependencies**:
- @acrobi/primitives
- React 18+

---

### 6. **@acrobi/service-worker** (Low-Medium Priority)

**Description**: PWA and offline capabilities

**Contents**:
- Service worker implementation
- Multi-strategy caching
- Background sync utilities
- Offline detection
- PWA hooks

**Value Proposition**:
- Drop-in PWA support
- Advanced caching strategies
- Offline-first capabilities
- Background sync

**Estimated Size**: ~40KB (source)

**Dependencies**:
- None (vanilla JS service worker)

---

### 7. **@acrobi/socket-client** (Medium Priority)

**Description**: WebSocket/Socket.IO integration

**Contents**:
- SocketProvider
- All socket hooks (6 hooks)
- Connection management
- Type definitions

**Value Proposition**:
- Real-time communication
- Room management
- Event handling
- Connection health monitoring

**Estimated Size**: ~30KB (source)

**Dependencies**:
- React 18+
- Socket.IO client (peer dependency)

---

### 8. **@acrobi/menu-system** (Low Priority)

**Description**: Complete menu module system

**Contents**:
- All menu modules (7 menus)
- Menu primitives
- Menu state management

**Value Proposition**:
- Consistent menu UI
- Common menu patterns
- Reusable across apps

**Estimated Size**: ~60KB (source)

**Dependencies**:
- @acrobi/primitives
- React 18+

---

### 9. **@acrobi/data-display** (Low Priority)

**Description**: Data display components

**Contents**:
- DataTable
- ListGrid
- EmptyState variants
- Related structures

**Value Proposition**:
- Common data display patterns
- Consistent UI for data
- Accessibility built-in

**Estimated Size**: ~50KB (source)

**Dependencies**:
- @acrobi/primitives
- React 18+

---

### 10. **@acrobi/scanning** (Medium Priority)

**Description**: Barcode and QR code scanning

**Contents**:
- useBarcodeScanner
- useQRScanner
- Scanner module
- Scanning utilities

**Value Proposition**:
- Easy barcode/QR integration
- Camera access abstraction
- Format detection

**Estimated Size**: ~35KB (source)

**Dependencies**:
- @zxing/library
- @zxing/browser
- React 18+

---

### 11. **@acrobi/location** (Low Priority)

**Description**: Location and mapping

**Contents**:
- useGeolocation
- LocationMap component
- Map utilities

**Value Proposition**:
- GPS functionality
- Interactive maps
- Geofencing support

**Estimated Size**: ~40KB (source)

**Dependencies**:
- Leaflet
- react-leaflet
- React 18+

---

### 12. **@acrobi/tailwind-config** (Already Exists)

**Description**: Shared Tailwind configuration

**Status**: Already separated as a package

**Value Proposition**:
- Consistent Tailwind setup
- Shared across projects
- Custom theme configuration

---

### 13. **@acrobi/tsconfig** (Already Exists)

**Description**: Shared TypeScript configurations

**Status**: Already separated as a package

**Value Proposition**:
- Consistent TypeScript setup
- Multiple config variants
- Best practices encoded

---

## Package Dependency Graph

```
@acrobi/tsconfig
       ↑
       │
@acrobi/tailwind-config ←──────────────────┐
       ↑                                    │
       │                                    │
@acrobi/primitives ←────────────────────────┤
       ↑                                    │
       │                                    │
       ├──────→ @acrobi/form-components    │
       ├──────→ @acrobi/data-display       │
       └──────→ @acrobi/auth-flow          │
                                            │
@acrobi/aae-hooks                           │
       ↑                                    │
       ├──────→ @acrobi/scanning           │
       ├──────→ @acrobi/location           │
       └──────→ @acrobi/socket-client      │
                                            │
@acrobi/theme-system ───────────────────────┘
       ↑
       │
@acrobi/service-worker (standalone)
@acrobi/menu-system (depends on primitives)
@acrobi/cli (standalone)
@acrobi/ui (monolithic - contains all)
```

---

## Integration Points

### For Package Manager Application

#### 1. AAE Capabilities
- Use `@acrobi/aae-hooks` for device capabilities
- Implement file system access with `useFileSystem`
- Use `useLocalStorage` for persistent state
- Leverage `useSocket` for real-time updates

#### 2. UI Components
- Use `@acrobi/primitives` for base UI
- Use `@acrobi/form-components` for settings
- Use `@acrobi/data-display` for package lists

#### 3. Offline Support
- Integrate `@acrobi/service-worker` for offline package browsing
- Use `useCachedApi` for package metadata

### For Acrobi Framework

#### 1. Authentication
- Drop in `@acrobi/auth-flow` for user onboarding
- Use `useWebAuthn` for passwordless auth
- Leverage auth state machine

#### 2. Real-time Features
- Use `@acrobi/socket-client` for live updates
- Implement real-time collaboration

#### 3. Theming
- Use `@acrobi/theme-system` for consistent branding
- Enable user theme customization
- Support light/dark modes

#### 4. Mobile Features
- Use AAE hooks for native-like experiences
- Implement `useGeolocation` for location features
- Use `useCamera` for photo uploads
- Leverage `useHaptics` for feedback

### Shared Infrastructure

#### Build Tools
- Share Vite configuration
- Share TypeScript configs via `@acrobi/tsconfig`
- Share Tailwind setup via `@acrobi/tailwind-config`

#### Testing
- Share Vitest setup
- Share testing utilities
- Share test patterns

#### Documentation
- Share VitePress setup
- Share Storybook configuration
- Share documentation patterns

---

## Project Metrics

### Codebase Size

- **Total Source Code**: 6.5MB (UI package src/)
- **Lines of Code (Primitives)**: 37,270 lines
- **Total Components**: 49+ (24 primitives + 22 structures + modules)
- **Total Hooks**: 50+
- **Documentation Files**: 112 markdown files
- **Test Files**: 28 test files
- **Storybook Stories**: Extensive (colocated with components)

### Package Metrics

#### @acrobi/ui
- **Version**: 1.0.0
- **Main Export**: `./src/index.ts`
- **Dependencies**: 9 production dependencies
- **Dev Dependencies**: 18 development dependencies

#### @acrobi/cli
- **Version**: 1.0.0
- **Binary**: `acrobi`
- **Dependencies**: 4 production dependencies
- **Dev Dependencies**: 4 development dependencies

### Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Requirements

- **Node.js**: 20.0.0+
- **pnpm**: 9.0.0+ (10.13.1 recommended)
- **React**: 18.0.0+

### Workflow Metrics

- **GitHub Workflows**: 8 automated workflows
- **Total Workflow Code**: ~70KB
- **CI/CD Coverage**: Full automation

### Documentation Metrics

- **VitePress Pages**: 20+ documentation pages
- **Component Stories**: 49+ Storybook stories
- **Example Code**: 5+ complete examples
- **API Documentation**: Full coverage via TypeScript

### Testing Metrics

- **Unit Tests**: 28 test files
- **Test Coverage**: Hooks, components, acceptance
- **Visual Tests**: Storybook visual regression
- **E2E Tests**: Puppeteer-based

---

## Technology Highlights

### Modern Web Platform APIs

The design system showcases cutting-edge web platform integration:

1. **Web Authentication API**: Passwordless authentication
2. **Geolocation API**: GPS and location tracking
3. **Media Capture API**: Camera and microphone access
4. **Bluetooth API**: Device connectivity
5. **NFC API**: Near-field communication
6. **Payment Request API**: Native payment flows
7. **Web Share API**: Native sharing
8. **Service Worker API**: Offline capabilities
9. **Background Sync API**: Offline-first data sync
10. **Vibration API**: Haptic feedback

### Accessibility Features

- **WCAG 2.1 AA Compliance**: All components meet standards
- **ARIA Attributes**: Built into components
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: Meets contrast requirements

### Performance Optimizations

- **Tree Shaking**: Source code distribution enables optimal bundling
- **Code Splitting**: Modular architecture supports lazy loading
- **CSS Optimization**: Tailwind JIT compilation
- **Image Optimization**: Advanced image loading hooks
- **Caching Strategies**: Multi-level service worker caching
- **TypeScript**: Compile-time optimizations

---

## Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Start Storybook (component development)
pnpm storybook:dev

# Start VitePress (documentation)
pnpm docs:dev

# Run tests in watch mode
pnpm test

# Build all packages
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format
```

### Testing Workflow

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Visual testing (Storybook)
pnpm test:storybook

# Watch mode
pnpm test:storybook:watch
```

### Theme Development

```bash
# Build themes
pnpm --filter ui build:themes

# Watch mode for theme development
pnpm --filter ui build:themes:watch

# Create new theme
pnpm --filter ui create:theme
```

### Release Workflow

```bash
# Create changeset (for tracking changes)
pnpm changeset

# Version packages
pnpm changeset:version

# Build and publish
pnpm release
```

---

## Special Features

### 1. Devlink Integration

**Location**: `/home/user/acrobi-ds/devlink/` (53MB)

**Purpose**: Integration with Webflow design tool

**Features**:
- Pre-built UI components from Webflow designs
- CSS Modules pattern
- Design-to-code workflow
- Visual design sync

### 2. AI Development Support

**Kiro Steering**: `.kiro/` directory
- AI-assisted development guidance
- Code generation templates
- Best practices enforcement

**Swarm Collaboration**: `.swarm/` directory
- Multi-agent AI development
- Distributed across component levels
- Coordinated development tasks

### 3. State Machine Authentication

**MAuthFlow Module**:
- Complete authentication state machine
- 8 screen workflow
- Type-safe state transitions
- Pluggable authentication methods

### 4. Multi-Strategy Service Worker

**Advanced Caching**:
- Cache First: Static assets (fonts, images)
- Network First: Critical APIs
- Stale-While-Revalidate: Dynamic content
- Offline Fallback: Graceful degradation
- Background Sync: Queue actions when offline
- Cache Versioning: Automatic cleanup

### 5. Socket.IO Provider System

**Real-time Communication**:
- Connection management
- Event handling
- Room subscriptions
- Message queuing
- Health monitoring
- Automatic reconnection

---

## Future Considerations

### Potential Enhancements

1. **Component Variants**:
   - Additional style variants per component
   - More size options
   - Industry-specific variants (healthcare, finance, etc.)

2. **AAE Expansion**:
   - More platform API integrations
   - Web3/Crypto wallet hooks
   - AR/VR capabilities (WebXR)
   - WebGPU integration

3. **Theme Marketplace**:
   - Community-contributed themes
   - Industry-standard themes (Material, Fluent, etc.)
   - Theme customization tool

4. **CLI Enhancements**:
   - Interactive component customization during install
   - Component search and discovery
   - Dependency visualization
   - Update management

5. **Testing Improvements**:
   - Visual regression testing automation
   - Accessibility testing suite
   - Performance testing benchmarks
   - Cross-browser testing

6. **Documentation**:
   - Interactive component playground
   - Video tutorials
   - Migration guides
   - Best practices guide

---

## Conclusion

The Acrobi Design System represents a **comprehensive, production-ready solution** for building modern web applications. Its three-tier architecture (Primitives → Structures → Modules), extensive AAE hook system, and CLI-first distribution model make it uniquely positioned for:

1. **Rapid Development**: Pre-built components and workflows
2. **Maximum Flexibility**: Source code distribution enables full customization
3. **Modern Capabilities**: 50+ hooks for cutting-edge web APIs
4. **Consistent Design**: Comprehensive theme system
5. **Developer Experience**: Excellent tooling, testing, and documentation

### Key Strengths

- ✅ Comprehensive component library (49+ components)
- ✅ Advanced platform integration (50+ AAE hooks)
- ✅ Excellent TypeScript support
- ✅ Accessibility-first approach
- ✅ Modern build tooling (Vite, Vitest, Storybook)
- ✅ Strong testing infrastructure
- ✅ Automated CI/CD pipeline
- ✅ Extensive documentation
- ✅ CLI-first distribution
- ✅ Monorepo architecture

### Packaging Value

The design system offers **significant packaging opportunities** for the Acrobi ecosystem:

- **13 potential packages** identified for extraction
- High reusability across projects
- Clear dependency boundaries
- Independent versioning potential
- Reduced bundle sizes through selective installation

This design system is well-architected for both monolithic usage and modular extraction, making it ideal for supporting the Acrobi framework and package manager application.

---

**Document Version**: 1.0
**Generated**: 2025-11-18
**Repository**: https://github.com/acrobi/acrobi-design-system
**Contact**: Acrobi Design System Team
