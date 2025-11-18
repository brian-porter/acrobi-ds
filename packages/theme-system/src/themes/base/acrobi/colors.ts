/**
 * Acrobi Design System - Color Tokens
 * 
 * Complete color system based on the authentic Acrobi design language.
 * These tokens map directly to the CSS custom properties used throughout
 * the design system and provide both light and dark mode values.
 */

import type { Colors } from '../../../theme';

export const colors: Colors = {
  // Background colors - primary surface colors
  background: {
    light: '254 254 254', // Almost white (n000)
    dark: '29 28 26', // Dark background (n999)
  },
  
  // Foreground colors - primary text colors
  foreground: {
    light: '29 28 26', // Dark text (n999)
    dark: '254 254 254', // Light text (n000)
  },
  
  // Card colors - surface colors for elevated content
  card: {
    light: '254 254 254', // Almost white (n000)
    dark: '29 28 26', // Dark card background (n999)
  },
  
  cardForeground: {
    light: '29 28 26', // Dark text on cards (n999)
    dark: '254 254 254', // Light text on dark cards (n000)
  },
  
  // Primary colors - Acrobi blue brand color
  primary: {
    light: '25 117 240', // Authentic Acrobi blue (p500)
    dark: '25 117 240', // Keep brand blue consistent
  },
  
  primaryForeground: {
    light: '254 254 254', // Light text on primary (n000)
    dark: '254 254 254', // Light text on primary (n000)
  },
  
  // Secondary colors - neutral accent colors
  secondary: {
    light: '240 240 240', // Light gray (n100)
    dark: '48 47 44', // Dark gray (n900)
  },
  
  secondaryForeground: {
    light: '29 28 26', // Dark text on secondary (n999)
    dark: '254 254 254', // Light text on dark secondary (n000)
  },
  
  // Accent colors - subtle highlighting
  accent: {
    light: '229 229 229', // Light accent (n200)
    dark: '109 109 109', // Dark accent (n700)
  },
  
  accentForeground: {
    light: '29 28 26', // Dark text on accent (n999)
    dark: '254 254 254', // Light text on dark accent (n000)
  },
  
  // Destructive colors - Acrobi red for errors/danger
  destructive: {
    light: '237 28 36', // Acrobi red (fd500)
    dark: '237 28 36', // Keep error red consistent
  },
  
  destructiveForeground: {
    light: '254 254 254', // Light text on destructive (n000)
    dark: '254 254 254', // Light text on destructive (n000)
  },
  
  // Muted colors - subtle backgrounds and disabled states
  muted: {
    light: '240 240 240', // Light muted (n100)
    dark: '48 47 44', // Dark muted (n900)
  },
  
  mutedForeground: {
    light: '154 154 154', // Muted text (n500)
    dark: '196 196 196', // Muted text in dark mode (n300)
  },
  
  // Border colors - subtle dividers and outlines
  border: {
    light: '229 229 229', // Light border (n200)
    dark: '109 109 109', // Dark border (n700)
  },
  
  // Input colors - form field borders
  input: {
    light: '229 229 229', // Light input border (n200)
    dark: '109 109 109', // Dark input border (n700)
  },
  
  // Ring colors - focus indicators
  ring: {
    light: '25 117 240', // Acrobi blue focus ring (p500)
    dark: '25 117 240', // Keep focus ring consistent
  },
};

// Extended Acrobi color palette for advanced use cases
export const extendedColors = {
  // Acrobi Primary Scale
  primary: {
    100: '232 241 254', // p100
    200: '163 200 249', // p200
    300: '94 158 245', // p300
    500: '25 117 240', // p500 (main)
    700: '18 82 168', // p700
    900: '7 35 72', // p900
  },
  
  // Acrobi Secondary (Lime)
  secondary: {
    500: '190 239 16', // s500 - Acrobi lime
  },
  
  // Acrobi Focus Colors
  focus: {
    info: {
      100: '191 229 239', // f100
      500: '0 171 210', // f500
      700: '0 120 147', // f700
    },
    danger: {
      100: '255 236 237', // fd100
      500: '237 28 36', // fd500
      700: '132 16 29', // fd700
    },
    success: {
      100: '220 255 220', // fs100
      500: '0 180 0', // fs500
      700: '18 123 18', // fs700
    },
    warning: {
      100: '255 238 221', // fw100
      500: '255 128 0', // fw500
      700: '143 79 14', // fw700
    },
    yellow: {
      500: '254 204 25', // fy500
    },
  },
  
  // Acrobi Neutrals Scale
  neutral: {
    '000': '254 254 254', // Almost white
    '100': '240 240 240',
    '200': '229 229 229',
    '300': '196 196 196',
    '500': '154 154 154',
    '700': '109 109 109',
    '900': '48 47 44',
    '999': '29 28 26', // Dark, not white
  },
  
  // Transparency tokens
  transparent: '0 0 0 / 0',
  
  // Fade colors with opacity
  fade: {
    white: {
      10: '255 255 255 / 0.1',
      20: '255 255 255 / 0.2',
      30: '255 255 255 / 0.3',
      40: '255 255 255 / 0.4',
      50: '255 255 255 / 0.5',
      60: '255 255 255 / 0.6',
      70: '255 255 255 / 0.7',
      80: '255 255 255 / 0.8',
      90: '255 255 255 / 0.9',
    },
    black: {
      5: '17 17 17 / 0.05',
      20: '17 17 17 / 0.2',
      30: '17 17 17 / 0.3',
      40: '17 17 17 / 0.4',
      50: '17 17 17 / 0.5',
      60: '17 17 17 / 0.6',
      70: '17 17 17 / 0.7',
      80: '17 17 17 / 0.8',
      90: '17 17 17 / 0.9',
    },
  },
};