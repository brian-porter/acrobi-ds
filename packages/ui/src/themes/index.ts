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
} from '../theme';
export { themeToCSSProperties } from '../theme';

// Available themes registry
export const themes = {
  acrobi,
} as const;

export type ThemeName = keyof typeof themes;

// Default theme
export const defaultTheme = acrobi;
