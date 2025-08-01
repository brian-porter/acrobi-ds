// Acrobi Base Theme - Border Radius
// Complete Acrobi border radius system

import type { BorderRadius } from '../../theme';

export const borderRadius: BorderRadius = {
  sm: '0.125rem', // 2px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  full: '9999px', // Fully rounded
};

// Extended Acrobi border radius scale for complete design coverage
export const extendedBorderRadius = {
  // Acrobi Border Radius System - Complete scale
  br0: '0rem', // No radius
  br1: '2px', // Subtle
  br2: '4px', // Small
  br3: '6px', // Medium-small
  br4: '8px', // Medium
  br5: '16px', // Large
  br6: '24px', // Extra large
  br7: '32px', // Extra extra large
  round: '100vw', // Fully rounded

  // Semantic radius tokens for components
  button: '6px', // br3
  input: '4px', // br2
  card: '8px', // br4
  modal: '16px', // br5
  tooltip: '4px', // br2
  badge: '100vw', // round
  avatar: '100vw', // round
  
  // Context-specific radius values
  subtle: '2px', // For borders and dividers
  interactive: '6px', // For buttons and controls
  container: '8px', // For cards and panels
  overlay: '16px', // For modals and popovers
};

export default borderRadius;