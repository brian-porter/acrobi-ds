/**
 * Tailwind Theme Configuration Generator
 * Generates Tailwind config that uses Acrobi Design System semantic variables
 * 
 * Usage in app's tailwind.config.js:
 * const { createAcrobiTailwindConfig } = require('@acrobi/ui/dist/styles/tailwind/tailwind-theme-config');
 * module.exports = createAcrobiTailwindConfig();
 */

/**
 * Creates a Tailwind configuration that integrates with Acrobi themes
 * @param {Object} options - Configuration options
 * @param {boolean} options.includeBase - Include base Tailwind styles (default: true)
 * @param {string[]} options.themes - Theme names to support (default: ['acrobi', 'bluequeue'])
 * @param {Object} options.extend - Additional Tailwind extensions
 * @returns {Object} Tailwind configuration object
 */
function createAcrobiTailwindConfig(options = {}) {
  const {
    includeBase = true,
    themes = ['acrobi', 'bluequeue'],
    extend = {}
  } = options;

  return {
    content: [
      // App developers should add their own content paths
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['class', '[data-theme*="dark"]'],
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        // Colors using Acrobi semantic variables
        colors: {
          // Primary colors
          primary: {
            DEFAULT: 'var(--primary)',
            foreground: 'var(--primary-foreground)',
          },
          // Secondary colors
          secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
          },
          // Neutral colors (for neutral buttons)
          neutral: {
            DEFAULT: 'var(--neutral)',
            foreground: 'var(--neutral-foreground)',
          },
          // Background colors
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          // Muted colors
          muted: {
            DEFAULT: 'var(--muted)',
            foreground: 'var(--muted-foreground)',
          },
          // Accent colors
          accent: {
            DEFAULT: 'var(--accent)',
            foreground: 'var(--accent-foreground)',
          },
          // Status colors
          destructive: {
            DEFAULT: 'var(--destructive)',
            foreground: 'var(--destructive-foreground)',
          },
          warning: {
            DEFAULT: 'var(--warning)',
            foreground: 'var(--warning-foreground)',
          },
          success: {
            DEFAULT: 'var(--success)',
            foreground: 'var(--success-foreground)',
          },
          // UI colors
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
          // Card colors
          card: {
            DEFAULT: 'var(--card)',
            foreground: 'var(--card-foreground)',
          },
          // Popover colors
          popover: {
            DEFAULT: 'var(--popover)',
            foreground: 'var(--popover-foreground)',
          },
        },
        // Border radius using Acrobi variables
        borderRadius: {
          lg: 'var(--radius-lg)',
          md: 'var(--radius-md)',
          sm: 'var(--radius-sm)',
          DEFAULT: 'var(--radius)',
          full: 'var(--radius-full)',
        },
        // Font families using Acrobi variables
        fontFamily: {
          sans: 'var(--font-sans)',
          mono: 'var(--font-mono)',
        },
        // Spacing using Acrobi variables
        spacing: {
          'xs': 'var(--spacing-xs)',
          'sm': 'var(--spacing-sm)',
          'md': 'var(--spacing-md)',
          'lg': 'var(--spacing-lg)',
          'xl': 'var(--spacing-xl)',
        },
        // Animation and transitions
        keyframes: {
          'accordion-down': {
            from: { height: 0 },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: 0 },
          },
          'fade-in': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          'fade-out': {
            from: { opacity: 1 },
            to: { opacity: 0 },
          },
          'slide-in': {
            from: { transform: 'translateX(-100%)' },
            to: { transform: 'translateX(0)' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'fade-in': 'fade-in 0.2s ease-out',
          'fade-out': 'fade-out 0.2s ease-out',
          'slide-in': 'slide-in 0.3s ease-out',
        },
        // Custom utilities
        ...extend,
      },
    },
    plugins: [
      // Plugin to add Acrobi-specific utilities
      function({ addUtilities, addBase, theme }) {
        // Add base styles that respect theme switching
        if (includeBase) {
          addBase({
            '*': {
              'border-color': 'var(--border)',
            },
            body: {
              'background-color': 'var(--background)',
              color: 'var(--foreground)',
              'font-family': 'var(--font-sans)',
            },
          });
        }

        // Add custom utilities for Acrobi integration
        addUtilities({
          // Theme-aware focus utilities
          '.focus-ring': {
            'outline': '2px solid transparent',
            'outline-offset': '2px',
            'box-shadow': '0 0 0 2px var(--ring)',
          },
          '.focus-ring-inset': {
            'outline': '2px solid transparent',
            'outline-offset': '-2px',
            'box-shadow': 'inset 0 0 0 2px var(--ring)',
          },
          // Theme-aware disabled state
          '.disabled': {
            opacity: '0.5',
            'pointer-events': 'none',
          },
          // Acrobi button size utilities that match your data attributes
          '.btn-xs': {
            height: '24px',
            padding: '4px 8px',
            'font-size': '11px',
          },
          '.btn-sm': {
            height: '32px',
            padding: '6px 12px',
            'font-size': '12px',
          },
          '.btn-md': {
            height: '36px',
            padding: '8px 16px',
            'font-size': '12px',
          },
          '.btn-lg': {
            height: '48px',
            padding: '12px 24px',
            'font-size': '14px',
          },
        });
      },
    ],
  };
}

