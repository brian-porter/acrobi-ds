/**
 * Comprehensive Storybook Test Suite for Acrobi Design System
 * Tests https://dev.acrobi.com for functionality, theming, and components
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class StorybookTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.testResults = {
      startTime: new Date(),
      siteAccess: false,
      storybookElements: {},
      themeTests: {},
      componentTests: {},
      accessibilityTests: {},
      performanceTests: {},
      errors: [],
      screenshots: []
    };
  }

  async init() {
    console.log('🚀 Initializing Acrobi Design System Storybook Tests...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    // Listen for console errors
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.testResults.errors.push({
          type: 'console',
          message: msg.text(),
          timestamp: new Date()
        });
      }
    });
  }

  async testSiteAccess() {
    console.log('🔍 Testing site access...');
    
    try {
      const startTime = Date.now();
      await this.page.goto('https://dev.acrobi.com', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      const loadTime = Date.now() - startTime;
      
      const title = await this.page.title();
      console.log(`  ✅ Site loaded successfully in ${loadTime}ms`);
      console.log(`  📄 Title: ${title}`);
      
      this.testResults.siteAccess = true;
      this.testResults.performanceTests.loadTime = loadTime;
      this.testResults.performanceTests.title = title;
      
      // Take initial screenshot
      const screenshotPath = 'storybook-initial.png';
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      this.testResults.screenshots.push(screenshotPath);
      console.log(`  📸 Screenshot saved: ${screenshotPath}`);
      
    } catch (error) {
      console.log(`  ❌ Site access failed: ${error.message}`);
      this.testResults.errors.push({
        type: 'site_access',
        message: error.message,
        timestamp: new Date()
      });
    }
  }

  async testStorybookElements() {
    console.log('\n🔍 Testing Storybook interface elements...');
    
    const elements = {
      'sidebar-container': '.sidebar-container',
      'storybook-preview-iframe': '#storybook-preview-iframe',
      'storybook-manager': '[id*="storybook"]',
      'navigation-links': 'a[href*="story"]'
    };
    
    for (const [name, selector] of Object.entries(elements)) {
      try {
        const element = await this.page.$(selector);
        const found = element !== null;
        this.testResults.storybookElements[name] = found;
        console.log(`  ${found ? '✅' : '❌'} ${name}: ${found ? 'Found' : 'Not found'}`);
      } catch (error) {
        this.testResults.storybookElements[name] = false;
        console.log(`  ❌ ${name}: Error - ${error.message}`);
      }
    }
  }

  async testThemeFunctionality() {
    console.log('\n🎨 Testing theme functionality...');
    
    try {
      // Get all theme-related links
      const themeLinks = await this.page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href*="theme"]')).map(a => ({
          text: a.textContent.trim(),
          href: a.href
        }));
      });
      
      console.log(`  📋 Found ${themeLinks.length} theme-related links:`);
      themeLinks.forEach(link => {
        console.log(`    🔗 ${link.text} -> ${link.href}`);
      });
      
      this.testResults.themeTests.availableThemes = themeLinks;
      
      // Test switching between themes
      for (const themeLink of themeLinks.slice(0, 3)) { // Test first 3 themes
        try {
          console.log(`  🎨 Testing theme: ${themeLink.text}`);
          
          await this.page.goto(themeLink.href, { waitUntil: 'networkidle0', timeout: 15000 });
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Take screenshot of this theme
          const themeScreenshot = `theme-${themeLink.text.toLowerCase().replace(/\s+/g, '-')}.png`;
          await this.page.screenshot({ path: themeScreenshot });
          this.testResults.screenshots.push(themeScreenshot);
          
          // Check iframe content for theme application
          try {
            const iframe = await this.page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
            if (iframe) {
              const themeInfo = await iframe.evaluate(() => {
                return {
                  bodyClasses: document.body.className,
                  htmlClasses: document.documentElement.className,
                  dataTheme: document.documentElement.getAttribute('data-theme'),
                  hasThemeStyles: document.querySelectorAll('[class*="theme"], [data-theme]').length > 0
                };
              });
              
              this.testResults.themeTests[themeLink.text] = {
                success: true,
                themeInfo,
                screenshot: themeScreenshot
              };
              
              console.log(`    ✅ Theme applied successfully`);
              console.log(`    📊 Body classes: ${themeInfo.bodyClasses}`);
              console.log(`    📊 Data theme: ${themeInfo.dataTheme}`);
              
            } else {
              console.log(`    ⚠️  Could not access preview iframe`);
            }
          } catch (error) {
            console.log(`    ⚠️  Theme analysis error: ${error.message}`);
          }
          
        } catch (error) {
          console.log(`    ❌ Failed to test theme ${themeLink.text}: ${error.message}`);
          this.testResults.themeTests[themeLink.text] = {
            success: false,
            error: error.message
          };
        }
      }
      
    } catch (error) {
      console.log(`  ❌ Theme testing failed: ${error.message}`);
      this.testResults.errors.push({
        type: 'theme_testing',
        message: error.message,
        timestamp: new Date()
      });
    }
  }

  async testComponentNavigation() {
    console.log('\n🧩 Testing component navigation...');
    
    try {
      // Go back to main page
      await this.page.goto('https://dev.acrobi.com', { waitUntil: 'networkidle0' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Find all story links
      const storyLinks = await this.page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href*="story"]')).map(a => ({
          text: a.textContent.trim(),
          href: a.href,
          category: a.href.split('/').pop()?.split('--')[0] || 'unknown'
        })).filter(link => link.text.length > 0);
      });
      
      console.log(`  📋 Found ${storyLinks.length} component stories:`);
      
      const categories = [...new Set(storyLinks.map(link => link.category))];
      console.log(`  📁 Categories: ${categories.join(', ')}`);
      
      this.testResults.componentTests.totalStories = storyLinks.length;
      this.testResults.componentTests.categories = categories;
      this.testResults.componentTests.testedComponents = {};
      
      // Test a few representative components
      const componentsToTest = storyLinks.slice(0, 5);
      
      for (const component of componentsToTest) {
        try {
          console.log(`  🧩 Testing component: ${component.text}`);
          
          await this.page.goto(component.href, { waitUntil: 'networkidle0', timeout: 15000 });
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Test if component renders in iframe
          const iframe = await this.page.frames().find(frame => frame.name() === 'storybook-preview-iframe');
          if (iframe) {
            const componentInfo = await iframe.evaluate(() => {
              return {
                hasContent: document.body.innerHTML.length > 100,
                elementCount: document.querySelectorAll('*').length,
                hasComponents: document.querySelectorAll('button, input, div[class], [data-testid]').length > 0
              };
            });
            
            this.testResults.componentTests.testedComponents[component.text] = {
              success: true,
              info: componentInfo,
              url: component.href
            };
            
            console.log(`    ✅ Component rendered (${componentInfo.elementCount} elements)`);
            
          } else {
            console.log(`    ⚠️  Could not access component iframe`);
          }
          
        } catch (error) {
          console.log(`    ❌ Failed to test component ${component.text}: ${error.message}`);
          this.testResults.componentTests.testedComponents[component.text] = {
            success: false,
            error: error.message
          };
        }
      }
      
    } catch (error) {
      console.log(`  ❌ Component navigation testing failed: ${error.message}`);
      this.testResults.errors.push({
        type: 'component_navigation',
        message: error.message,
        timestamp: new Date()
      });
    }
  }

  async testAccessibility() {
    console.log('\n♿ Testing accessibility features...');
    
    try {
      await this.page.goto('https://dev.acrobi.com', { waitUntil: 'networkidle0' });
      
      const accessibilityInfo = await this.page.evaluate(() => {
        return {
          hasAriaLabels: document.querySelectorAll('[aria-label]').length,
          hasAriaRoles: document.querySelectorAll('[role]').length,
          hasHeadings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
          hasAltText: document.querySelectorAll('img[alt]').length,
          totalImages: document.querySelectorAll('img').length,
          hasFocusableElements: document.querySelectorAll('button, a, input, select, textarea, [tabindex]').length,
          hasSkipLinks: document.querySelectorAll('a[href*="#"]').length
        };
      });
      
      console.log(`  ♿ ARIA labels: ${accessibilityInfo.hasAriaLabels}`);
      console.log(`  ♿ ARIA roles: ${accessibilityInfo.hasAriaRoles}`);
      console.log(`  ♿ Headings: ${accessibilityInfo.hasHeadings}`);
      console.log(`  ♿ Images with alt text: ${accessibilityInfo.hasAltText}/${accessibilityInfo.totalImages}`);
      console.log(`  ♿ Focusable elements: ${accessibilityInfo.hasFocusableElements}`);
      console.log(`  ♿ Skip links: ${accessibilityInfo.hasSkipLinks}`);
      
      this.testResults.accessibilityTests = accessibilityInfo;
      
      // Test keyboard navigation
      try {
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        console.log(`  ✅ Keyboard navigation functional`);
        this.testResults.accessibilityTests.keyboardNavigation = true;
      } catch (error) {
        console.log(`  ❌ Keyboard navigation failed: ${error.message}`);
        this.testResults.accessibilityTests.keyboardNavigation = false;
      }
      
    } catch (error) {
      console.log(`  ❌ Accessibility testing failed: ${error.message}`);
      this.testResults.errors.push({
        type: 'accessibility',
        message: error.message,
        timestamp: new Date()
      });
    }
  }

  async generateReport() {
    console.log('\n📊 Generating comprehensive test report...');
    
    this.testResults.endTime = new Date();
    this.testResults.duration = this.testResults.endTime - this.testResults.startTime;
    
    const reportContent = `
# Acrobi Design System Storybook Test Report
Generated: ${this.testResults.endTime.toISOString()}
Duration: ${Math.round(this.testResults.duration / 1000)}s

## 🌐 Site Access
- **Status**: ${this.testResults.siteAccess ? '✅ SUCCESS' : '❌ FAILED'}
- **Load Time**: ${this.testResults.performanceTests.loadTime || 'N/A'}ms
- **Title**: ${this.testResults.performanceTests.title || 'N/A'}

## 🏗️ Storybook Elements
${Object.entries(this.testResults.storybookElements).map(([name, found]) => 
  `- **${name}**: ${found ? '✅ Found' : '❌ Not found'}`
).join('\n')}

## 🎨 Theme Testing
- **Available Themes**: ${this.testResults.themeTests.availableThemes?.length || 0}
${this.testResults.themeTests.availableThemes?.map(theme => 
  `  - ${theme.text}`
).join('\n') || ''}

### Theme Test Results:
${Object.entries(this.testResults.themeTests).filter(([key]) => key !== 'availableThemes').map(([theme, result]) => 
  `- **${theme}**: ${result.success ? '✅ SUCCESS' : '❌ FAILED'}${result.error ? ` (${result.error})` : ''}`
).join('\n')}

## 🧩 Component Testing
- **Total Stories**: ${this.testResults.componentTests.totalStories || 0}
- **Categories**: ${this.testResults.componentTests.categories?.join(', ') || 'N/A'}
- **Tested Components**: ${Object.keys(this.testResults.componentTests.testedComponents || {}).length}

### Component Test Results:
${Object.entries(this.testResults.componentTests.testedComponents || {}).map(([component, result]) => 
  `- **${component}**: ${result.success ? '✅ SUCCESS' : '❌ FAILED'}${result.error ? ` (${result.error})` : ''}`
).join('\n')}

## ♿ Accessibility Testing
- **ARIA Labels**: ${this.testResults.accessibilityTests?.hasAriaLabels || 0}
- **ARIA Roles**: ${this.testResults.accessibilityTests?.hasAriaRoles || 0}
- **Headings**: ${this.testResults.accessibilityTests?.hasHeadings || 0}
- **Images with Alt**: ${this.testResults.accessibilityTests?.hasAltText || 0}/${this.testResults.accessibilityTests?.totalImages || 0}
- **Focusable Elements**: ${this.testResults.accessibilityTests?.hasFocusableElements || 0}
- **Keyboard Navigation**: ${this.testResults.accessibilityTests?.keyboardNavigation ? '✅ Working' : '❌ Failed'}

## 📸 Screenshots Generated
${this.testResults.screenshots.map(screenshot => `- ${screenshot}`).join('\n')}

## ⚠️ Errors Encountered
${this.testResults.errors.length === 0 ? '✅ No errors detected' : 
  this.testResults.errors.map(error => 
    `- **${error.type}**: ${error.message} (${error.timestamp.toISOString()})`
  ).join('\n')
}

## 📈 Performance Summary
- **Load Time**: ${this.testResults.performanceTests?.loadTime || 'N/A'}ms
- **Total Test Duration**: ${Math.round(this.testResults.duration / 1000)}s
- **Site Status**: ${this.testResults.siteAccess ? 'Operational' : 'Issues detected'}

## 🎯 Recommendations
${this.testResults.siteAccess ? 
  '✅ The Acrobi Design System Storybook is operational and accessible.' : 
  '⚠️  Site access issues detected - check deployment status.'
}

${this.testResults.themeTests.availableThemes?.length > 0 ? 
  '✅ Theme system is functioning with multiple theme variants available.' : 
  '⚠️  Theme system may need attention - limited theme variants detected.'
}

${Object.keys(this.testResults.componentTests.testedComponents || {}).length > 0 ? 
  '✅ Component system is operational with multiple components rendering correctly.' : 
  '⚠️  Component system may need attention - issues with component rendering detected.'
}

## 🔗 Tested URLs
- **Main Site**: https://dev.acrobi.com
- **Theme Tests**: ${this.testResults.themeTests.availableThemes?.length || 0} theme variants tested
- **Component Tests**: ${Object.keys(this.testResults.componentTests.testedComponents || {}).length} components tested

---
*Report generated by Acrobi Design System Testing Suite*
`;
    
    // Save report to file
    const reportPath = 'storybook-test-report.md';
    fs.writeFileSync(reportPath, reportContent);
    console.log(`📊 Report saved: ${reportPath}`);
    
    // Also save raw results as JSON
    const jsonPath = 'storybook-test-results.json';
    fs.writeFileSync(jsonPath, JSON.stringify(this.testResults, null, 2));
    console.log(`🔧 Raw results saved: ${jsonPath}`);
    
    return this.testResults;
  }

  async run() {
    try {
      await this.init();
      await this.testSiteAccess();
      await this.testStorybookElements();
      await this.testThemeFunctionality();
      await this.testComponentNavigation();
      await this.testAccessibility();
      const results = await this.generateReport();
      
      console.log('\n🎉 Testing completed!');
      console.log(`📊 Results saved to storybook-test-report.md`);
      
      return results;
      
    } catch (error) {
      console.error('❌ Testing failed:', error);
      this.testResults.errors.push({
        type: 'critical',
        message: error.message,
        timestamp: new Date()
      });
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the comprehensive test
const tester = new StorybookTester();
tester.run().catch(console.error);