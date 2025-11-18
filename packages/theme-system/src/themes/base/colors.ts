// Acrobi Base Theme - Colors
// Complete Acrobi color system with all required and extended tokens

import type { Colors } from '../../theme';

export const colors: Colors = {
  // Required semantic colors for Tailwind compatibility
  background: {
    light: '254 254 254', // Almost white (n000)
    dark: '29 28 26', // Dark background (n999)
  },
  foreground: {
    light: '29 28 26', // Dark text (n999)
    dark: '254 254 254', // Light text (n000)
  },
  card: {
    light: '254 254 254', // Almost white (n000)
    dark: '29 28 26', // Dark card (n999)
  },
  cardForeground: {
    light: '29 28 26', // Dark text on cards (n999)
    dark: '254 254 254', // Light text on cards (n000)
  },
  primary: {
    light: '25 117 240', // Acrobi primary blue (p500)
    dark: '25 117 240', // Keep primary blue in dark mode
  },
  primaryForeground: {
    light: '254 254 254', // Light text on primary (n000)
    dark: '254 254 254', // Light text on primary (n000)
  },
  secondary: {
    light: '240 240 240', // Light gray (n100)
    dark: '48 47 44', // Dark gray (n900)
  },
  secondaryForeground: {
    light: '29 28 26', // Dark text on secondary (n999)
    dark: '254 254 254', // Light text on secondary (n000)
  },
  accent: {
    light: '229 229 229', // Light accent (n200)
    dark: '109 109 109', // Dark accent (n700)
  },
  accentForeground: {
    light: '29 28 26', // Dark text on accent (n999)
    dark: '254 254 254', // Light text on accent (n000)
  },
  destructive: {
    light: '237 28 36', // Acrobi red (fd500)
    dark: '237 28 36', // Keep red in dark mode
  },
  destructiveForeground: {
    light: '254 254 254', // Light text on destructive (n000)
    dark: '254 254 254', // Light text on destructive (n000)
  },
  muted: {
    light: '240 240 240', // Light muted (n100)
    dark: '48 47 44', // Dark muted (n900)
  },
  mutedForeground: {
    light: '154 154 154', // Muted text (n500)
    dark: '196 196 196', // Muted text dark (n300)
  },
  border: {
    light: '229 229 229', // Light border (n200)
    dark: '109 109 109', // Dark border (n700)
  },
  input: {
    light: '229 229 229', // Light input border (n200)
    dark: '109 109 109', // Dark input border (n700)
  },
  ring: {
    light: '25 117 240', // Focus ring (p500)
    dark: '25 117 240', // Focus ring (p500)
  },
};

// Extended Acrobi color palette for additional design needs
export const extendedColors = {
  // Acrobi Neutrals - Complete scale
  n000: 'hsla(300, 100%, 99.8%, 1)', // Almost white
  n100: '#f0f0f0',
  n200: '#e5e5e5',
  n300: '#c4c4c4',
  n500: '#9a9a9a',
  n700: '#6d6d6d',
  n900: '#302f2c',
  n999: '#1d1c1a', // Dark, not white

  // Acrobi Primary - Complete scale
  p100: '#e8f1fe',
  p200: '#a3c8f9',
  p300: '#5e9ef5',
  p500: '#1975f0',
  p700: '#1252a8',
  p900: '#072348',

  // Acrobi Secondary
  s500: '#beef10',

  // Acrobi Focus Colors - Full system
  f100: '#bfe5ef',
  f500: '#00abd2',
  f700: '#007893',
  fd100: '#ffeced',
  fd500: '#ed1c24',
  fd700: '#84101d',
  fs100: '#dcffdc',
  fs500: '#00b400',
  fs700: '#127b12',
  fw100: '#fed',
  fw500: '#ff8000',
  fw700: '#8f4f0e',
  fy500: 'hsla(48, 98.02%, 49.83%, 1)',

  // Acrobi Transparency
  t000: 'transparent',

  // Acrobi Fade Colors (with opacity)
  n0001: 'rgba(255, 255, 255, 0.1)',
  n0002: 'rgba(255, 255, 255, 0.2)',
  n0003: 'rgba(255, 255, 255, 0.3)',
  n0004: 'rgba(255, 255, 255, 0.4)',
  n0005: 'rgba(255, 255, 255, 0.5)',
  n0006: 'rgba(255, 255, 255, 0.6)',
  n0007: 'rgba(255, 255, 255, 0.7)',
  n0008: 'rgba(255, 255, 255, 0.8)',
  n0009: 'rgba(255, 255, 255, 0.9)',
  n9991: 'rgba(17, 17, 17, 0.05)',
  n9992: 'rgba(17, 17, 17, 0.2)',
  n9993: 'rgba(17, 17, 17, 0.3)',
  n9994: 'rgba(17, 17, 17, 0.4)',
  n9995: 'rgba(17, 17, 17, 0.5)',
  n9996: 'rgba(17, 17, 17, 0.6)',
  n9997: 'rgba(17, 17, 17, 0.7)',
  n9998: 'rgba(17, 17, 17, 0.8)',
  n9999: 'rgba(17, 17, 17, 0.9)',
};

export default colors;