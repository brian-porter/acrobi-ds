#!/usr/bin/env node

/**
 * Storybook Button Analysis with Puppeteer
 * Analyzes button component text color issues in local Storybook
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function analyzeButtonsInStorybook() {
  console.log('🚀 Starting Puppeteer analysis of Storybook buttons...\n');
  
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: false, // Set to true for headless mode
      defaultViewport: { width: 1280, height: 1024 }
    });
    
    const page = await browser.newPage();
    
    // Navigate to local Storybook
    console.log('📍 Navigating to local Storybook...');
    const storybookUrl = 'http://localhost:6006';
    
    try {
      await page.goto(storybookUrl, { waitUntil: 'networkidle0', timeout: 10000 });
    } catch (error) {
      console.error('❌ Cannot connect to Storybook. Please ensure it\'s running with: npm run storybook');
      console.error('   Expected URL:', storybookUrl);
      return;
    }
    
    console.log('✅ Successfully connected to Storybook\n');
    
    // Navigate to button stories
    console.log('🔍 Looking for button component stories...');
    
    // Wait for Storybook to load and find button stories
    await page.waitForTimeout(2000);
    
    // Try to find button stories in the sidebar
    const buttonStorySelectors = [
      'a[data-item-id="primitives-button--primary"]',
      'a[data-item-id="primitives-button--default"]',
      'a[data-item-id="button--primary"]',
      'a[data-item-id="button--default"]',
      '[data-testid="button"] a',
      'text=Button'
    ];
    
    let buttonStoryFound = false;
    for (const selector of buttonStorySelectors) {
      try {
        if (selector.startsWith('text=')) {
          await page.click(`text=${selector.slice(5)}`);
        } else {
          await page.click(selector);
        }
        buttonStoryFound = true;
        console.log(`✅ Found button story with selector: ${selector}`);
        break;
      } catch (error) {
        // Try next selector
        continue;
      }
    }
    
    if (!buttonStoryFound) {
      console.log('⚠️  Could not find button story automatically. Looking for any buttons...');
      
      // Search for any buttons in the main canvas
      await page.waitForTimeout(2000);
    }
    
    // Wait for the story to load
    await page.waitForTimeout(3000);
    
    // Switch to the canvas iframe where the actual components are rendered
    console.log('🎯 Switching to canvas iframe...');
    const frameHandle = await page.waitForSelector('iframe[data-is-root="false"]', { timeout: 5000 });
    const frame = await frameHandle.contentFrame();
    
    if (!frame) {
      console.error('❌ Could not access Storybook canvas iframe');
      return;
    }
    
    // Test different themes
    const themes = ['acrobi', 'bluequeue'];
    const buttonAnalysis = {};
    
    for (const theme of themes) {
      console.log(`\n🎨 Analyzing buttons in ${theme} theme...`);
      
      // Switch theme by clicking the theme selector in Storybook toolbar
      try {
        // Go back to main page to access toolbar
        const toolbar = await page.$('[title*="Theme"]');
        if (toolbar) {
          await toolbar.click();
          await page.waitForTimeout(500);
          
          // Look for theme option
          const themeOption = await page.$(`[title*="${theme}"]`);
          if (themeOption) {
            await themeOption.click();
            await page.waitForTimeout(1000);
          }
        }
      } catch (error) {
        console.log(`⚠️  Could not switch to ${theme} theme via toolbar`);
      }
      
      // Analyze buttons in the current theme
      const buttons = await frame.$$('button, [data-btn-style], .btn, [class*="button"]');
      
      console.log(`   Found ${buttons.length} button elements`);
      
      buttonAnalysis[theme] = [];
      
      for (let i = 0; i < Math.min(buttons.length, 10); i++) {
        const button = buttons[i];
        
        try {
          const buttonInfo = await frame.evaluate((btn) => {
            const computedStyle = window.getComputedStyle(btn);
            const rect = btn.getBoundingClientRect();
            
            return {
              text: btn.textContent?.trim() || btn.innerText?.trim() || '',
              backgroundColor: computedStyle.backgroundColor,
              color: computedStyle.color,
              className: btn.className,
              dataAttributes: {
                btnStyle: btn.getAttribute('data-btn-style'),
                btnSize: btn.getAttribute('data-btn-size'),
                theme: btn.closest('[data-theme]')?.getAttribute('data-theme')
              },
              cssVariables: {
                primary: computedStyle.getPropertyValue('--color--p500'),
                n000: computedStyle.getPropertyValue('--color--n000'),
                n999: computedStyle.getPropertyValue('--color--n999'),
                primaryForeground: computedStyle.getPropertyValue('--primary-foreground')
              },
              isVisible: rect.width > 0 && rect.height > 0,
              width: rect.width,
              height: rect.height
            };
          }, button);
          
          if (buttonInfo.isVisible && buttonInfo.text) {
            buttonAnalysis[theme].push(buttonInfo);
            
            // Check for text color issues
            const hasTextColorIssue = this.detectTextColorIssue(buttonInfo);
            
            console.log(`   Button "${buttonInfo.text}":`);
            console.log(`     Style: ${buttonInfo.dataAttributes.btnStyle || 'none'}`);
            console.log(`     Background: ${buttonInfo.backgroundColor}`);
            console.log(`     Text Color: ${buttonInfo.color}`);
            console.log(`     --color--n000: ${buttonInfo.cssVariables.n000}`);
            console.log(`     --primary-foreground: ${buttonInfo.cssVariables.primaryForeground}`);
            
            if (hasTextColorIssue) {
              console.log(`     ⚠️  ISSUE: Dark background with dark text detected!`);
            }
          }
        } catch (error) {
          console.log(`   ⚠️  Could not analyze button ${i + 1}:`, error.message);
        }
      }
    }
    
    // Generate recommendations
    console.log('\n📋 Analysis Complete - Generating Recommendations...');
    this.generateButtonFixRecommendations(buttonAnalysis);
    
    // Take screenshots for reference
    console.log('\n📸 Taking screenshots...');
    await this.takeButtonScreenshots(page, frame);
    
  } catch (error) {
    console.error('❌ Error during Puppeteer analysis:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function detectTextColorIssue(buttonInfo) {
  // Parse RGB values
  const parseRgb = (rgbString) => {
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
  };
  
  const bgRgb = parseRgb(buttonInfo.backgroundColor);
  const textRgb = parseRgb(buttonInfo.color);
  
  if (!bgRgb || !textRgb) return false;
  
  // Calculate luminance
  const getLuminance = ([r, g, b]) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const bgLuminance = getLuminance(bgRgb);
  const textLuminance = getLuminance(textRgb);
  
  // Calculate contrast ratio
  const contrastRatio = (Math.max(bgLuminance, textLuminance) + 0.05) / 
                       (Math.min(bgLuminance, textLuminance) + 0.05);
  
  // WCAG AA requires 4.5:1 for normal text
  return contrastRatio < 4.5;
}

function generateButtonFixRecommendations(buttonAnalysis) {
  const issues = [];
  
  Object.entries(buttonAnalysis).forEach(([theme, buttons]) => {
    buttons.forEach(button => {
      if (this.detectTextColorIssue(button)) {
        issues.push({
          theme,
          button: button.text,
          style: button.dataAttributes.btnStyle,
          issue: 'Low contrast text on dark background',
          currentTextColor: button.color,
          currentBgColor: button.backgroundColor,
          recommendedFix: 'Use --primary-foreground or --color--n000 for text color'
        });
      }
    });
  });
  
  if (issues.length > 0) {
    console.log(`\n🔧 Found ${issues.length} button text color issues:`);
    
    issues.forEach((issue, index) => {
      console.log(`\n${index + 1}. ${issue.theme} theme - "${issue.button}" button:`);
      console.log(`   Issue: ${issue.issue}`);
      console.log(`   Current: ${issue.currentTextColor} on ${issue.currentBgColor}`);
      console.log(`   Fix: ${issue.recommendedFix}`);
    });
    
    console.log('\n💡 Recommended CSS fixes:');
    console.log(`
/* Fix button text colors to use semantic variables */
[data-btn-style="pf"] {
  color: var(--primary-foreground) !important;
}

