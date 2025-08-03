// Export all theme definitions and utilities
import { acrobi } from './acrobi';
export { acrobi };
export type {
  Theme,
  ColorValue,
  Colors,
  Spacing,
  FontFamily,
  BorderRadius,
  ThemeMetadata,
} from '../theme';
export { 
  themeToCSSProperties, 
  themeToCSSString, 
  mergeThemes, 
  validateTheme 
} from '../theme';

// Export dynamic assets
export * from './base';
export type { DynamicAssets } from './base';

// Available themes registry
export const themes = {
  acrobi,
} as const;

export type ThemeName = keyof typeof themes;

// Default theme
export const defaultTheme = acrobi;
