# Advanced Theming System

The Acrobi Design System provides a comprehensive theming platform that supports traditional visual design tokens and advanced dynamic assets including audio, haptic feedback, and motion design tokens.

## Overview

The advanced theming system includes:

- **Multi-modal Design Tokens**: Visual, audio, haptic, and motion tokens
- **Theme Inheritance**: Create theme variants that extend base themes
- **Scoped Theming**: Apply different themes to different parts of your application
- **Developer Tools**: CLI for theme management and build scripts
- **Cross-platform Support**: Web, iOS, and Android compatibility

## Quick Start

### Installation

```bash
npm install @acrobi/ui
```

### Basic Usage

```tsx
import { ThemeProvider } from '@acrobi/ui';
import '@acrobi/ui/styles';

function App() {
  return (
    <ThemeProvider theme="acrobi">
      <YourApp />
    </ThemeProvider>
  );
}
```

## Theme Structure

### Core Theme Interface

```typescript
interface Theme {
  name: string;
  extends?: string; // For inheritance
  tokens: {
    colors: Colors;
    spacing: Spacing;
    fontFamily: FontFamily;
    borderRadius: BorderRadius;
  };
  dynamicAssets?: {
    audio: AudioTokens;
    haptics: HapticTokens;
    motion: MotionTokens;
  };
  metadata?: {
    version: string;
    author: string;
    description: string;
    created: string;
    features: {
      darkMode: boolean;
      highContrast: boolean;
      reducedMotion: boolean;
      dynamicAssets: boolean;
    };
  };
}
```

### Color Tokens

Colors support both light and dark modes:

```typescript
interface Colors {
  background: { light: string; dark: string };
  foreground: { light: string; dark: string };
  primary: { light: string; dark: string };
  // ... more colors
}
```

### Dynamic Assets

#### Audio Tokens

```typescript
interface AudioTokens {
  interactions: {
    click: { frequency: number; duration: number; volume: number };
    hover: { frequency: number; duration: number; volume: number };
    focus: { frequency: number; duration: number; volume: number };
  };
  feedback: {
    success: AudioPattern;
    error: AudioPattern;
    warning: AudioPattern;
  };
  // ... more audio tokens
}
```

#### Haptic Tokens

```typescript
interface HapticTokens {
  impacts: {
    light: { intensity: number; duration: number };
    medium: { intensity: number; duration: number };
    heavy: { intensity: number; duration: number };
  };
  notifications: {
    success: HapticPattern;
    warning: HapticPattern;
    error: HapticPattern;
  };
  // ... more haptic tokens
}
```

#### Motion Tokens

```typescript
interface MotionTokens {
  durations: {
    fast: string;
    normal: string;
    slow: string;
  };
  easings: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
  // ... more motion tokens
}
```

## Theme Management

### CLI Commands

#### List Available Themes

```bash
acrobi theme list
```

#### Create New Theme

```bash
# Create theme extending acrobi-base
acrobi theme add my-corporate --extends acrobi-base

# Create with custom tokens
acrobi theme add dark-blue --extends acrobi-dark --tokens colors.primary=#1e40af
```

#### Remove Theme

```bash
acrobi theme remove my-corporate
```

### Build System

#### Build All Themes

```bash
npm run build:themes
```

#### Watch Mode (Development)

```bash
npm run build:themes:watch
```

#### Create Theme Interactively

```bash
npm run create:theme
```

## Theme Inheritance

Create efficient theme variants by extending existing themes:

### Base Theme Structure

```typescript
// themes/base/colors.ts
export const colors: Colors = {
  background: { light: '255 255 255', dark: '17 17 17' },
  foreground: { light: '17 17 17', dark: '255 255 255' },
  primary: { light: '59 130 246', dark: '59 130 246' },
  // ... more colors
};
```

### Inherited Theme

```typescript
// themes/corporate/index.ts
import { acrobiBaseTheme } from '../base';

export const corporateTheme: Theme = {
  name: 'corporate',
  extends: 'acrobi-base',
  tokens: {
    ...acrobiBaseTheme.tokens,
    colors: {
      ...acrobiBaseTheme.tokens.colors,
      primary: { light: '16 185 129', dark: '16 185 129' }, // Override primary
      secondary: { light: '245 158 11', dark: '245 158 11' }, // Override secondary
    },
  },
};
```

## Scoped Theming

Apply different themes to different parts of your application:

### Basic Scoped Theming

```tsx
import { ThemeProvider } from '@acrobi/ui';

function App() {
  return (
    <div>
      {/* Global theme */}
      <ThemeProvider theme="acrobi-light">
        <Header />
        
        {/* Scoped dark theme for sidebar */}
        <ThemeProvider theme="acrobi-dark" enableScoping>
          <Sidebar />
        </ThemeProvider>
        
        <main>
          <Content />
          
          {/* Scoped high contrast theme for accessibility */}
          <ThemeProvider theme="acrobi-high-contrast" enableScoping>
            <AccessibilityPanel />
          </ThemeProvider>
        </main>
      </ThemeProvider>
    </div>
  );
}
```

