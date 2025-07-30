// packages/ui/src/theme.ts

// Defines the structure for HSL color values
export interface ColorValue {
  light: string; // e.g., "222.2 47.4% 11.2%"
  dark: string; // e.g., "210 40% 98%"
}

// Defines the full set of required color tokens
export interface Colors {
  background: ColorValue;
  foreground: ColorValue;
  card: ColorValue;
  cardForeground: ColorValue;
  primary: ColorValue;
  primaryForeground: ColorValue;
  secondary: ColorValue;
  secondaryForeground: ColorValue;
  accent: ColorValue;
  accentForeground: ColorValue;
  destructive: ColorValue;
  destructiveForeground: ColorValue;
  muted: ColorValue;
  mutedForeground: ColorValue;
  border: ColorValue;
  input: ColorValue;
  ring: ColorValue;
}

// Defines the structure for spacing tokens
export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// Defines the structure for font family tokens
export interface FontFamily {
  sans: string;
  serif: string;
  mono: string;
}

// Defines the structure for border radius tokens
export interface BorderRadius {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

// Defines the structure for the complete theme object
export interface Theme {
  name: string;
  tokens: {
    colors: Colors;
    spacing: Spacing;
    fontFamily: FontFamily;
    borderRadius: BorderRadius;
  };
}

// Helper function to convert theme to CSS custom properties
export function themeToCSSProperties(theme: Theme): Record<string, string> {
  const properties: Record<string, string> = {};

  // Convert colors
  Object.entries(theme.tokens.colors).forEach(([key, value]) => {
    properties[`--color-${key}`] = value.light;
    properties[`--color-${key}-dark`] = value.dark;
  });

  // Convert spacing
  Object.entries(theme.tokens.spacing).forEach(([key, value]) => {
    properties[`--spacing-${key}`] = value;
  });

  // Convert font families
  Object.entries(theme.tokens.fontFamily).forEach(([key, value]) => {
    properties[`--font-${key}`] = value;
  });

  // Convert border radius
  Object.entries(theme.tokens.borderRadius).forEach(([key, value]) => {
    properties[`--radius-${key}`] = value;
  });

  return properties;
}
