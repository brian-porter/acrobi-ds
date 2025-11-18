/**
 * Acrobi Dark Theme - Example of Theme Inheritance
 * 
 * This theme extends the base Acrobi theme with darker defaults
 * and customized colors while inheriting spacing, typography, and radius.
 */

import type { Theme, Colors } from '../../../theme';

// Custom colors for the dark variant
const colors: Colors = {
  // Override specific colors while inheriting the rest
  background: {
    light: '29 28 26', // Start with dark background in light mode
    dark: '17 17 17',  // Even darker for dark mode
  },
  
  foreground: {
    light: '254 254 254', // Light text in light mode
    dark: '254 254 254',  // Keep light text
  },
  
  card: {
    light: '48 47 44',    // Dark cards in light mode
    dark: '29 28 26',     // Slightly lighter cards in dark mode
  },
  
  cardForeground: {
    light: '254 254 254', // Light text on dark cards
    dark: '254 254 254',  // Keep light text
  },
  
  // Keep Acrobi brand colors
  primary: {
    light: '25 117 240',  // Acrobi blue
    dark: '94 158 245',   // Lighter blue for dark mode
  },
  
  primaryForeground: {
    light: '254 254 254',
    dark: '29 28 26',
  },
  
  // Enhanced secondary colors
  secondary: {
    light: '109 109 109', // Darker secondary
    dark: '196 196 196',  // Lighter secondary for dark
  },
  
  secondaryForeground: {
    light: '254 254 254',
    dark: '29 28 26',
  },
  
  accent: {
    light: '196 196 196',
    dark: '109 109 109',
  },
  
  accentForeground: {
    light: '29 28 26',
    dark: '254 254 254',
  },
  
  // Keep destructive consistent
  destructive: {
    light: '237 28 36',
    dark: '255 67 67',
  },
  
  destructiveForeground: {
    light: '254 254 254',
    dark: '29 28 26',
  },
  
  muted: {
    light: '109 109 109',
    dark: '48 47 44',
  },
  
  mutedForeground: {
    light: '196 196 196',
    dark: '154 154 154',
  },
  
  border: {
    light: '109 109 109',
    dark: '48 47 44',
  },
  
  input: {
    light: '109 109 109',
    dark: '48 47 44',
  },
  
  ring: {
    light: '25 117 240',
    dark: '94 158 245',
  },
};

export const acrobi_dark: Theme = {
  name: 'acrobi-dark',
  extends: 'acrobi', // This theme extends the base Acrobi theme
  tokens: {
    colors,
    // Inherit spacing, fontFamily, and borderRadius from parent theme
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem', 
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    fontFamily: {
      sans: '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      serif: 'Georgia, "Times New Roman", Times, serif',
      mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      full: '9999px',
    },
  },
  metadata: {
    description: 'Dark variant of the Acrobi theme with enhanced contrast and darker defaults',
    version: '1.0.0',
    author: 'Acrobi Design System',
    created: '2025-08-01',
    categories: ['dark', 'corporate', 'high-contrast'],
    supports: {
      darkMode: true,
      highContrast: true,
      rtl: true,
      colorBlindAccessible: true,
    },
    features: [
      'Extends base Acrobi theme',
      'Dark-first color palette',
      'Enhanced contrast ratios',
      'Maintains brand consistency',
    ],
  },
};