import { Theme } from '../theme';

// Default Acrobi theme definition
export const acrobi: Theme = {
  name: 'acrobi',
  tokens: {
    colors: {
      background: {
        light: '0 0% 100%',
        dark: '222.2 47.4% 11.2%',
      },
      foreground: {
        light: '222.2 47.4% 11.2%',
        dark: '210 40% 98%',
      },
      card: {
        light: '0 0% 100%',
        dark: '222.2 47.4% 11.2%',
      },
      cardForeground: {
        light: '222.2 47.4% 11.2%',
        dark: '210 40% 98%',
      },
      primary: {
        light: '222.2 47.4% 11.2%',
        dark: '210 40% 98%',
      },
      primaryForeground: {
        light: '210 40% 98%',
        dark: '222.2 47.4% 11.2%',
      },
      secondary: {
        light: '210 40% 96%',
        dark: '217.2 32.6% 17.5%',
      },
      secondaryForeground: {
        light: '222.2 47.4% 11.2%',
        dark: '210 40% 98%',
      },
      accent: {
        light: '210 40% 96%',
        dark: '217.2 32.6% 17.5%',
      },
      accentForeground: {
        light: '222.2 47.4% 11.2%',
        dark: '210 40% 98%',
      },
      destructive: {
        light: '0 100% 50%',
        dark: '0 62.8% 30.6%',
      },
      destructiveForeground: {
        light: '210 40% 98%',
        dark: '0 85.7% 97.3%',
      },
      muted: {
        light: '210 40% 96%',
        dark: '217.2 32.6% 17.5%',
      },
      mutedForeground: {
        light: '215.4 16.3% 46.9%',
        dark: '215 20.2% 65.1%',
      },
      border: {
        light: '214.3 31.8% 91.4%',
        dark: '217.2 32.6% 17.5%',
      },
      input: {
        light: '214.3 31.8% 91.4%',
        dark: '217.2 32.6% 17.5%',
      },
      ring: {
        light: '222.2 47.4% 11.2%',
        dark: '212.7 26.8% 83.9%',
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      serif: 'Georgia, "Times New Roman", Times, serif',
      mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },
  },
};
