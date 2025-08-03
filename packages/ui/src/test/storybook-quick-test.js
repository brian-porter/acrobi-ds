/**
 * Quick Storybook Site Analysis Script
 * Simple test to check what's actually available on https://dev.acrobi.com
 */

const puppeteer = require('puppeteer');

async function testStorybookSite() {
  const browser = await puppeteer.launch({
    headless: false, // Show browser for debugging
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    console.log('🔍 Testing https://dev.acrobi.com...\n');
    
    // Navigate to the site
    console.log('⏳ Loading site...');
    await page.goto('https://dev.acrobi.com', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Check page title
    const title = await page.title();
    console.log(`📄 Page Title: ${title}`);
    
    // Take screenshot
    await page.screenshot({ path: 'storybook-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved as storybook-screenshot.png');
    
    // Check for Storybook elements
    console.log('\n🔍 Checking for Storybook elements...');
    
    // Wait for page to be fully loaded
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Get page content info
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(`📝 Page contains ${bodyText.length} characters of text`);
    
    // Check for common Storybook selectors
    const storybookElements = [
      '[data-testid="sidebar-root"]',
      '.sidebar-container',
      '#storybook-root',
      '[id*="storybook"]',
      '[class*="storybook"]',
      'iframe[title="storybook-preview-iframe"]',
      '#storybook-preview-iframe'
    ];
    
    console.log('\n🎯 Checking for Storybook-specific elements:');
    for (const selector of storybookElements) {
      const element = await page.$(selector);
      console.log(`  ${selector}: ${element ? '✅ Found' : '❌ Not found'}`);
    }
    
    // Get all navigation links
    console.log('\n🔗 Navigation links found:');
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.textContent.trim(),
        href: a.href
      })).filter(link => link.text.length > 0).slice(0, 10);
    });
    
    links.forEach(link => {
      console.log(`  📎 ${link.text} -> ${link.href}`);
    });
    
    // Check for theme-related elements
    console.log('\n🎨 Theme-related elements:');
    const themeElements = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[class*="theme"], [data-theme], [class*="dark"], [class*="light"]'))
        .slice(0, 5)
        .map(el => ({
          tag: el.tagName,
          classes: el.className,
          dataTheme: el.getAttribute('data-theme')
        }));
    });
    
    themeElements.forEach(el => {
      console.log(`  🎨 ${el.tag}: classes="${el.classes}" data-theme="${el.dataTheme}"`);
    });
    
    // Check for any error messages on page
    console.log('\n⚠️  Checking for error messages...');
    const errorMessages = await page.evaluate(() => {
      const errorText = document.body.innerText.toLowerCase();
      const errors = [];
      if (errorText.includes('error')) errors.push('Contains "error" text');
      if (errorText.includes('404')) errors.push('Contains "404" text');
      if (errorText.includes('not found')) errors.push('Contains "not found" text');
      if (errorText.includes('failed')) errors.push('Contains "failed" text');
      return errors;
    });
    
    if (errorMessages.length > 0) {
      errorMessages.forEach(error => console.log(`  ⚠️  ${error}`));
    } else {
      console.log('  ✅ No obvious error messages found');
    }
    
    // Try to interact with the site
    console.log('\n🖱️  Testing basic interactions...');
    
    // Try clicking first clickable element
    const clickableElement = await page.$('button, a, [role="button"]');
    if (clickableElement) {
      console.log('  ✅ Found clickable element, attempting click...');
      try {
        await clickableElement.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('  ✅ Click successful');
      } catch (error) {
        console.log(`  ⚠️  Click failed: ${error.message}`);
      }
    } else {
      console.log('  ❌ No clickable elements found');
    }
    
    console.log('\n✅ Analysis complete!');
    
  } catch (error) {
    console.error('❌ Error occurred:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testStorybookSite().catch(console.error);