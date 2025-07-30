/**
 * @fileoverview Type definitions for the Acrobi Design System
 * Centralized exports for all TypeScript interfaces and types
 */

// AAE types for Acrobi's Advanced Experiences configuration
export * from './aae';
export type {
  ShortcutItem,
  WebAppManifest,
  ManifestIcon,
  ManifestScreenshot,
  RelatedApplication,
} from './aae';

// Export AAE utilities as named exports
export { CommonShortcuts, AAEValidationUtils, ShortcutHelpers } from './aae';

// Default AAE utils export
export { default as AAEUtils } from './aae';
