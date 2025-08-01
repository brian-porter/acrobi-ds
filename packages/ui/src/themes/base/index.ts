// Acrobi Base Theme - Complete Export
// Comprehensive base theme with all token categories

import type { Theme } from '../../theme';
import { colors, extendedColors } from './colors';
import { spacing, extendedSpacing } from './spacing';
import { fontFamily, extendedTypography } from './typography';
import { borderRadius, extendedBorderRadius } from './radius';

// Complete Acrobi base theme
export const acrobiBaseTheme: Theme = {
  name: 'acrobi-base',
  tokens: {
    colors,
    spacing,
    fontFamily,
    borderRadius,
  },
  metadata: {
    version: '1.0.0',
    author: 'Acrobi Design System',
    description: 'Base theme for the Acrobi Design System',
    created: new Date().toISOString(),
    features: {
      darkMode: true,
      highContrast: true,
      reducedMotion: true,
      dynamicAssets: true,
    },
    platforms: ['web', 'ios', 'android'],
    categories: ['colors', 'spacing', 'typography', 'borderRadius'],
  },
};

// Extended tokens for advanced usage
export const extendedTokens = {
  colors: extendedColors,
  spacing: extendedSpacing,
  typography: extendedTypography,
  borderRadius: extendedBorderRadius,
};

// Theme utilities
export const themeUtils = {
  // Get a token value by path
  getToken: (path: string, theme: Theme = acrobiBaseTheme): string | undefined => {
    const parts = path.split('.');
    let current: any = theme.tokens;
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }
    
    return typeof current === 'string' ? current : undefined;
  },

  // Check if theme supports a feature
  supportsFeature: (feature: string, theme: Theme = acrobiBaseTheme): boolean => {
    return theme.metadata?.features?.[feature] === true;
  },

  // Get theme category tokens
  getCategoryTokens: (category: string, theme: Theme = acrobiBaseTheme): any => {
    return theme.tokens[category as keyof typeof theme.tokens];
  },
};

// Export individual token categories
export { colors, extendedColors } from './colors';
export { spacing, extendedSpacing } from './spacing';
export { fontFamily, extendedTypography } from './typography';
export { borderRadius, extendedBorderRadius } from './radius';

// Default export
export default acrobiBaseTheme;