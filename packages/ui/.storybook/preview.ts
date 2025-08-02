import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/styles/globals.css';
import '../src/styles/themes/theme-acrobi.css';
import '../src/styles/themes/theme-bluequeue.css';
import '../src/styles/themes/semantic-bridge.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Theming',
          ['Theme Showcase', 'Asset Testing', 'Theme Modes'],
          'Primitives',
          'Structures', 
          'Modules',
          'Sections',
          'Hooks',
          'Providers',
          '*', // Everything else
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fafafa',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'high-contrast-light',
          value: '#ffffff',
        },
        {
          name: 'high-contrast-dark',
          value: '#000000',
        },
      ],
    },
    layout: 'centered',

    // Enhanced theme switching toolbar with multiple themes
    toolbar: {
      theme: {
        name: 'Theme',
        description: 'Switch between available themes',
        defaultValue: 'acrobi-light',
        toolbar: {
          icon: 'paintbrush',
          items: [
            { value: 'acrobi-light', title: '🌞 Acrobi Light', left: '☀️' },
            { value: 'acrobi-dark', title: '🌙 Acrobi Dark', left: '🌙' },
            { value: 'acrobi-high-contrast', title: '🎯 High Contrast', left: '🎯' },
            { value: 'acrobi-sepia', title: '📜 Sepia', left: '📜' },
            { value: 'bluequeue-light', title: '🔵 BlueQueue (Webflow)', left: '🔵' },
          ],
          showName: true,
          dynamicTitle: true,
        },
      },
      colorMode: {
        name: 'Color Mode',
        description: 'Override theme color mode',
        defaultValue: 'auto',
        toolbar: {
          icon: 'contrast',
          items: [
            { value: 'auto', title: 'Auto (follows theme)' },
            { value: 'light', title: 'Force Light' },
            { value: 'dark', title: 'Force Dark' },
          ],
          showName: true,
        },
      },
      motionPreference: {
        name: 'Motion',
        description: 'Control animation and motion preferences',
        defaultValue: 'auto',
        toolbar: {
          icon: 'play',
          items: [
            { value: 'auto', title: 'Auto (system preference)' },
            { value: 'reduce', title: 'Reduced Motion' },
            { value: 'full', title: 'Full Motion' },
          ],
          showName: true,
        },
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get theme and preferences from toolbar
      const selectedTheme = context.globals.theme || 'acrobi-light';
      const colorModeOverride = context.globals.colorMode || 'auto';
      const motionPreference = context.globals.motionPreference || 'auto';
      
      // Determine if dark mode should be active
      const themeBaseDark = selectedTheme.includes('dark');
      const backgroundBaseDark = context.globals.backgrounds?.value === '#1a1a1a' || 
                                 context.globals.backgrounds?.value === '#000000';
      const forceDark = colorModeOverride === 'dark';
      const forceLight = colorModeOverride === 'light';
      
      const isDark = forceLight ? false : (forceDark || themeBaseDark || backgroundBaseDark);

      // Apply theme and preferences to document
      if (typeof document !== 'undefined') {
        // Set theme data attribute
        document.documentElement.setAttribute('data-theme', selectedTheme);
        
        // Apply dark class
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        // Apply motion preference
        if (motionPreference === 'reduce') {
          document.documentElement.style.setProperty('--motion-reduce', '1');
          document.documentElement.classList.add('reduce-motion');
        } else if (motionPreference === 'full') {
          document.documentElement.style.removeProperty('--motion-reduce');
          document.documentElement.classList.remove('reduce-motion');
        } else {
          // Auto - respect system preference
          document.documentElement.style.removeProperty('--motion-reduce');
          document.documentElement.classList.remove('reduce-motion');
        }

        // Set font family for consistent rendering
        document.body.style.fontFamily = 'var(--font-sans, "SF Pro Display", system-ui, sans-serif)';
        
        // Apply theme-specific body classes
        document.body.className = `theme-${selectedTheme} ${isDark ? 'dark' : 'light'} ${motionPreference !== 'auto' ? `motion-${motionPreference}` : ''}`.trim();
      }

      // Determine container styles based on theme
      const getContainerStyles = () => {
        const baseStyles = {
          fontFamily: 'var(--font-sans, "SF Pro Display", system-ui, sans-serif)',
          minHeight: '100vh',
          padding: '1rem',
          transition: motionPreference === 'reduce' ? 'none' : 'all 0.2s ease-in-out',
        };

        // Theme-specific colors
        switch (selectedTheme) {
          case 'bluequeue-light':
            return {
              ...baseStyles,
              fontFamily: '"Inter", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
              backgroundColor: 'rgb(255, 254, 255)', // Webflow background
              color: 'rgb(29, 28, 26)', // Webflow text
              fontSize: '14px',
            };
          case 'acrobi-high-contrast':
            return {
              ...baseStyles,
              backgroundColor: isDark ? '#000000' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              border: isDark ? '2px solid #ffffff' : '2px solid #000000',
            };
          case 'acrobi-sepia':
            return {
              ...baseStyles,
              backgroundColor: isDark ? '#2d2a1f' : '#f7f3e8',
              color: isDark ? '#e6d7b8' : '#3d3929',
            };
          case 'acrobi-dark':
            return {
              ...baseStyles,
              backgroundColor: isDark ? '#1a1a1a' : '#fafafa',
              color: isDark ? '#ffffff' : '#000000',
            };
          default: // acrobi-light
            return {
              ...baseStyles,
              backgroundColor: isDark ? '#1a1a1a' : '#fafafa',
              color: isDark ? '#ffffff' : '#000000',
            };
        }
      };

      const className = `theme-${selectedTheme} ${isDark ? 'dark' : 'light'} ${motionPreference !== 'auto' ? `motion-${motionPreference}` : ''}`.trim();

      return React.createElement(
        'div',
        {
          'data-theme': selectedTheme,
          'data-color-mode': isDark ? 'dark' : 'light',
          'data-motion-preference': motionPreference,
          className,
          style: getContainerStyles(),
        },
        React.createElement(Story)
      );
    },
  ],
  
  // Global types for theme switching
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'acrobi-light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'acrobi-light', title: 'Acrobi Light' },
          { value: 'acrobi-dark', title: 'Acrobi Dark' },
          { value: 'acrobi-high-contrast', title: 'High Contrast' },
          { value: 'acrobi-sepia', title: 'Sepia' },
          { value: 'bluequeue-light', title: 'BlueQueue (Webflow)' },
          { value: 'bluequeue-dark', title: 'BlueQueue Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    colorMode: {
      name: 'Color Mode',
      description: 'Force light or dark mode',
      defaultValue: 'auto',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'auto', title: 'Auto' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
      },
    },
    motionPreference: {
      name: 'Motion',
      description: 'Animation preferences',
      defaultValue: 'auto',
      toolbar: {
        icon: 'play',
        items: [
          { value: 'auto', title: 'Auto' },
          { value: 'reduce', title: 'Reduced' },
          { value: 'full', title: 'Full' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;