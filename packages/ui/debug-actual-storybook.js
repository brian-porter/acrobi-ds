#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function debugActualStorybook() {
  console.log('🔍 Debugging ACTUAL Storybook state...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    devtools: true,
    args: ['--no-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('📖 Connecting to Storybook...');
    await page.goto('http://localhost:6006/', { waitUntil: 'networkidle0', timeout: 15000 });
    
    // Wait for Storybook to load
    await page.waitForSelector('.sidebar-container', { timeout: 10000 });
    console.log('✅ Storybook loaded');
    
    // Navigate to Button story
    console.log('🔘 Navigating to Button story...');
    await page.click('text=Button');
    await page.waitForTimeout(2000);
    
    // Check if we can access the preview iframe
    const iframe = await page.$('#storybook-preview-iframe');
    if (!iframe) {
      console.log('❌ Could not find preview iframe');
      return;
    }
    
    const frame = await iframe.contentFrame();
    if (!frame) {
      console.log('❌ Could not access iframe content');
      return;
    }
    
    console.log('✅ Accessed story content');
    
    // Check current theme
    console.log('🎨 Checking current theme...');
    const currentTheme = await frame.evaluate(() => {
      return document.body.getAttribute('data-theme') || 
             document.documentElement.getAttribute('data-theme') ||
             'none';
    });
    console.log(`Current theme: ${currentTheme}`);
    
    // Find theme switcher and switch to BlueQueue
    console.log('🔄 Looking for theme switcher...');
    const themeSwitcher = await page.$('[title*="theme"], [title*="Theme"]');
    if (themeSwitcher) {
      console.log('✅ Found theme switcher');
      await themeSwitcher.click();
      await page.waitForTimeout(1000);
      
      // Try to find BlueQueue option
      const blueQueueOption = await page.$('text=BlueQueue');
      if (blueQueueOption) {
        console.log('✅ Found BlueQueue option, clicking...');
        await blueQueueOption.click();
        await page.waitForTimeout(2000);
      } else {
        console.log('❌ Could not find BlueQueue option');
      }
    } else {
      console.log('❌ Could not find theme switcher');
    }
    
    // Check theme after switching
    const newTheme = await frame.evaluate(() => {
      return document.body.getAttribute('data-theme') || 
             document.documentElement.getAttribute('data-theme') ||
             'none';
    });
    console.log(`Theme after switching: ${newTheme}`);
    
    // Find primary buttons and check their colors
    console.log('🔘 Analyzing button colors...');
    const buttonAnalysis = await frame.evaluate(() => {
      const primaryButtons = document.querySelectorAll('[data-btn-style="pf"]');
      const results = [];
      
      primaryButtons.forEach((btn, index) => {
        const computedStyle = getComputedStyle(btn);
        results.push({
          index: index,
          backgroundColor: computedStyle.backgroundColor,
          color: computedStyle.color,
          borderColor: computedStyle.borderColor,
          text: btn.textContent?.trim() || 'no text'
        });
      });
      
      // Also check CSS variables
      const rootStyle = getComputedStyle(document.documentElement);
      const bodyStyle = getComputedStyle(document.body);
      
      return {
        buttons: results,
        cssVariables: {
          primary: rootStyle.getPropertyValue('--primary').trim() || bodyStyle.getPropertyValue('--primary').trim(),
          colorP500: rootStyle.getPropertyValue('--color--p500').trim() || bodyStyle.getPropertyValue('--color--p500').trim(),
          primaryHsl: rootStyle.getPropertyValue('--primary-hsl').trim() || bodyStyle.getPropertyValue('--primary-hsl').trim(),
        }
      };
    });
    
    console.log('\\n📊 BUTTON ANALYSIS RESULTS:');
    console.log('CSS Variables:');
    console.log(`  --primary: ${buttonAnalysis.cssVariables.primary || 'undefined'}`);
    console.log(`  --color--p500: ${buttonAnalysis.cssVariables.colorP500 || 'undefined'}`);
    console.log(`  --primary-hsl: ${buttonAnalysis.cssVariables.primaryHsl || 'undefined'}`);
    
    console.log('\\nPrimary Buttons:');
    buttonAnalysis.buttons.forEach(btn => {
      console.log(`  Button ${btn.index}: "${btn.text}"`);
      console.log(`    Background: ${btn.backgroundColor}`);
      console.log(`    Text Color: ${btn.color}`);
      console.log(`    Border: ${btn.borderColor}`);
    });
    
    // Check which CSS files are loaded
    console.log('\\n📄 Checking loaded CSS files...');
    const cssFiles = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return links.map(link => link.href).filter(href => href.includes('theme') || href.includes('semantic'));
    });
    
    console.log('Loaded CSS files:');
    cssFiles.forEach(file => console.log(`  ${file}`));
    
    // Take a screenshot
    console.log('\\n📸 Taking screenshot...');
    await page.screenshot({ path: 'storybook-debug-screenshot.png', fullPage: true });
    console.log('Screenshot saved as storybook-debug-screenshot.png');
    
    console.log('\\n🎯 ANALYSIS COMPLETE');
    console.log('\\nExpected vs Actual:');
    console.log(`Expected primary color: #1975f0 (blue)`);
    console.log(`Actual button background: ${buttonAnalysis.buttons[0]?.backgroundColor || 'none found'}`);
    
    if (buttonAnalysis.cssVariables.primary === 'rgb(25, 117, 240)' || 
        buttonAnalysis.cssVariables.primary === '#1975f0') {
      console.log('✅ CSS variable is correct!');
    } else {
      console.log('❌ CSS variable is wrong or missing');
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

debugActualStorybook().catch(console.error);