import { test, expect } from '@playwright/test';
import { ThemeManager } from '../../src/styles/themes/acrobi/theme-manager';

// Test suite for global theme application and light/dark mode switching
test.describe('Global Theme Application and Light/Dark Mode Switching', () => {
  test('should apply multiple themes globally and switch between light/dark modes without page reload', async ({ page }) => {
    // Navigate to Storybook or documentation site
    await page.goto('/');

    // Verify initial theme is applied
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(initialTheme).toBe('acrobi-light');

    // Switch to dark mode
    await page.click('[data-testid="theme-toggle"]');
    
    // Verify theme switched to dark without reload
    const darkTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(darkTheme).toBe('acrobi-dark');

    // Switch back to light mode
    await page.click('[data-testid="theme-toggle"]');
    
    // Verify theme switched back to light
    const lightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(lightTheme).toBe('acrobi-light');
  });

  test('should apply theme to all components consistently', async ({ page }) => {
    await page.goto('/');

    // Apply dark theme
    await page.click('[data-testid="theme-toggle"]');

    // Check multiple component types have correct theme applied
    const buttonBgColor = await page.locator('button').first().evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(buttonBgColor).toBe('rgb(55, 65, 81)'); // Expected dark theme button bg

    const inputBorderColor = await page.locator('input').first().evaluate((el) => 
      window.getComputedStyle(el).borderColor
    );
    expect(inputBorderColor).toBe('rgb(75, 85, 99)'); // Expected dark theme input border
  });
});

// Test suite for scoped theming
test.describe('Scoped Theming', () => {
  test('should apply theme to specific component scopes only', async ({ page }) => {
    await page.goto('/scoped-theme-demo');

    // Verify global theme is light
    const globalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(globalTheme).toBe('acrobi-light');

    // Check scoped component has dark theme applied
    const scopedComponentTheme = await page.locator('[data-testid="scoped-dark-section"]').evaluate((el) => 
      el.getAttribute('data-theme')
    );
    expect(scopedComponentTheme).toBe('acrobi-dark');

    // Check that unscoped components still follow global theme
    const unscopedComponentBg = await page.locator('[data-testid="unscoped-component"]').evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(unscopedComponentBg).toBe('rgb(255, 255, 255)'); // Light theme bg
  });
});

// Test suite for theme inheritance
test.describe('Theme Inheritance', () => {
  test('should inherit theme properties from parent themes', async ({ page }) => {
    await page.goto('/theme-inheritance-demo');

    // Create a custom theme that inherits from acrobi-light
    const themeManager = new ThemeManager();
    const customTheme = themeManager.createTheme('custom-light', {
      extends: 'acrobi-light',
      tokens: {
        colors: {
          primary: '#ff6b6b' // Override primary color
        }
      }
    });

    // Apply custom theme
    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    }, 'custom-light');

    // Verify inherited properties are applied
    const buttonColor = await page.locator('button').first().evaluate((el) => 
      window.getComputedStyle(el).color
    );
    expect(buttonColor).toBe('rgb(255, 107, 107)'); // Custom primary color

    // Verify inherited typography properties
    const headingFont = await page.locator('h1').first().evaluate((el) => 
      window.getComputedStyle(el).fontFamily
    );
    expect(headingFont).toContain('Inter'); // Inherited from acrobi-light
  });
});

// Test suite for dynamic assets
test.describe('Dynamic Assets', () => {
  test('should load appropriate assets for current theme and mode', async ({ page }) {
    await page.goto('/dynamic-assets-demo');

    // Check light mode assets
    const lightLogoSrc = await page.locator('[data-testid="logo"]').getAttribute('src');
    expect(lightLogoSrc).toContain('logo-light');

    // Switch to dark mode
    await page.click('[data-testid="theme-toggle"]');

    // Check dark mode assets
    const darkLogoSrc = await page.locator('[data-testid="logo"]').getAttribute('src');
    expect(darkLogoSrc).toContain('logo-dark');

    // Check that audio assets change with theme
    const audioSrc = await page.locator('[data-testid="theme-audio"]').getAttribute('src');
    expect(audioSrc).toContain('dark-theme-sound');
  });
});