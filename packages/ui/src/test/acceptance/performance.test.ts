import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Test suite for theme performance
test.describe('Theme Performance', () => {
  test('should switch themes instantaneously without page reload', async ({ page }) => {
    await page.goto('/docs');

    // Measure theme switching time
    const startTime = performance.now();
    
    // Switch to dark theme
    await page.click('[data-testid="theme-switcher-button"]');
    await page.click('[data-testid="theme-option-dark"]');
    
    const endTime = performance.now();
    const switchTime = endTime - startTime;

    // Verify theme switched correctly
    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('acrobi-dark');

    // Verify switching time is under 100ms (instantaneous)
    expect(switchTime).toBeLessThan(100);

    // Verify no page reload occurred
    const reloadCount = await page.evaluate(() => (window as any).reloadCount || 0);
    expect(reloadCount).toBe(0);
  });

  test('should generate optimized and minified themes.css', async () => {
    // Path to generated themes.css file
    const themesCssPath = path.join(__dirname, '../../../dist/themes.css');
    
    // Verify file exists
    expect(fs.existsSync(themesCssPath)).toBe(true);

    // Read file content
    const cssContent = fs.readFileSync(themesCssPath, 'utf-8');

    // Verify file is minified (no unnecessary whitespace)
    expect(cssContent).not.toMatch(/\s{2,}/); // No multiple consecutive spaces
    expect(cssContent).not.toMatch(/[^\S\r\n]{2,}/); // No multiple consecutive non-linebreak whitespace

    // Verify file contains expected theme classes
    expect(cssContent).toContain('.theme-acrobi-light');
    expect(cssContent).toContain('.theme-acrobi-dark');

    // Verify file size is reasonable (under 100KB for example)
    const stats = fs.statSync(themesCssPath);
    expect(stats.size).toBeLessThan(100 * 1024); // 100KB

    // Verify CSS is valid (basic syntax check)
    expect(cssContent).toMatch(/[\w\-]+\s*{[^}]*}/); // Basic CSS rule pattern
  });

  test('should not require component source code changes for theme switching', async ({ page }) => {
    await page.goto('/docs/components/button');

    // Get initial component styles
    const initialStyles = await page.locator('[data-testid="button-example"]').first().evaluate((el) => ({
      backgroundColor: window.getComputedStyle(el).backgroundColor,
      color: window.getComputedStyle(el).color,
      borderColor: window.getComputedStyle(el).borderColor
    }));

    // Switch theme
    await page.click('[data-testid="theme-switcher-button"]');
    await page.click('[data-testid="theme-option-dark"]');

    // Get updated component styles
    const updatedStyles = await page.locator('[data-testid="button-example"]').first().evaluate((el) => ({
      backgroundColor: window.getComputedStyle(el).backgroundColor,
      color: window.getComputedStyle(el).color,
      borderColor: window.getComputedStyle(el).borderColor
    }));

    // Verify styles changed (indicating theme applied)
    expect(initialStyles.backgroundColor).not.toBe(updatedStyles.backgroundColor);
    expect(initialStyles.color).not.toBe(updatedStyles.color);

    // Verify component markup unchanged (no additional classes/attributes)
    const initialMarkup = await page.locator('[data-testid="button-example"]').first().innerHTML();
    await page.click('[data-testid="theme-switcher-button"]');
    await page.click('[data-testid="theme-option-light"]');
    const finalMarkup = await page.locator('[data-testid="button-example"]').first().innerHTML();
    
    expect(initialMarkup).toBe(finalMarkup);
  });
});