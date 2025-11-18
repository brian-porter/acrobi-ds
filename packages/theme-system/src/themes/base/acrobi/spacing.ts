/**
 * Acrobi Design System - Spacing Tokens
 * 
 * Consistent spacing scale based on the Acrobi size system.
 * These tokens provide a harmonious spacing rhythm throughout the design system.
 */

import type { Spacing } from '../../../theme';

export const spacing: Spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
};

// Extended Acrobi spacing scale for advanced use cases
export const extendedSpacing = {
  // Core spacing tokens (matching CSS custom properties)
  '0px': '0rem',
  '1px': '0.0625rem',
  '2px': '0.125rem',
  '4px': '0.25rem',
  '8px': '0.5rem',
  '12px': '0.75rem',
  '14px': '0.875rem',
  '16px': '1rem',
  '18px': '1.125rem',
  '20px': '1.25rem',
  '24px': '1.5rem',
  '28px': '1.75rem',
  '32px': '2rem',
  '36px': '2.25rem',
  '40px': '2.5rem',
  '48px': '3rem',
  '56px': '3.5rem',
  '64px': '4rem',
  '80px': '5rem',
  
  // Semantic spacing tokens
  none: '0',
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
  '4xl': '3.5rem',  // 56px
  '5xl': '4rem',    // 64px
  '6xl': '5rem',    // 80px
  
  // Component-specific spacing
  component: {
    padding: {
      xs: '0.25rem 0.5rem',      // 4px 8px
      sm: '0.5rem 0.75rem',      // 8px 12px
      md: '0.75rem 1rem',        // 12px 16px
      lg: '1rem 1.5rem',         // 16px 24px
      xl: '1.25rem 2rem',        // 20px 32px
    },
    margin: {
      xs: '0.25rem',             // 4px
      sm: '0.5rem',              // 8px
      md: '1rem',                // 16px
      lg: '1.5rem',              // 24px
      xl: '2rem',                // 32px
    },
    gap: {
      xs: '0.25rem',             // 4px
      sm: '0.5rem',              // 8px
      md: '1rem',                // 16px
      lg: '1.5rem',              // 24px
      xl: '2rem',                // 32px
    },
  },
  
  // Layout spacing
  layout: {
    section: '3rem',             // 48px - between major sections
    container: '1.5rem',         // 24px - container padding
    grid: '1rem',                // 16px - grid gaps
    stack: '0.75rem',            // 12px - vertical stacking
    inline: '0.5rem',            // 8px - inline spacing
  },
  
  // Typography spacing
  typography: {
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
};