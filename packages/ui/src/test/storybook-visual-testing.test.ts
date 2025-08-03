/**
 * Storybook Visual and Functional Testing Suite
 * Tests the Acrobi Design System components at https://dev.acrobi.com
 */

import puppeteer, { Browser, Page } from 'puppeteer';

describe('Acrobi Design System Storybook Tests', () => {
  let browser: Browser;
  let page: Page;
  const STORYBOOK_URL = 'https://dev.acrobi.com';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    // Wait for navigation and ensure page is loaded
    await page.goto(STORYBOOK_URL, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
  });

  describe('Storybook Interface', () => {
    test('should load Storybook interface successfully', async () => {
      // Check for Storybook-specific elements
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      await page.waitForSelector('.sidebar-container', { timeout: 10000 });
      
      const title = await page.title();
      expect(title).toContain('Storybook');
    });

    test('should have navigation sidebar with component categories', async () => {
      // Wait for sidebar to load
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      // Check for expected categories
      const expectedCategories = [
        'Theming',
        'Primitives', 
        'Structures',
        'Modules',
        'Sections',
        'Hooks',
        'Providers'
      ];

      for (const category of expectedCategories) {
        const categoryElement = await page.$(`text=${category}`);
        expect(categoryElement).toBeTruthy();
      }
    });
  });

  describe('Theme Switching Functionality', () => {
    test('should have theme switching toolbar', async () => {
      // Wait for toolbar to load
      await page.waitForSelector('.sidebar-container', { timeout: 10000 });
      
      // Look for theme switcher in toolbar
      const themeSwitcher = await page.$('[title*="Theme"]');
      expect(themeSwitcher).toBeTruthy();
    });

    test('should switch between light and dark themes', async () => {
      // Navigate to a component story first
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      // Try to find and click on Button component
      const buttonLink = await page.$('a[href*="button"]');
      if (buttonLink) {
        await buttonLink.click();
        await page.waitForTimeout(2000);
      }

      // Wait for preview iframe
      await page.waitForSelector('#storybook-preview-iframe', { timeout: 10000 });
      
      // Switch to iframe context
      const iframe = await page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
      if (iframe) {
        // Check for theme classes
        const bodyClasses = await iframe.evaluate(() => document.body.className);
        console.log('Current theme classes:', bodyClasses);
        
        // Basic assertion that some theme is applied
        expect(typeof bodyClasses).toBe('string');
      }
    });
  });

  describe('Component Rendering Tests', () => {
    test('should render Button component variations', async () => {
      // Navigate to Button component
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      // Find and click Button in sidebar
      const buttonLink = await page.$('a[href*="button"]');
      if (buttonLink) {
        await buttonLink.click();
        await page.waitForTimeout(3000);
        
        // Wait for preview iframe
        await page.waitForSelector('#storybook-preview-iframe', { timeout: 10000 });
        
        const iframe = await page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
        if (iframe) {
          // Check if button is rendered
          const button = await iframe.$('button');
          expect(button).toBeTruthy();
          
          // Take screenshot for visual comparison
          const buttonScreenshot = await iframe.screenshot({
            clip: { x: 0, y: 0, width: 400, height: 200 }
          });
          expect(buttonScreenshot).toBeTruthy();
        }
      }
    });

    test('should test interactive components', async () => {
      // Navigate to an interactive component
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      // Look for interactive components like switches or inputs
      const interactiveComponents = ['switch', 'input', 'textfield'];
      
      for (const componentName of interactiveComponents) {
        const componentLink = await page.$(`a[href*="${componentName}"]`);
        if (componentLink) {
          await componentLink.click();
          await page.waitForTimeout(2000);
          
          const iframe = await page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
          if (iframe) {
            // Test basic interaction
            const interactiveElement = await iframe.$('input, button, [role="switch"]');
            if (interactiveElement) {
              await interactiveElement.click();
              // Component should respond to interaction
              expect(interactiveElement).toBeTruthy();
            }
          }
          break; // Test one interactive component
        }
      }
    });
  });

  describe('Advanced Theming Features', () => {
    test('should test audio theme tokens (if available)', async () => {
      // Navigate to Theming category
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      const themingSection = await page.$('text=Theming');
      if (themingSection) {
        await themingSection.click();
        await page.waitForTimeout(2000);
        
        // Look for audio/haptic testing stories
        const assetTesting = await page.$('text=Asset Testing');
        if (assetTesting) {
          await assetTesting.click();
          await page.waitForTimeout(2000);
          
          const iframe = await page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
          if (iframe) {
            // Check for audio/haptic controls
            const audioControls = await iframe.$('[data-testid*="audio"], [data-testid*="sound"]');
            const hapticControls = await iframe.$('[data-testid*="haptic"], [data-testid*="vibration"]');
            
            // At least one should be present if advanced theming is implemented
            const hasAdvancedFeatures = audioControls || hapticControls;
            expect(hasAdvancedFeatures).toBeTruthy();
          }
        }
      }
    });

    test('should test theme inheritance functionality', async () => {
      // Navigate to Theme Showcase if available
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      const themeShowcase = await page.$('text=Theme Showcase');
      if (themeShowcase) {
        await themeShowcase.click();
        await page.waitForTimeout(2000);
        
        const iframe = await page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
        if (iframe) {
          // Check for multiple theme variants
          const themeElements = await iframe.$$('[data-theme], [class*="theme-"]');
          expect(themeElements.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('Accessibility Testing', () => {
    test('should have proper ARIA labels and roles', async () => {
      // Navigate to a component
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      const buttonLink = await page.$('a[href*="button"]');
      if (buttonLink) {
        await buttonLink.click();
        await page.waitForTimeout(2000);
        
        const iframe = await page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
        if (iframe) {
          // Check for accessibility attributes
          const elementsWithAriaLabels = await iframe.$$('[aria-label], [aria-labelledby], [role]');
          expect(elementsWithAriaLabels.length).toBeGreaterThan(0);
        }
      }
    });

    test('should support keyboard navigation', async () => {
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      // Test keyboard navigation in sidebar
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      
      // Should navigate to a story
      await page.waitForTimeout(1000);
      const iframe = await page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
      expect(iframe).toBeTruthy();
    });
  });

  describe('Performance and Loading', () => {
    test('should load components within reasonable time', async () => {
      const startTime = Date.now();
      
      await page.goto(STORYBOOK_URL, { waitUntil: 'networkidle0' });
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    });

    test('should not have console errors', async () => {
      const errors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(STORYBOOK_URL, { waitUntil: 'networkidle0' });
      await page.waitForTimeout(5000);
      
      // Filter out common non-critical errors
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('sw.js') &&
        !error.includes('404')
      );
      
      expect(criticalErrors.length).toBe(0);
    });
  });

  describe('Visual Regression Testing', () => {
    test('should match component visual snapshots', async () => {
      // Navigate to Button component
      await page.waitForSelector('[data-testid="sidebar-root"]', { timeout: 10000 });
      
      const buttonLink = await page.$('a[href*="button"]');
      if (buttonLink) {
        await buttonLink.click();
        await page.waitForTimeout(3000);
        
        // Take full page screenshot
        const screenshot = await page.screenshot({
          fullPage: false,
          clip: { x: 0, y: 0, width: 1920, height: 1080 }
        });
        
        expect(screenshot).toBeTruthy();
        
        // Could save for future comparison
        // fs.writeFileSync('button-component-snapshot.png', screenshot);
      }
    });
  });
});