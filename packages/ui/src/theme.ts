// packages/ui/src/theme.ts

import type { DynamicAssets } from './themes/base';

// Defines the structure for HSL color values
export interface ColorValue {
  light: string; // e.g., "222.2 47.4% 11.2%"
  dark: string; // e.g., "210 40% 98%"
}

// Defines the full set of required color tokens
export interface Colors {
  background: ColorValue;
  foreground: ColorValue;
  card: ColorValue;
  cardForeground: ColorValue;
  primary: ColorValue;
  primaryForeground: ColorValue;
  secondary: ColorValue;
  secondaryForeground: ColorValue;
  accent: ColorValue;
  accentForeground: ColorValue;
  destructive: ColorValue;
  destructiveForeground: ColorValue;
  muted: ColorValue;
  mutedForeground: ColorValue;
  border: ColorValue;
  input: ColorValue;
  ring: ColorValue;
}

// Defines the structure for spacing tokens
export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// Defines the structure for font family tokens
export interface FontFamily {
  sans: string;
  serif: string;
  mono: string;
}

// Defines the structure for border radius tokens
export interface BorderRadius {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

// Defines the structure for the complete theme object
export interface Theme {
  name: string;
  extends?: string; // Optional parent theme for inheritance
  tokens: {
    colors: Colors;
    spacing: Spacing;
    fontFamily: FontFamily;
    borderRadius: BorderRadius;
  };
  dynamicAssets?: DynamicAssets; // Optional dynamic theme assets
  metadata?: ThemeMetadata; // Optional theme metadata
}

// Optional metadata for themes
export interface ThemeMetadata {
  description?: string;
  version?: string;
  author?: string;
  created?: string;
  categories?: string[];
  supports?: {
    darkMode?: boolean;
    highContrast?: boolean;
    rtl?: boolean;
    colorBlindAccessible?: boolean;
  };
  features?: string[];
}

// Helper function to convert theme to CSS custom properties
export function themeToCSSProperties(theme: Theme): Record<string, string> {
  const properties: Record<string, string> = {};

  // Convert colors
  Object.entries(theme.tokens.colors).forEach(([key, value]) => {
    properties[`--color-${kebabCase(key)}`] = value.light;
    properties[`--color-${kebabCase(key)}-dark`] = value.dark;
  });

  // Convert spacing
  Object.entries(theme.tokens.spacing).forEach(([key, value]) => {
    properties[`--spacing-${key}`] = value;
  });

  // Convert font families
  Object.entries(theme.tokens.fontFamily).forEach(([key, value]) => {
    properties[`--font-${key}`] = value;
  });

  // Convert border radius
  Object.entries(theme.tokens.borderRadius).forEach(([key, value]) => {
    properties[`--radius-${key}`] = value;
  });

  // Convert dynamic assets if present
  if (theme.dynamicAssets) {
    const { dynamicAssetsToCSSProperties } = require('./themes/base');
    Object.assign(properties, dynamicAssetsToCSSProperties(theme.dynamicAssets));
  }

  return properties;
}

// Helper function to convert camelCase to kebab-case
function kebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Generate CSS string from theme
export function themeToCSSString(theme: Theme, options: { minify?: boolean } = {}): string {
  const { minify = false } = options;
  const spacing = minify ? '' : '  ';
  const newline = minify ? '' : '\n';
  
  let css = '';
  
  // Generate CSS custom properties for light mode
  css += `[data-theme='${theme.name}'] {${newline}`;
  
  // Colors
  Object.entries(theme.tokens.colors).forEach(([key, value]) => {
    css += `${spacing}--color-${kebabCase(key)}: ${value.light};${newline}`;
  });
  
  // Other tokens
  Object.entries(theme.tokens.spacing).forEach(([key, value]) => {
    css += `${spacing}--spacing-${key}: ${value};${newline}`;
  });
  
  Object.entries(theme.tokens.fontFamily).forEach(([key, value]) => {
    css += `${spacing}--font-${key}: ${value};${newline}`;
  });
  
  Object.entries(theme.tokens.borderRadius).forEach(([key, value]) => {
    css += `${spacing}--radius-${key}: ${value};${newline}`;
  });
  
  css += `}${newline}${newline}`;
  
  // Generate dark mode overrides
  css += `[data-theme='${theme.name}'].dark {${newline}`;
  
  Object.entries(theme.tokens.colors).forEach(([key, value]) => {
    css += `${spacing}--color-${kebabCase(key)}: ${value.dark};${newline}`;
  });
  
  css += `}${newline}`;
  
  return css;
}

// Deep merge utility for theme inheritance
export function mergeThemes(parentTheme: Theme, childTheme: Partial<Theme>): Theme {
  const merged: Theme = {
    name: childTheme.name || parentTheme.name,
    extends: parentTheme.name,
    tokens: {
      colors: { ...parentTheme.tokens.colors, ...childTheme.tokens?.colors },
      spacing: { ...parentTheme.tokens.spacing, ...childTheme.tokens?.spacing },
      fontFamily: { ...parentTheme.tokens.fontFamily, ...childTheme.tokens?.fontFamily },
      borderRadius: { ...parentTheme.tokens.borderRadius, ...childTheme.tokens?.borderRadius },
    },
    dynamicAssets: parentTheme.dynamicAssets || childTheme.dynamicAssets ? {
      audio: { ...parentTheme.dynamicAssets?.audio, ...childTheme.dynamicAssets?.audio },
      haptics: { ...parentTheme.dynamicAssets?.haptics, ...childTheme.dynamicAssets?.haptics },
      motion: { ...parentTheme.dynamicAssets?.motion, ...childTheme.dynamicAssets?.motion },
    } : undefined,
    metadata: { ...parentTheme.metadata, ...childTheme.metadata },
  };
  
  return merged;
}

// Validate theme against interface
export function validateTheme(theme: any): theme is Theme {
  if (!theme || typeof theme !== 'object') return false;
  if (typeof theme.name !== 'string') return false;
  if (!theme.tokens || typeof theme.tokens !== 'object') return false;
  
  const { tokens } = theme;
  
  // Validate colors
  if (!tokens.colors || typeof tokens.colors !== 'object') return false;
  const requiredColors = [
    'background', 'foreground', 'card', 'cardForeground', 'primary', 'primaryForeground',
    'secondary', 'secondaryForeground', 'accent', 'accentForeground', 'destructive',
    'destructiveForeground', 'muted', 'mutedForeground', 'border', 'input', 'ring'
  ];
  
  for (const colorKey of requiredColors) {
    const color = tokens.colors[colorKey];
    if (!color || typeof color !== 'object' || 
        typeof color.light !== 'string' || typeof color.dark !== 'string') {
      return false;
    }
  }
  
  // Validate spacing
  if (!tokens.spacing || typeof tokens.spacing !== 'object') return false;
  const requiredSpacing = ['xs', 'sm', 'md', 'lg', 'xl'];
  for (const spacingKey of requiredSpacing) {
    if (typeof tokens.spacing[spacingKey] !== 'string') return false;
  }
  
  // Validate fontFamily
  if (!tokens.fontFamily || typeof tokens.fontFamily !== 'object') return false;
  const requiredFonts = ['sans', 'serif', 'mono'];
  for (const fontKey of requiredFonts) {
    if (typeof tokens.fontFamily[fontKey] !== 'string') return false;
  }
  
  // Validate borderRadius
  if (!tokens.borderRadius || typeof tokens.borderRadius !== 'object') return false;
  const requiredRadius = ['sm', 'md', 'lg', 'full'];
  for (const radiusKey of requiredRadius) {
    if (typeof tokens.borderRadius[radiusKey] !== 'string') return false;
  }
  
  return true;
}
