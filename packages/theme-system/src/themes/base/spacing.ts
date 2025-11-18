// Acrobi Base Theme - Spacing
// Complete Acrobi spacing system with semantic tokens

import type { Spacing } from '../../theme';

export const spacing: Spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px  
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
};

// Extended Acrobi spacing scale for complete design coverage
export const extendedSpacing = {
  // Pixel-perfect spacing system
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
  tight: '0.25rem', // 4px
  snug: '0.5rem', // 8px
  normal: '1rem', // 16px
  relaxed: '1.5rem', // 24px
  loose: '2rem', // 32px
  
  // Component-specific spacing
  buttonPadding: '0.5rem 1rem', // 8px 16px
  inputPadding: '0.75rem 1rem', // 12px 16px
  cardPadding: '1.5rem', // 24px
  sectionPadding: '2rem', // 32px
  pagePadding: '2rem 1rem', // 32px 16px (vertical horizontal)
};

export default spacing;