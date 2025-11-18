/**
 * Acrobi Design System - Typography Tokens
 * 
 * Font families and typography scales based on the Acrobi design language.
 * SF Pro Display is the primary font, with comprehensive fallbacks.
 */

import type { FontFamily } from '../../../theme';

export const fontFamily: FontFamily = {
  sans: '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, "Courier New", monospace',
};

// Extended typography system for advanced use cases
export const extendedTypography = {
  // Font families with detailed fallbacks
  fontFamily: {
    // Primary sans-serif (SF Pro Display)
    sans: '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    
    // Alternative sans-serif options
    sansAlt: '"Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    
    // Serif fonts
    serif: 'Georgia, "Times New Roman", Times, serif',
    
    // Monospace fonts
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, "Courier New", monospace',
    
    // Icon fonts
    icons: '"BQ-Icons", sans-serif',
  },
  
  // Font sizes (matching Acrobi scale)
  fontSize: {
    // Heading sizes
    h1: '3rem',      // 48px
    h2: '2.5rem',    // 40px
    h3: '2rem',      // 32px
    h4: '1.5rem',    // 24px
    h5: '1.25rem',   // 20px
    
    // Regular text sizes
    r1: '1.125rem',  // 18px - R1
    r1b: '1.125rem', // 18px - R1B Bold
    r2: '1rem',      // 16px - R2
    r2b: '1rem',     // 16px - R2B Bold
    r3: '0.875rem',  // 14px - R3
    r3b: '0.875rem', // 14px - R3B Bold
    r4: '0.75rem',   // 12px - R4
    r4b: '0.75rem',  // 12px - R4B Bold
    
    // Additional sizes
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },
  
  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',    // fw4 - Regular
    medium: '500',
    semibold: '600',
    bold: '700',      // fw7 - Bold
    extrabold: '800',
    black: '900',
  },
  
  // Line heights (matching Acrobi scale)
  lineHeight: {
    none: '1',        // line-height--1
    tight: '1.1',     // line-height--1-1
    snug: '1.25',
    normal: '1.3',    // line-height--1-3
    relaxed: '1.5',   // line-height--1-5
    loose: '1.625',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Text decoration
  textDecoration: {
    none: 'none',
    underline: 'underline',
    overline: 'overline',
    'line-through': 'line-through',
  },
  
  // Text transform
  textTransform: {
    none: 'none',
    capitalize: 'capitalize',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
  },
  
  // Text alignment
  textAlign: {
    left: 'left',
    center: 'center',
    right: 'right',
    justify: 'justify',
    start: 'start',
    end: 'end',
  },
  
  // Typography scales for different use cases
  scales: {
    // Display scale (for large headings)
    display: {
      sm: { fontSize: '2.25rem', lineHeight: '2.5rem' },    // 36px/40px
      md: { fontSize: '2.875rem', lineHeight: '3.25rem' },  // 46px/52px
      lg: { fontSize: '3.75rem', lineHeight: '4.25rem' },   // 60px/68px
      xl: { fontSize: '4.5rem', lineHeight: '5rem' },       // 72px/80px
      '2xl': { fontSize: '5.625rem', lineHeight: '6.25rem' }, // 90px/100px
    },
    
    // Heading scale
    heading: {
      xs: { fontSize: '0.75rem', lineHeight: '1rem' },      // 12px/16px
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },  // 14px/20px
      md: { fontSize: '1rem', lineHeight: '1.5rem' },       // 16px/24px
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },  // 18px/28px
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },   // 20px/28px
      '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },    // 24px/32px
      '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' }, // 30px/36px
      '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' }, // 36px/40px
    },
    
    // Body text scale
    body: {
      xs: { fontSize: '0.75rem', lineHeight: '1rem' },      // 12px/16px
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },  // 14px/20px
      md: { fontSize: '1rem', lineHeight: '1.5rem' },       // 16px/24px
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },  // 18px/28px
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },   // 20px/28px
    },
  },
};