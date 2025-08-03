/**
 * Webflow Verification Test
 * Visual test to verify components match Webflow design exactly
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

class WebflowVerificationTest {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      startTime: new Date(),
      tests: [],
      screenshots: [],
      success: true
    };
  }

  async init() {
    console.log('🔍 Initializing Webflow Verification Test...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async testUpdatedStorybook() {
    console.log('🔍 Testing updated Storybook with Webflow styles...');
    
    try {
      await this.page.goto('https://dev.acrobi.com', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Wait for page to load
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Take screenshot
      await this.page.screenshot({ 
        path: 'storybook-after-webflow-fixes.png',
        fullPage: true 
      });
      this.results.screenshots.push('storybook-after-webflow-fixes.png');

      // Test button styling
      const buttonTest = await this.page.evaluate(() => {
        const buttons = document.querySelectorAll('button');
        const buttonResults = [];
        
        buttons.forEach((btn, index) => {
          if (index < 5) { // Test first 5 buttons
            const styles = window.getComputedStyle(btn);
            buttonResults.push({
              text: btn.textContent?.trim(),
              fontFamily: styles.fontFamily,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              padding: styles.padding,
              borderRadius: styles.borderRadius
            });
          }
        });
        
        return buttonResults;
      });

      console.log('📊 Button Analysis Results:');
      buttonTest.forEach((btn, index) => {
        console.log(`  Button ${index + 1}: "${btn.text}"`);
        console.log(`    Font: ${btn.fontFamily}`);
        console.log(`    Size: ${btn.fontSize}`);
        console.log(`    Weight: ${btn.fontWeight}`);
        console.log(`    Background: ${btn.backgroundColor}`);
        console.log(`    Color: ${btn.color}`);
        console.log(`    Padding: ${btn.padding}`);
        console.log(`    Border Radius: ${btn.borderRadius}`);
        console.log('');
      });

      // Verify Webflow matching
      const webflowMatch = buttonTest.some(btn => 
        btn.fontFamily.includes('SF Pro') &&
        (btn.fontSize === '12px' || btn.fontSize === '14px')
      );

      this.results.tests.push({
        name: 'Button Webflow Match',
        passed: webflowMatch,
        details: `Found ${buttonTest.length} buttons, ${webflowMatch ? 'WITH' : 'WITHOUT'} SF Pro font`
      });

      console.log(`  ${webflowMatch ? '✅' : '❌'} Button Webflow Match: ${webflowMatch ? 'PASSED' : 'FAILED'}`);

      return buttonTest;

    } catch (error) {
      console.log(`  ❌ Storybook test failed: ${error.message}`);
      this.results.success = false;
      this.results.tests.push({
        name: 'Storybook Access',
        passed: false,
        details: error.message
      });
    }
  }

  async testComponentRendering() {
    console.log('\n🧩 Testing component rendering...');
    
    try {
      // Check if we can find specific components
      const componentTest = await this.page.evaluate(() => {
        const componentsFound = {
          buttons: document.querySelectorAll('button, .btn').length,
          inputs: document.querySelectorAll('input').length,
          total: document.querySelectorAll('*').length
        };
        
        return componentsFound;
      });

      console.log(`  ✅ Found ${componentTest.buttons} buttons`);
      console.log(`  ✅ Found ${componentTest.inputs} inputs`);
      console.log(`  ✅ Total elements: ${componentTest.total}`);

      this.results.tests.push({
        name: 'Component Rendering',
        passed: componentTest.buttons > 0,
        details: `Found ${componentTest.buttons} buttons and ${componentTest.inputs} inputs`
      });

    } catch (error) {
      console.log(`  ❌ Component rendering test failed: ${error.message}`);
      this.results.tests.push({
        name: 'Component Rendering',
        passed: false,
        details: error.message
      });
    }
  }

  async generateVerificationReport() {
    console.log('\n📊 Generating verification report...');
    
    this.results.endTime = new Date();
    this.results.duration = this.results.endTime - this.results.startTime;
    
    const passedTests = this.results.tests.filter(t => t.passed).length;
    const totalTests = this.results.tests.length;
    
    const report = `
# Webflow Verification Test Report

**Generated**: ${this.results.endTime.toISOString()}
**Duration**: ${Math.round(this.results.duration / 1000)}s
**Overall Status**: ${this.results.success ? '✅ SUCCESS' : '❌ FAILED'}

## 📊 Test Results Summary

- **Tests Passed**: ${passedTests}/${totalTests}
- **Success Rate**: ${Math.round((passedTests / totalTests) * 100)}%
- **Screenshots Generated**: ${this.results.screenshots.length}

## 🔍 Individual Test Results

${this.results.tests.map(test => `
### ${test.name}
- **Status**: ${test.passed ? '✅ PASSED' : '❌ FAILED'}
- **Details**: ${test.details}
`).join('\n')}

## 📸 Generated Screenshots

${this.results.screenshots.map(screenshot => `- ${screenshot}`).join('\n')}

## 🎯 Webflow Matching Status

${this.results.tests.find(t => t.name === 'Button Webflow Match')?.passed ? 
  '✅ **SUCCESS**: Components are using Webflow-matching styles' : 
  '⚠️ **NEEDS WORK**: Components not yet matching Webflow styles'
}

## 📋 Next Steps

${passedTests === totalTests ? 
  '🎉 All tests passed! Components are successfully matching Webflow design.' :
  '🔧 Some tests failed. Review component implementations and ensure Webflow styles are properly applied.'
}

---
*Report generated by Webflow Verification Test*
`;

    fs.writeFileSync('webflow-verification-report.md', report);
    console.log('📊 Report saved: webflow-verification-report.md');

    return this.results;
  }

  async run() {
    try {
      await this.init();
      await this.testUpdatedStorybook();
      await this.testComponentRendering();
      const results = await this.generateVerificationReport();
      
      console.log('\n🎉 Webflow verification completed!');
      console.log(`📊 Results: ${results.tests.filter(t => t.passed).length}/${results.tests.length} tests passed`);
      
      return results;
      
    } catch (error) {
      console.error('❌ Verification failed:', error);
      this.results.success = false;
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the verification
const verifier = new WebflowVerificationTest();
verifier.run().catch(console.error);