### Advanced Scoped Usage

```tsx
function Dashboard() {
  return (
    <div className="dashboard">
      {/* Light theme for main content */}
      <ThemeProvider theme="acrobi-light" enableScoping scopeId="main-content">
        <MainPanel />
      </ThemeProvider>
      
      {/* Dark theme for code editor */}
      <ThemeProvider theme="acrobi-dark" enableScoping scopeId="code-editor">
        <CodeEditor />
      </ThemeProvider>
      
      {/* High contrast for accessibility toolbar */}
      <ThemeProvider theme="acrobi-high-contrast" enableScoping scopeId="a11y-tools">
        <AccessibilityToolbar />
      </ThemeProvider>
    </div>
  );
}
```

## Using Themes in Components

### Theme Hook

```tsx
import { useTheme, useThemeStyles } from '@acrobi/ui';

function CustomButton({ children }: { children: React.ReactNode }) {
  const { theme, isDark, toggleDarkMode } = useTheme();
  const { getTokenValue, getCSSVariable } = useThemeStyles();
  
  const backgroundColor = getTokenValue('colors.primary.light');
  const textColor = getTokenValue('colors.primaryForeground.light');
  
  return (
    <button
      style={{
        backgroundColor: getCSSVariable('color-primary'),
        color: getCSSVariable('color-primary-foreground'),
        borderRadius: getCSSVariable('radius-md'),
        padding: `${getCSSVariable('spacing-sm')} ${getCSSVariable('spacing-md')}`,
      }}
      onClick={toggleDarkMode}
    >
      {children} {isDark ? '🌙' : '☀️'}
    </button>
  );
}
```

### CSS Custom Properties

```css
.my-component {
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-foreground));
  border: 1px solid rgb(var(--color-border));
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  font-family: var(--font-sans);
}

.my-component:hover {
  background-color: rgb(var(--color-accent));
}

/* Dark mode automatically handled */
.dark .my-component {
  /* CSS custom properties automatically update */
}
```

## Dynamic Assets Integration

### Audio Feedback

```tsx
import { useAudioTokens } from '@acrobi/ui';

function InteractiveButton({ children, onClick }) {
  const { playAudio } = useAudioTokens();
  
  const handleClick = () => {
    playAudio('interactions.click');
    onClick?.();
  };
  
  const handleHover = () => {
    playAudio('interactions.hover');
  };
  
  return (
    <button 
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      {children}
    </button>
  );
}
```

### Haptic Feedback

```tsx
import { useHapticTokens } from '@acrobi/ui';

function HapticButton({ children, onClick }) {
  const { triggerHaptic } = useHapticTokens();
  
  const handleClick = () => {
    triggerHaptic('impacts.medium');
    onClick?.();
  };
  
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}
```

### Motion Integration

```tsx
import { useMotionTokens } from '@acrobi/ui';

function AnimatedCard({ children }) {
  const { getMotionValue, respectsReducedMotion } = useMotionTokens();
  
  const duration = respectsReducedMotion ? '0ms' : getMotionValue('durations.normal');
  const easing = getMotionValue('easings.easeInOut');
  
  return (
    <div 
      style={{
        transition: respectsReducedMotion ? 'none' : `all ${duration} ${easing}`,
        transform: 'translateY(0)',
      }}
      className="hover:translate-y-[-4px]"
    >
      {children}
    </div>
  );
}
```

## Accessibility Features

### High Contrast Mode

```tsx
<ThemeProvider theme="acrobi-high-contrast">
  <AccessibleContent />
</ThemeProvider>
```

### Reduced Motion Support

```tsx
import { useTheme } from '@acrobi/ui';

function AnimatedComponent() {
  const { theme } = useTheme();
  const prefersReducedMotion = theme?.metadata?.features?.reducedMotion;
  
  return (
    <div 
      className={`transition-all ${prefersReducedMotion ? 'duration-0' : 'duration-300'}`}
    >
      Content with motion preference respect
    </div>
  );
}
```

## Storybook Integration

The theming system includes comprehensive Storybook integration:

### Theme Toolbar

- **Multiple Themes**: Switch between Light, Dark, High Contrast, and Sepia
- **Color Mode Override**: Force light or dark independent of theme
- **Motion Preferences**: Control animation behavior

### Asset Testing

Interactive testing for all dynamic assets:

```tsx
// Storybook stories automatically include:
export const AudioTesting = {
  parameters: {
    docs: {
      description: {
        story: 'Test audio tokens with interactive controls',
      },
    },
  },
};

export const HapticTesting = {
  parameters: {
    docs: {
      description: {
        story: 'Test haptic feedback patterns',
      },
    },
  },
};
```

