import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Externalize problematic dependencies
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    
    const existingExternal = config.build.rollupOptions.external;
    const newExternals = ['gsap', 'next/dynamic', 'react-leaflet', 'socket.io-client'];
    
    if (Array.isArray(existingExternal)) {
      config.build.rollupOptions.external = [...existingExternal, ...newExternals];
    } else if (typeof existingExternal === 'function') {
      config.build.rollupOptions.external = (id, parent, isResolved) => {
        if (newExternals.includes(id)) return true;
        return existingExternal(id, parent, isResolved);
      };
    } else {
      config.build.rollupOptions.external = newExternals;
    }
    
    return config;
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
