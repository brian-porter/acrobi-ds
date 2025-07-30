import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/styles/globals.css';
import '../src/styles/themes/theme-acrobi.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Theming',
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
      ],
    },
    layout: 'centered',

    // Add theme switching toolbar
    toolbar: {
      theme: {
        name: 'Theme',
        description: 'Switch between light and dark themes',
        defaultValue: 'light',
        toolbar: {
          icon: 'paintbrush',
          items: [
            { value: 'light', title: 'Light Theme' },
            { value: 'dark', title: 'Dark Theme' },
          ],
          showName: true,
        },
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get theme from toolbar or background
      const themeFromToolbar = context.globals.theme;
      const themeFromBackground =
        context.globals.backgrounds?.value === '#1a1a1a' ? 'dark' : 'light';
      const isDark =
        themeFromToolbar === 'dark' || themeFromBackground === 'dark';

      // Apply the Acrobi theme data attribute and SF Pro font
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', 'acrobi');
        document.body.style.fontFamily = 'var(--_typography---ff2)';

        // Apply dark class based on theme selection
        if (isDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'acrobi');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'acrobi');
        }
      }

      const className = `theme-acrobi acrobi-theme ${isDark ? 'dark' : ''}`;

      return React.createElement(
        'div',
        {
          'data-theme': 'acrobi',
          className,
          style: {
            fontFamily: 'var(--_typography---ff2)',
            minHeight: '100vh',
            padding: '1rem',
            backgroundColor: isDark ? '#1a1a1a' : '#fafafa',
            color: isDark ? '#ffffff' : '#000000',
          },
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
