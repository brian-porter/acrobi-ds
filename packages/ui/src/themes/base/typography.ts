// Acrobi Base Theme - Typography
// Complete Acrobi typography system with SF Pro Display

import type { FontFamily } from '../../theme';

export const fontFamily: FontFamily = {
  sans: '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
};

// Extended typography system - Complete Acrobi type scale
export const extendedTypography = {
  // Font families
  fontFamilies: {
    primary: '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Inter Tight", sans-serif',
    acrobi: '"SF Pro Display", "SF Pro", Arial, sans-serif',
    icons: 'BQ-Icons, sans-serif',
  },

  // Font sizes - Complete Acrobi scale
  fontSizes: {
    h1: '3rem', // 48px
    h2: '2.5rem', // 40px
    h3: '2rem', // 32px
    h4: '1.5rem', // 24px
    h5: '1.25rem', // 20px
    r1b: '1.125rem', // 18px - R1B Bold
    r1: '1.125rem', // 18px - R1 Regular
    r2b: '1rem', // 16px - R2B Bold
    r2: '1rem', // 16px - R2 Regular
    r3b: '0.875rem', // 14px - R3B Bold
    r3: '0.875rem', // 14px - R3 Regular
    r4b: '0.75rem', // 12px - R4B Bold
    r4: '0.75rem', // 12px - R4 Regular
  },

  // Font weights
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line heights
  lineHeights: {
    tight: '1',
    normal: '1.1',
    relaxed: '1.3',
    loose: '1.5',
  },

  // Icon sizes
  iconSizes: {
    xxs: '0.5rem', // 8px
    xs: '0.75rem', // 12px
    s: '0.875rem', // 14px
    sm: '1rem', // 16px
    m: '1.25rem', // 20px
    ml: '1.5rem', // 24px
    l: '1.75rem', // 28px
    xl: '2rem', // 32px
    xxl: '2.5rem', // 40px
  },

  // Typography presets for common use cases
  presets: {
    heading1: {
      fontSize: '3rem',
      fontWeight: '400',
      lineHeight: '1',
      fontFamily: '"SF Pro Display", sans-serif',
    },
    heading2: {
      fontSize: '2.5rem',
      fontWeight: '400',
      lineHeight: '1',
      fontFamily: '"SF Pro Display", sans-serif',
    },
    heading3: {
      fontSize: '2rem',
      fontWeight: '400',
      lineHeight: '1',
      fontFamily: '"SF Pro Display", sans-serif',
    },
    heading4: {
      fontSize: '1.5rem',
      fontWeight: '400',
      lineHeight: '1.1',
      fontFamily: '"SF Pro Display", sans-serif',
    },
    heading5: {
      fontSize: '1.25rem',
      fontWeight: '400',
      lineHeight: '1.1',
      fontFamily: '"SF Pro Display", sans-serif',
    },
    bodyLarge: {
      fontSize: '1.125rem',
      fontWeight: '400',
      lineHeight: '1.5',
      fontFamily: '"SF Pro Display", sans-serif',
    },
    bodyRegular: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.3',
      fontFamily: '"SF Pro Display", sans-serif',
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.3',
      fontFamily: '"SF Pro Display", sans-serif',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: '400',
      lineHeight: '1.3',
      fontFamily: '"SF Pro Display", sans-serif',
    },
  },
};

export default fontFamily;