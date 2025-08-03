import { test, expect } from '@playwright/test';

// Test suite for documentation site theme switcher
test.describe('Documentation Site Theme Switcher', () => {
  test('should allow users to switch themes via live switcher', async ({ page }) => {
    // Navigate to documentation site
    await page.goto('/docs');

    // Verify initial theme is light
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(initialTheme).toBe('acrobi-light');

    // Find and click the theme switcher dropdown
    await page.click('[data-testid="theme-switcher-button"]');

    // Select dark theme from dropdown
    await page.click('[data-testid="theme-option-dark"]');

    // Verify theme changed to dark
    const darkTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(darkTheme).toBe('acrobi-dark');

    // Verify theme preference is saved (if applicable)
    await page.reload();
    const savedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(savedTheme).toBe('acrobi-dark');

    // Switch back to light theme
    await page.click('[data-testid="theme-switcher-button"]');
    await page.click('[data-testid="theme-option-light"]');

    // Verify theme changed back to light
    const lightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(lightTheme).toBe('acrobi-light');
  });

  test('should display all available themes in switcher', async ({ page }) => {
    await page.goto('/docs');

    // Click theme switcher to open dropdown
    await page.click('[data-testid="theme-switcher-button"]');

    // Verify all expected themes are available
    const themeOptions = await page.locator('[data-testid^="theme-option-"]').allTextContents();
    expect(themeOptions).toContain('Light');
    expect(themeOptions).toContain('Dark');
    expect(themeOptions).toContain('Custom Theme'); // Assuming a custom theme exists

    // Verify theme options are properly labeled
    const lightOption = await page.locator('[data-testid="theme-option-light"]');
    const darkOption = await page.locator('[data-testid="theme-option-dark"]');
    
    expect(await lightOption.getAttribute('aria-label')).toBe('Switch to light theme');
    expect(await darkOption.getAttribute('aria-label')).toBe('Switch to dark theme');
  });

  test('should maintain theme consistency across documentation pages', async ({ page }) => {
    await page.goto('/docs');

    // Switch to dark theme
    await page.click('[data-testid="theme-switcher-button"]');
    await page.click('[data-testid="theme-option-dark"]');

    // Navigate to another documentation page
    await page.click('[data-testid="docs-navigation-link-components"]');

    // Verify theme is still dark
    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('acrobi-dark');

    // Verify components are styled correctly with dark theme
    const componentBgColor = await page.locator('[data-testid="component-example"]').first().evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(componentBgColor).toBe('rgb(31, 41, 55)'); // Expected dark theme component bg
  });
});