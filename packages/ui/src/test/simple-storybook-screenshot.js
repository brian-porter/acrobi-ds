#!/usr/bin/env node

/**
 * Simple Storybook Screenshot Test
 * Takes screenshots of button components in different themes
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeStorybookScreenshots() {
  console.log('📸 Taking Storybook screenshots to verify button colors...\n');
  
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: true,
      defaultViewport: { width: 1280, height: 1024 }
    });
    
    const page = await browser.newPage();
    
    // Navigate to Storybook
    const storybookUrl = 'http://localhost:6006';
    console.log('🔗 Connecting to Storybook...');
    
    await page.goto(storybookUrl, { waitUntil: 'networkidle0' });
    console.log('✅ Connected to Storybook');
    
    // Wait for Storybook to load
    await page.waitForSelector('iframe[data-is-root="false"]', { timeout: 10000 });
    console.log('✅ Storybook canvas loaded');
    
    // Create screenshots directory
    const screenshotDir = './screenshots';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }
    
    // Take screenshot of current state
    await page.screenshot({ 
      path: path.join(screenshotDir, 'storybook-initial.png'),
      fullPage: true 
    });
    console.log('📸 Initial screenshot saved');
    
    // Try to navigate to button stories by URL
    const buttonStoryUrls = [
      '?path=/story/primitives-button--primary',
      '?path=/story/primitives-button--all-variants',
      '?path=/story/button--primary',
      '?path=/story/hybrid-system-theme-integration-showcase--simple-integration'
    ];
    
    for (const storyUrl of buttonStoryUrls) {
      try {
        console.log(`📍 Trying story: ${storyUrl}`);
        await page.goto(`${storybookUrl}/${storyUrl}`, { 
          waitUntil: 'networkidle0',
          timeout: 5000 
        });
        
        // Wait a bit for the story to render
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Take screenshot
        const safeName = storyUrl.replace(/[^a-zA-Z0-9]/g, '-');
        await page.screenshot({ 
          path: path.join(screenshotDir, `storybook-${safeName}.png`),
          fullPage: true 
        });
        console.log(`✅ Screenshot saved for ${storyUrl}`);
        
        // Try to switch theme if theme selector is available
        try {
          const themeSelector = await page.$('[title*="Theme"]');
          if (themeSelector) {
            await themeSelector.click();
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const bluequeueOption = await page.$('[title*="BlueQueue"]');
            if (bluequeueOption) {
              await bluequeueOption.click();
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              await page.screenshot({ 
                path: path.join(screenshotDir, `storybook-${safeName}-bluequeue.png`),
                fullPage: true 
              });
              console.log(`✅ BlueQueue theme screenshot saved for ${storyUrl}`);
            }
          }
        } catch (error) {
          console.log('⚠️  Could not switch themes via UI');
        }
        
        break; // Found a working story, stop trying others
        
      } catch (error) {
        console.log(`⚠️  Story ${storyUrl} not found, trying next...`);
        continue;
      }
    }
    
    console.log('\n📊 Screenshot Analysis:');
    console.log('✅ Screenshots saved to ./screenshots/ directory');
    console.log('🔍 Check the screenshots to verify:');
    console.log('   • Button text is visible (white) on dark backgrounds');
    console.log('   • Primary filled buttons have proper contrast');
    console.log('   • BlueQueue theme uses Webflow colors correctly');
    
  } catch (error) {
    console.error('❌ Error during screenshot process:', error.message);
    
    if (error.message.includes('ERR_CONNECTION_REFUSED')) {
      console.log('\n💡 Make sure Storybook is running:');
      console.log('   npm run storybook');
      console.log('   Then run this script again');
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

if (require.main === module) {
  takeStorybookScreenshots().catch(console.error);
}

module.exports = { takeStorybookScreenshots };