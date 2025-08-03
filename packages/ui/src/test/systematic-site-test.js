#!/usr/bin/env node

/**
 * Systematic Site Testing with Puppeteer
 * Tests all VitePress and Storybook pages to ensure they load and dark mode works
 */

const puppeteer = require('puppeteer');

async function testSites() {
  console.log('🧪 Starting Systematic Site Testing...\\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true for CI
    devtools: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('📖 Testing VitePress Documentation...');
    await testVitePress(page);
    
    console.log('\\n📚 Testing Storybook Components...');
    await testStorybook(page);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

async function testVitePress(page) {
  const vitepressPages = [
    { name: 'Home', url: 'http://localhost:5173/' },
    { name: 'Getting Started', url: 'http://localhost:5173/guides/getting-started' },
    { name: 'Components Overview', url: 'http://localhost:5173/components/' },
    { name: 'Button Component', url: 'http://localhost:5173/components/button' },
    { name: 'Icon Component', url: 'http://localhost:5173/components/icon' },
    { name: 'Typography Guide', url: 'http://localhost:5173/guides/typography-guide' },
    { name: 'Theme Guide', url: 'http://localhost:5173/guides/theme-guide' },
    { name: 'Accessibility Guide', url: 'http://localhost:5173/guides/accessibility-guide' },
  ];
  
  let passedPages = 0;
  let totalPages = vitepressPages.length;
  
  for (const pageDef of vitepressPages) {
    try {
      console.log(`  🔍 Testing: ${pageDef.name}...`);
      
      await page.goto(pageDef.url, { waitUntil: 'networkidle0', timeout: 10000 });
      
      // Check if page loaded successfully
      const title = await page.title();
      if (title.includes('404') || title.includes('Not Found')) {
        console.log(`    ❌ ${pageDef.name}: Page not found (404)`);
        continue;
      }
      
      // Check for error content
      const errorContent = await page.$('.error');
      if (errorContent) {
        console.log(`    ❌ ${pageDef.name}: Error content detected`);
        continue;
      }
      
      // Wait for content to load
      await page.waitForSelector('body', { timeout: 5000 });
      
      console.log(`    ✅ ${pageDef.name}: Loaded successfully`);
      passedPages++;
      
      // Test dark mode toggle if available
      await testDarkModeToggle(page, pageDef.name);
      
    } catch (error) {
      console.log(`    ❌ ${pageDef.name}: Failed to load - ${error.message}`);
    }
    
    // Small delay between pages
    await page.waitForTimeout(500);
  }
  
  console.log(`\\n📊 VitePress Results: ${passedPages}/${totalPages} pages loaded successfully`);
}

async function testStorybook(page) {
  const storybookUrl = 'http://localhost:6006';
  
  try {
    console.log('  🔍 Testing Storybook home...');
    await page.goto(storybookUrl, { waitUntil: 'networkidle0', timeout: 15000 });
    
    // Wait for Storybook to load
    await page.waitForSelector('.sidebar-container', { timeout: 10000 });
    console.log('    ✅ Storybook: Main interface loaded');
    
    // Test specific component stories
    const storybookStories = [
      { name: 'Button - Primary', path: '?path=/story/primitives-button--primary' },
      { name: 'Button - Neutral', path: '?path=/story/primitives-button--neutral' },
      { name: 'Icon - Default', path: '?path=/story/primitives-icon--default' },
      { name: 'Typography - Headings', path: '?path=/story/primitives-typography--headings' },
    ];
    
    let passedStories = 0;
    
    for (const story of storybookStories) {
      try {
        console.log(`  🔍 Testing: ${story.name}...`);
        
        await page.goto(`${storybookUrl}/${story.path}`, { 
          waitUntil: 'networkidle0', 
          timeout: 10000 
        });
        
        // Wait for story content
        await page.waitForSelector('#storybook-preview-iframe', { timeout: 5000 });
        
        // Switch to iframe content
        const iframe = await page.$('#storybook-preview-iframe');
        const frame = await iframe.contentFrame();
        
        if (frame) {
          // Wait for component to render
          await frame.waitForSelector('body', { timeout: 5000 });
          
          console.log(`    ✅ ${story.name}: Story loaded successfully`);
          passedStories++;
          
          // Test theme switching in Storybook
          await testStorybookThemes(page, frame, story.name);
        } else {
          console.log(`    ❌ ${story.name}: Could not access iframe content`);
        }
        
      } catch (error) {
        console.log(`    ❌ ${story.name}: Failed to load - ${error.message}`);
      }
      
      await page.waitForTimeout(500);
    }
    
    console.log(`\\n📊 Storybook Results: ${passedStories}/${storybookStories.length} stories loaded successfully`);
    
  } catch (error) {
    console.log(`    ❌ Storybook: Failed to load - ${error.message}`);
  }
}

async function testDarkModeToggle(page, pageName) {
  try {
    // Look for common dark mode toggle selectors
    const toggleSelectors = [
      '.dark-toggle',
      '[data-theme-toggle]',
      '.theme-switch',
      '.VPSwitchAppearance'
    ];
    
    for (const selector of toggleSelectors) {
      const toggle = await page.$(selector);
      if (toggle) {
        console.log(`    🌙 ${pageName}: Testing dark mode toggle...`);
        
        // Test toggle
        await toggle.click();
        await page.waitForTimeout(500);
        
        // Check if dark mode applied
        const bodyClass = await page.evaluate(() => document.body.className);
        const dataTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
        
        if (bodyClass.includes('dark') || dataTheme?.includes('dark')) {
          console.log(`    ✅ ${pageName}: Dark mode toggle works`);
        } else {
          console.log(`    ⚠️ ${pageName}: Dark mode toggle found but may not be working`);
        }
        
        // Toggle back
        await toggle.click();
        await page.waitForTimeout(500);
        return;
      }
    }
    
    console.log(`    ℹ️ ${pageName}: No dark mode toggle found`);
  } catch (error) {
    console.log(`    ⚠️ ${pageName}: Dark mode test failed - ${error.message}`);
  }
}

async function testStorybookThemes(page, frame, storyName) {
  try {
    // Look for Storybook theme controls
    const themeControl = await page.$('[title*="theme"], [title*="Theme"]');
    if (themeControl) {
      console.log(`    🎨 ${storyName}: Testing theme switching...`);
      
      // Get initial button colors
      const initialColors = await frame.evaluate(() => {
        const primaryBtn = document.querySelector('[data-btn-style="pf"]');
        const neutralBtn = document.querySelector('[data-btn-style="nf"]');
        
        if (primaryBtn || neutralBtn) {
          const computedPrimary = primaryBtn ? getComputedStyle(primaryBtn) : null;
          const computedNeutral = neutralBtn ? getComputedStyle(neutralBtn) : null;
          
          return {
            primary: computedPrimary ? {
              backgroundColor: computedPrimary.backgroundColor,
              color: computedPrimary.color
            } : null,
            neutral: computedNeutral ? {
              backgroundColor: computedNeutral.backgroundColor,
              color: computedNeutral.color
            } : null
          };
        }
        return null;
      });
      
      if (initialColors) {
        console.log(`    📊 ${storyName}: Button colors detected and measured`);
        
        // Try to change theme
        await themeControl.click();
        await page.waitForTimeout(1000);
        
        // Check if colors changed
        const newColors = await frame.evaluate(() => {
          const primaryBtn = document.querySelector('[data-btn-style="pf"]');
          const neutralBtn = document.querySelector('[data-btn-style="nf"]');
          
          if (primaryBtn || neutralBtn) {
            const computedPrimary = primaryBtn ? getComputedStyle(primaryBtn) : null;
            const computedNeutral = neutralBtn ? getComputedStyle(neutralBtn) : null;
            
            return {
              primary: computedPrimary ? {
                backgroundColor: computedPrimary.backgroundColor,
                color: computedPrimary.color
              } : null,
              neutral: computedNeutral ? {
                backgroundColor: computedNeutral.backgroundColor,
                color: computedNeutral.color
              } : null
            };
          }
          return null;
        });
        
        if (newColors && 
            ((initialColors.primary?.backgroundColor !== newColors.primary?.backgroundColor) ||
             (initialColors.neutral?.backgroundColor !== newColors.neutral?.backgroundColor))) {
          console.log(`    ✅ ${storyName}: Theme switching changes button colors`);
        } else {
          console.log(`    ⚠️ ${storyName}: Theme switching may not be working properly`);
        }
      }
    } else {
      console.log(`    ℹ️ ${storyName}: No theme control found`);
    }
  } catch (error) {
    console.log(`    ⚠️ ${storyName}: Theme test failed - ${error.message}`);
  }
}

// Main execution
if (require.main === module) {
  testSites().catch(console.error);
}

module.exports = { testSites };