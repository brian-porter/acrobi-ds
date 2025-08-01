/**
 * Acrobi Design System - Base Theme
 * 
 * Complete theme definition combining all token categories.
 * This serves as the foundation for the Acrobi design system
 * and can be extended to create custom themes.
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { fontFamily } from './typography';
import { borderRadius } from './radius';
import type { Theme } from '../../../theme';

export const acrobi: Theme = {
  name: 'acrobi',
  tokens: {
    colors,
    spacing,
    fontFamily,
    borderRadius,
  },
};

// Export individual token categories for advanced usage
export { colors, spacing, fontFamily, borderRadius };

// Export extended token sets for advanced theming
export {
  extendedColors,
} from './colors';

export {
  extendedSpacing,
} from './spacing';

export {
  extendedTypography,
} from './typography';

export {
  extendedBorderRadius,
} from './radius';

// Theme metadata
export const themeMetadata = {
  name: 'Acrobi',
  description: 'The authentic Acrobi Design System theme with SF Pro Display typography and signature blue branding.',
  version: '1.0.0',
  author: 'Acrobi Design System',
  created: '2025-08-01',
  categories: ['corporate', 'clean', 'modern'],
  supports: {
    darkMode: true,
    highContrast: true,
    rtl: true,
    colorBlindAccessible: true,
  },
  features: [
    'SF Pro Display typography',
    'Authentic Acrobi color palette',
    'Comprehensive spacing system',
    'Accessible color ratios',
    'Dark mode support',
    'Mobile-optimized sizing',
  ],
};