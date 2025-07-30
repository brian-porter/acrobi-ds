import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Acrobi Design System',
  description: 'A comprehensive design system for building modern, theme-able web applications',
  ignoreDeadLinks: true, // Temporarily ignore dead links for deployment
  
  themeConfig: {
    outline: false, // This removes the "On this page" table of contents
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Components', link: '/components/' },
      { text: 'Examples', link: '/examples/' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started' },
            { text: 'Migration Guide', link: '/migration-guide' }
          ]
        },
        {
          text: 'Guides',
          items: [
            { text: 'Service Worker Master Guide', link: '/guides/service-worker-guide' },
            { text: 'Accessibility Guide', link: '/guides/accessibility-guide' }
          ]
        },
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'Primitives', link: '/components/primitives/' },
            { text: 'Structures', link: '/components/structures/' },
            { text: 'Hooks', link: '/components/hooks/' }
          ]
        },
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
            { text: 'Dashboard App', link: '/examples/dashboard-app' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'API Reference', link: '/components/api-reference' }
          ]
        },
        {
          text: 'Primitives',
          items: [
            { text: 'Overview', link: '/components/primitives/' },
            { text: 'Button', link: '/components/Button' },
            { text: 'Input', link: '/components/Input' },
            { text: 'Card', link: '/components/Card' },
            { text: 'Avatar', link: '/components/Avatar' },
            { text: 'Badge', link: '/components/Badge' },
            { text: 'Alert', link: '/components/Alert-V1' },
            { text: 'Dialog', link: '/components/Dialog' },
            { text: 'Icon', link: '/components/Icon' },
            { text: 'Progress', link: '/components/Progress' },
            { text: 'Switch', link: '/components/Switch-Ctrl' },
            { text: 'Tooltip', link: '/components/Tooltip' },
            { text: 'Chip', link: '/components/Chip' }
          ]
        },
        {
          text: 'Structures',
          items: [
            { text: 'Overview', link: '/components/structures/' },
            { text: 'TextField', link: '/components/structures/text-field' },
            { text: 'SelectField', link: '/components/structures/select-field' },
            { text: 'ButtonPanel', link: '/components/structures/btn-panel' },
            { text: 'DataTable', link: '/components/structures/data-table' },
            { text: 'SecHead', link: '/components/structures/sec-head' },
            { text: 'FeatureGuard', link: '/components/structures/feature-guard' }
          ]
        },
        {
          text: 'Hooks & Providers',
          items: [
            { text: 'Overview', link: '/components/hooks/' },
            { text: 'useGeolocation', link: '/components/hooks/use-geolocation' },
            { text: 'useCamera', link: '/components/hooks/use-camera' },
            { text: 'useBarcodeScanner', link: '/components/hooks/use-barcode-scanner' },
            { text: 'usePlatform', link: '/components/hooks/use-platform' },
            { text: 'useFeatureDetection', link: '/components/hooks/use-feature-detection' }
          ]
        },
        {
          text: 'Modules',
          items: [
            { text: 'Overview', link: '/components/modules/' },
            { text: 'AddCollection', link: '/components/modules/add-collection' },
            { text: 'AssignTo', link: '/components/modules/assign-to' },
            { text: 'Delete', link: '/components/modules/delete' },
            { text: 'Editor', link: '/components/modules/editor' },
            { text: 'MenuActions', link: '/components/modules/menu-actions' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/acrobi/acrobi-design-system' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Acrobi Design System'
    }
  }
})