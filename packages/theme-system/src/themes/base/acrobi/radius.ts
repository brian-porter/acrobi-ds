/**
 * Acrobi Design System - Border Radius Tokens
 * 
 * Border radius scale based on the Acrobi design language.
 * Provides consistent rounded corners throughout the design system.
 */

import type { BorderRadius } from '../../../theme';

export const borderRadius: BorderRadius = {
  sm: '0.25rem',   // 4px - br2
  md: '0.5rem',    // 8px - br4
  lg: '1rem',      // 16px - br5
  full: '9999px',  // Fully rounded
};

// Extended border radius system for advanced use cases
export const extendedBorderRadius = {
  // Core Acrobi border radius tokens (matching CSS custom properties)
  none: '0rem',       // br0
  xs: '0.125rem',     // 2px - br1
  sm: '0.25rem',      // 4px - br2
  md: '0.375rem',     // 6px - br3
  lg: '0.5rem',       // 8px - br4
  xl: '1rem',         // 16px - br5
  '2xl': '1.5rem',    // 24px - br6
  '3xl': '2rem',      // 32px - br7
  full: '9999px',     // round - fully rounded
  
  // Semantic radius tokens
  button: '0.375rem',    // 6px - standard button radius
  input: '0.375rem',     // 6px - input field radius
  card: '0.5rem',        // 8px - card radius
  modal: '0.75rem',      // 12px - modal radius
  image: '0.5rem',       // 8px - image radius
  avatar: '9999px',      // fully round avatars
  badge: '9999px',       // fully round badges
  
  // Component-specific radius
  component: {
    // Form elements
    input: '0.375rem',
    textarea: '0.375rem',
    select: '0.375rem',
    checkbox: '0.25rem',
    radio: '9999px',
    switch: '9999px',
    
    // Interactive elements
    button: '0.375rem',
    link: '0.25rem',
    tab: '0.375rem',
    
    // Layout elements
    card: '0.5rem',
    panel: '0.75rem',
    modal: '0.75rem',
    popover: '0.5rem',
    tooltip: '0.375rem',
    
    // Media elements
    image: '0.5rem',
    video: '0.5rem',
    avatar: '9999px',
    
    // Feedback elements
    alert: '0.5rem',
    toast: '0.5rem',
    badge: '9999px',
    chip: '9999px',
    
    // Navigation elements
    breadcrumb: '0.25rem',
    pagination: '0.375rem',
    menu: '0.5rem',
  },
  
  // Contextual radius (for different UI contexts)
  context: {
    // Mobile-optimized (slightly larger for touch)
    mobile: {
      sm: '0.375rem',  // 6px
      md: '0.5rem',    // 8px
      lg: '0.75rem',   // 12px
      xl: '1rem',      // 16px
    },
    
    // Desktop-optimized (precise)
    desktop: {
      sm: '0.25rem',   // 4px
      md: '0.375rem',  // 6px
      lg: '0.5rem',    // 8px
      xl: '0.75rem',   // 12px
    },
    
    // Dense interface (smaller radius)
    dense: {
      sm: '0.125rem',  // 2px
      md: '0.25rem',   // 4px
      lg: '0.375rem',  // 6px
      xl: '0.5rem',    // 8px
    },
    
    // Spacious interface (larger radius)
    spacious: {
      sm: '0.5rem',    // 8px
      md: '0.75rem',   // 12px
      lg: '1rem',      // 16px
      xl: '1.5rem',    // 24px
    },
  },
  
  // Special effects
  effects: {
    // Subtle rounded corners
    subtle: '0.125rem',   // 2px
    
    // Prominent rounded corners
    prominent: '1rem',    // 16px
    
    // Dramatic rounded corners
    dramatic: '2rem',     // 32px
    
    // Organic/blob shapes
    organic: '40% 60% 60% 40% / 60% 30% 70% 40%',
  },
};