/**
 * Creates a minimal Tailwind config for apps that want more control
 * @param {Object} options - Configuration options
 * @returns {Object} Minimal Tailwind configuration
 */
function createMinimalAcrobiConfig(options = {}) {
  const { extend = {} } = options;
  
  return {
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary)',
          'primary-foreground': 'var(--primary-foreground)',
          secondary: 'var(--secondary)',
          'secondary-foreground': 'var(--secondary-foreground)',
          neutral: 'var(--neutral)',
          'neutral-foreground': 'var(--neutral-foreground)',
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          muted: 'var(--muted)',
          'muted-foreground': 'var(--muted-foreground)',
          accent: 'var(--accent)',
          'accent-foreground': 'var(--accent-foreground)',
          destructive: 'var(--destructive)',
          'destructive-foreground': 'var(--destructive-foreground)',
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
          card: 'var(--card)',
          'card-foreground': 'var(--card-foreground)',
        },
        fontFamily: {
          sans: 'var(--font-sans)',
          mono: 'var(--font-mono)',
        },
        borderRadius: {
          DEFAULT: 'var(--radius)',
          lg: 'var(--radius-lg)',
          md: 'var(--radius-md)',
          sm: 'var(--radius-sm)',
          full: 'var(--radius-full)',
        },
        ...extend,
      },
    },
  };
}

/**
 * Utility to convert Acrobi theme colors to HSL format for better Tailwind integration
 * @param {string} themeName - Name of the theme ('acrobi', 'bluequeue', etc.)
 * @returns {Object} HSL color mappings
 */
function getThemeHSLColors(themeName) {
  const themeColors = {
    acrobi: {
      primary: '220 90% 56%',         // #1975f0
      'primary-foreground': '0 0% 99%', // Almost white
      secondary: '76 100% 35%',       // #beef10
      background: '0 0% 99%',         // Almost white
      foreground: '24 10% 10%',       // #1d1c1a
      muted: '0 0% 77%',             // #c4c4c4
      'muted-foreground': '0 0% 43%', // #6d6d6d
      border: '0 0% 77%',            // #c4c4c4
      ring: '220 90% 56%',           // #1975f0
    },
    bluequeue: {
      primary: '30 41% 18%',          // rgb(48, 47, 44)
      'primary-foreground': '300 100% 99%', // rgb(255, 254, 255)
      secondary: '0 0% 77%',          // rgb(196, 196, 196)
      background: '300 100% 99%',     // rgb(255, 254, 255)
      foreground: '30 6% 16%',        // rgb(29, 28, 26)
      muted: '0 0% 77%',             // rgb(196, 196, 196)
      'muted-foreground': '0 0% 43%', // rgb(109, 109, 109)
      border: '0 0% 77%',            // rgb(196, 196, 196)
      ring: '217 89% 51%',           // rgb(25, 117, 240)
    },
  };

  return themeColors[themeName] || themeColors.acrobi;
}

/**
 * Pre-built Tailwind configs for specific use cases
 */
const prebuiltConfigs = {
  // For React apps using Acrobi components
  react: () => createAcrobiTailwindConfig({
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
  }),
  
  // For Next.js apps
  nextjs: () => createAcrobiTailwindConfig({
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  }),
  
  // For Vue apps
  vue: () => createAcrobiTailwindConfig({
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
  }),
  
  // For Storybook
  storybook: () => createAcrobiTailwindConfig({
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './stories/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  }),
};

module.exports = {
  createAcrobiTailwindConfig,
  createMinimalAcrobiConfig,
  getThemeHSLColors,
  prebuiltConfigs,
};

// ES module export for modern bundlers
export {
  createAcrobiTailwindConfig,
  createMinimalAcrobiConfig,
  getThemeHSLColors,
  prebuiltConfigs,
};