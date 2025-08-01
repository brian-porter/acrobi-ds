import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Theme } from '../theme';

interface ThemeContextValue {
  theme: Theme | null;
  themeName: string;
  setTheme: (theme: Theme | string) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  isScoped: boolean;
  scopeId?: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: Theme | string;
  defaultTheme?: string;
  enableScoping?: boolean;
  scopeId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeProvider({
  children,
  theme: initialTheme = 'acrobi',
  defaultTheme = 'acrobi',
  enableScoping = false,
  scopeId,
  className = '',
  style = {},
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [themeName, setThemeName] = useState<string>(
    typeof initialTheme === 'string' ? initialTheme : initialTheme?.name || defaultTheme
  );
  const [isDark, setIsDark] = useState(false);

  // Generate unique scope ID if scoping is enabled
  const actualScopeId = enableScoping ? (scopeId || `theme-scope-${Math.random().toString(36).slice(2, 9)}`) : undefined;

  // Load theme when theme name changes
  useEffect(() => {
    if (typeof initialTheme === 'object') {
      setCurrentTheme(initialTheme);
      setThemeName(initialTheme.name);
    } else {
      // In a real implementation, you'd load the theme from a registry
      // For now, we'll create a mock theme
      const mockTheme: Theme = {
        name: initialTheme,
        tokens: {
          colors: {
            background: { light: '255 255 255', dark: '17 17 17' },
            foreground: { light: '17 17 17', dark: '255 255 255' },
            primary: { light: '59 130 246', dark: '59 130 246' },
            primaryForeground: { light: '255 255 255', dark: '255 255 255' },
            secondary: { light: '240 240 240', dark: '38 38 38' },
            secondaryForeground: { light: '17 17 17', dark: '255 255 255' },
            accent: { light: '240 240 240', dark: '38 38 38' },
            accentForeground: { light: '17 17 17', dark: '255 255 255' },
            destructive: { light: '239 68 68', dark: '239 68 68' },
            destructiveForeground: { light: '255 255 255', dark: '255 255 255' },
            muted: { light: '245 245 245', dark: '38 38 38' },
            mutedForeground: { light: '115 115 115', dark: '163 163 163' },
            border: { light: '229 229 229', dark: '38 38 38' },
            input: { light: '229 229 229', dark: '38 38 38' },
            ring: { light: '59 130 246', dark: '59 130 246' },
            card: { light: '255 255 255', dark: '17 17 17' },
            cardForeground: { light: '17 17 17', dark: '255 255 255' },
          },
          spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
          },
          fontFamily: {
            sans: '"SF Pro Display", system-ui, sans-serif',
            serif: 'Georgia, serif',
            mono: 'Consolas, monospace',
          },
          borderRadius: {
            sm: '0.125rem',
            md: '0.375rem',
            lg: '0.5rem',
            full: '9999px',
          },
        },
        metadata: {
          version: '1.0.0',
          author: 'Acrobi Design System',
          description: `Theme: ${initialTheme}`,
          created: new Date().toISOString(),
        },
      };
      setCurrentTheme(mockTheme);
      setThemeName(initialTheme);
    }
  }, [initialTheme]);

  // Apply theme to DOM
  useEffect(() => {
    if (!currentTheme) return;

    const targetElement = enableScoping && actualScopeId 
      ? document.querySelector(`[data-theme-scope="${actualScopeId}"]`) as HTMLElement
      : document.documentElement;

    if (targetElement) {
      // Set theme data attribute
      targetElement.setAttribute('data-theme', themeName);
      
      // Apply dark class
      if (isDark) {
        targetElement.classList.add('dark');
      } else {
        targetElement.classList.remove('dark');
      }

      // Apply CSS custom properties if scoped
      if (enableScoping && actualScopeId) {
        const cssProperties = themeToCSSProperties(currentTheme, isDark);
        Object.entries(cssProperties).forEach(([property, value]) => {
          targetElement.style.setProperty(property, value);
        });
      }
    }
  }, [currentTheme, themeName, isDark, enableScoping, actualScopeId]);

  const setTheme = (theme: Theme | string) => {
    if (typeof theme === 'string') {
      setThemeName(theme);
    } else {
      setCurrentTheme(theme);
      setThemeName(theme.name);
    }
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const value: ThemeContextValue = {
    theme: currentTheme,
    themeName,
    setTheme,
    isDark,
    toggleDarkMode,
    isScoped: enableScoping,
    scopeId: actualScopeId,
  };

  // Container props for scoped theming
  const containerProps = enableScoping
    ? {
        'data-theme-scope': actualScopeId,
        'data-theme': themeName,
        className: `theme-scoped ${isDark ? 'dark' : ''} ${className}`.trim(),
        style,
      }
    : {
        className,
        style,
      };

  return (
    <ThemeContext.Provider value={value}>
      {enableScoping ? (
        <div {...containerProps}>
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Utility function to convert theme to CSS properties
function themeToCSSProperties(theme: Theme, isDark: boolean): Record<string, string> {
  const properties: Record<string, string> = {};
  const mode = isDark ? 'dark' : 'light';

  // Convert colors
  Object.entries(theme.tokens.colors).forEach(([key, value]) => {
    if (value && typeof value === 'object' && value[mode]) {
      properties[`--color-${key}`] = value[mode];
    }
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

// Hook for theme-aware styling
export function useThemeStyles() {
  const { theme, isDark, isScoped, scopeId } = useTheme();
  
  return {
    theme,
    isDark,
    isScoped,
    scopeId,
    getTokenValue: (path: string): string | undefined => {
      if (!theme) return undefined;
      
      const parts = path.split('.');
      let current: any = theme.tokens;
      
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return undefined;
        }
      }
      
      if (typeof current === 'object' && current !== null) {
        return current[isDark ? 'dark' : 'light'] || current.light;
      }
      
      return typeof current === 'string' ? current : undefined;
    },
    getCSSVariable: (name: string): string => {
      return isScoped ? `var(--${name})` : `var(--${name})`;
    },
  };
}

export default ThemeProvider;