[data-btn-style="sf"] {
  color: var(--secondary-foreground) !important;
}

[data-btn-style="nf"] {
  color: var(--color--n000) !important;
}

/* Ensure all filled buttons use appropriate foreground colors */
[data-btn-style$="f"] {
  color: var(--primary-foreground);
}
`);
  } else {
    console.log('\n✅ No button text color issues detected!');
  }
}

async function takeButtonScreenshots(page, frame) {
  const screenshotDir = './screenshots';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }
  
  try {
    await page.screenshot({ 
      path: path.join(screenshotDir, 'storybook-buttons-analysis.png'),
      fullPage: true 
    });
    console.log('✅ Screenshot saved: screenshots/storybook-buttons-analysis.png');
  } catch (error) {
    console.log('⚠️  Could not take screenshot:', error.message);
  }
}

// Bind methods to the global scope for this context
analyzeButtonsInStorybook.detectTextColorIssue = detectTextColorIssue;
analyzeButtonsInStorybook.generateButtonFixRecommendations = generateButtonFixRecommendations;
analyzeButtonsInStorybook.takeButtonScreenshots = takeButtonScreenshots;

// Run the analysis
if (require.main === module) {
  analyzeButtonsInStorybook().catch(console.error);
}

module.exports = { analyzeButtonsInStorybook };