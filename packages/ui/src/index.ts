// Acrobi Design System - Main Export
// Complete component library with advanced theming

// Core Theme System
export * from './theme';
export * from './providers/ThemeProvider';

// Theme Base Tokens
export * from './themes/base';

// Dynamic Assets
export * from './themes/base/audio';
export * from './themes/base/haptics';
export * from './themes/base/motion';

// Components
export * from './components';

// Hooks
export * from './hooks';

// Styles (for CSS imports)
export { globalStylesPath, themeStylesPath } from './styles';

// Theme Demo Components  
export * from './components/theme-demo/LiveThemeSwitcher';

// Re-export everything for convenience
export { default as ThemeProvider } from './providers/ThemeProvider';

// Legacy exports for backwards compatibility File

// Export theme system
export * from './themes';
export * from './theme';

// Export components
export * from './components';

// Export hooks
export * from './hooks';

// Export types
export * from './types';

// Export modules
export * from './modules';

// Export structures
export * from './structures';

// Export styles for consumers
export * from './styles';

// Package info
export const version = '1.0.0';