## Cross-Platform Considerations

### Web Platform

```typescript
// Web-specific audio implementation
const webAudio = {
  play: (token: AudioToken) => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(token.frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + token.duration / 1000);
  },
};
```

### iOS Platform

```typescript
// iOS-specific haptic implementation
const iosHaptics = {
  trigger: (token: HapticToken) => {
    if (typeof window !== 'undefined' && 'navigator' in window) {
      navigator.vibrate?.(token.pattern);
    }
  },
};
```

### Android Platform

```typescript
// Android-specific implementation
const androidHaptics = {
  trigger: (token: HapticToken) => {
    // Android Vibration API implementation
    if ('vibrate' in navigator) {
      navigator.vibrate(token.duration);
    }
  },
};
```

## Performance Optimization

### CSS Custom Properties

The build system generates efficient CSS:

```css
[data-theme='acrobi'] {
  --color-background: 255 255 255;
  --color-foreground: 17 17 17;
  /* ... more properties */
}

[data-theme='acrobi'].dark {
  --color-background: 17 17 17;
  --color-foreground: 255 255 255;
  /* Only dark mode overrides */
}
```

### Theme Inheritance Optimization

Child themes only include overrides:

```css
/* Base theme: 150 properties */
[data-theme='acrobi-base'] { /* ... */ }

/* Child theme: Only 5 overrides */
[data-theme='corporate'] {
  --color-primary: 16 185 129;
  --color-secondary: 245 158 11;
  /* Inherits 145 other properties */
}
```

## Troubleshooting

### Common Issues

#### Theme Not Loading
```bash
# Check if theme exists
acrobi theme list

# Rebuild themes
npm run build:themes
```

#### Scoped Theming Not Working
```tsx
// Ensure enableScoping is true
<ThemeProvider theme="my-theme" enableScoping>
  <ScopedContent />
</ThemeProvider>
```

#### Dynamic Assets Not Playing
```tsx
// Check browser support and user interaction
const { canPlayAudio, requestAudioPermission } = useAudioTokens();

if (!canPlayAudio) {
  await requestAudioPermission();
}
```

### Performance Issues

#### Large Theme Files
```bash
# Use minification for production
npm run build:themes -- --minify
```

#### Too Many Theme Switches
```tsx
// Debounce theme changes
const debouncedSetTheme = useMemo(
  () => debounce(setTheme, 100),
  [setTheme]
);
```

## Migration Guide

### From Basic Theming

```tsx
// Before: Basic theme
<div data-theme="dark">
  <Content />
</div>

// After: Advanced theme provider
<ThemeProvider theme="acrobi-dark">
  <Content />
</ThemeProvider>
```

### Adding Dynamic Assets

```tsx
// Before: Visual only
const theme = {
  colors: { /* ... */ },
  spacing: { /* ... */ },
};

// After: Multi-modal
const theme = {
  colors: { /* ... */ },
  spacing: { /* ... */ },
  dynamicAssets: {
    audio: { /* ... */ },
    haptics: { /* ... */ },
    motion: { /* ... */ },
  },
};
```

## Advanced Usage

### Custom Theme Builder

```typescript
import { createTheme } from '@acrobi/ui';

const customTheme = createTheme({
  name: 'my-brand',
  extends: 'acrobi-base',
  tokens: {
    colors: {
      primary: { light: '#FF6B6B', dark: '#FF8E8E' },
      secondary: { light: '#4ECDC4', dark: '#6EDDD6' },
    },
  },
  dynamicAssets: {
    audio: {
      interactions: {
        click: { frequency: 800, duration: 100, volume: 0.3 },
      },
    },
  },
});
```

### Theme Validation

```typescript
import { validateTheme } from '@acrobi/ui';

const isValid = validateTheme(myTheme);
if (!isValid.success) {
  console.error('Theme validation failed:', isValid.errors);
}
```

---

## API Reference

### Components

- `ThemeProvider` - Root theme provider component
- `ScopedThemeProvider` - Scoped theme provider for section-specific theming

### Hooks

- `useTheme()` - Access current theme and theme controls
- `useThemeStyles()` - Theme-aware styling utilities
- `useAudioTokens()` - Audio feedback integration
- `useHapticTokens()` - Haptic feedback integration
- `useMotionTokens()` - Motion and animation tokens

### Utilities

- `createTheme()` - Theme builder utility
- `validateTheme()` - Theme validation
- `mergeThemes()` - Theme inheritance utility
- `themeToCSSProperties()` - CSS generation utility

### CLI Commands

- `acrobi theme list` - List available themes
- `acrobi theme add <name> --extends <base>` - Create new theme
- `acrobi theme remove <name>` - Remove theme
- `acrobi theme validate <name>` - Validate theme structure

---

*For more examples and advanced usage patterns, see the [Storybook documentation](../storybook) and [component examples](../components).*