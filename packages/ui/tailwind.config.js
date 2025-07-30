/** @type {import('tailwindcss').Config} */
const sharedConfig = require('@acrobi/tailwind-config');

module.exports = {
  ...sharedConfig,
  content: [
    // UI package content
    './src/**/*.{js,ts,jsx,tsx}',
    './storybook/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
};
