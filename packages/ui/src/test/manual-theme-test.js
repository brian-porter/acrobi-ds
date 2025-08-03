/**
 * Manual BlueQueue Theme Test
 * Direct test of BlueQueue theme application
 */

const puppeteer = require('puppeteer');

class ManualThemeTest {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🧪 Manual BlueQueue theme test...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async testDirectThemeApplication() {
    console.log('🎨 Testing direct theme application...');
    
    try {
      // Navigate to a simple button story
      await this.page.goto('http://localhost:6006/?path=/story/primitives-button--default', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      await new Promise(resolve => setTimeout(resolve, 3000));

      // Get the preview iframe
      const iframes = await this.page.frames();
      const previewFrame = iframes.find(frame => 
        frame.name() === 'storybook-preview-iframe'
      );

      if (previewFrame) {
        console.log('  ✅ Found preview iframe');
        
        // Inject BlueQueue theme directly into the iframe
        const themeTestResult = await previewFrame.evaluate(() => {
          // Add the data-theme attribute to activate BlueQueue theme
          document.documentElement.setAttribute('data-theme', 'bluequeue');
          document.body.setAttribute('data-theme', 'bluequeue');
          
          // Create test buttons with proper attributes
          const testContainer = document.createElement('div');
          testContainer.setAttribute('data-theme', 'bluequeue');
          testContainer.style.padding = '20px';
          testContainer.style.backgroundColor = 'rgb(255, 254, 255)';
          
          // Create buttons with Webflow data attributes
          const buttons = [
            { style: 'pf', text: 'Primary Filled', size: 'm' },
            { style: 'pl', text: 'Primary Line', size: 'm' },
            { style: 'pt', text: 'Primary Text', size: 'm' },
            { style: 'nf', text: 'Neutral Filled', size: 'm' }
          ];
          
          buttons.forEach((btnConfig, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.setAttribute('data-btn-style', btnConfig.style);
            btn.setAttribute('data-btn-size', btnConfig.size);
            btn.textContent = btnConfig.text;
            btn.style.margin = '8px';
            testContainer.appendChild(btn);
          });
          
          // Add test input
          const input = document.createElement('input');
          input.type = 'text';
          input.placeholder = 'Test input';
          input.style.margin = '8px';
          input.style.display = 'block';
          testContainer.appendChild(input);
          
          // Add test heading
          const heading = document.createElement('h3');
          heading.textContent = 'BlueQueue Theme Test';
          heading.style.margin = '16px 8px 8px 8px';
          testContainer.insertBefore(heading, testContainer.firstChild);
          
          document.body.appendChild(testContainer);
          
          // Wait a moment for styles to apply
          return new Promise(resolve => {
            setTimeout(() => {
              // Analyze the styled elements
              const styledButtons = document.querySelectorAll('[data-btn-style]');
              const styledInput = document.querySelector('input');
              const styledHeading = document.querySelector('h3');
              
              const buttonStyles = [];
              styledButtons.forEach((btn, index) => {
                const styles = window.getComputedStyle(btn);
                buttonStyles.push({
                  text: btn.textContent,
                  style: btn.getAttribute('data-btn-style'),
                  fontFamily: styles.fontFamily,
                  fontSize: styles.fontSize,
                  backgroundColor: styles.backgroundColor,
                  color: styles.color,
                  borderRadius: styles.borderRadius,
                  padding: styles.padding
                });
              });
              
              const inputStyles = styledInput ? {
                fontFamily: window.getComputedStyle(styledInput).fontFamily,
                fontSize: window.getComputedStyle(styledInput).fontSize,
                borderColor: window.getComputedStyle(styledInput).borderColor,
                padding: window.getComputedStyle(styledInput).padding
              } : null;
              
              const headingStyles = styledHeading ? {
                fontFamily: window.getComputedStyle(styledHeading).fontFamily,
                fontSize: window.getComputedStyle(styledHeading).fontSize,
                color: window.getComputedStyle(styledHeading).color
              } : null;
              
              resolve({
                buttons: buttonStyles,
                input: inputStyles,
                heading: headingStyles,
                themeAttribute: document.documentElement.getAttribute('data-theme')
              });
            }, 500);
          });
        });

        console.log('  📊 BlueQueue Theme Test Results:');
        console.log(`    Theme Attribute: ${themeTestResult.themeAttribute}`);
        
        if (themeTestResult.buttons && themeTestResult.buttons.length > 0) {
          console.log('  🔘 Button Styling:');
          themeTestResult.buttons.forEach((btn, index) => {
            console.log(`    ${btn.style.toUpperCase()}: "${btn.text}"`);
            console.log(`      Font: ${btn.fontFamily}`);
            console.log(`      Size: ${btn.fontSize}`);
            console.log(`      Background: ${btn.backgroundColor}`);
            console.log(`      Color: ${btn.color}`);
            console.log(`      Border Radius: ${btn.borderRadius}`);
            console.log(`      Padding: ${btn.padding}`);
            console.log('');
          });
        }
        
        if (themeTestResult.input) {
          console.log('  📝 Input Styling:');
          console.log(`    Font: ${themeTestResult.input.fontFamily}`);
          console.log(`    Size: ${themeTestResult.input.fontSize}`);
          console.log(`    Border: ${themeTestResult.input.borderColor}`);
          console.log(`    Padding: ${themeTestResult.input.padding}`);
          console.log('');
        }
        
        if (themeTestResult.heading) {
          console.log('  📰 Heading Styling:');
          console.log(`    Font: ${themeTestResult.heading.fontFamily}`);
          console.log(`    Size: ${themeTestResult.heading.fontSize}`);
          console.log(`    Color: ${themeTestResult.heading.color}`);
          console.log('');
        }
        
        // Check for Webflow characteristics
        const hasInterFont = themeTestResult.buttons.some(btn => 
          btn.fontFamily.includes('Inter') || btn.fontFamily.includes('SF Pro')
        );
        const hasWebflowColors = themeTestResult.buttons.some(btn => 
          btn.backgroundColor.includes('48, 47, 44') ||
          btn.backgroundColor.includes('196, 196, 196') ||
          btn.color.includes('255, 254, 255')
        );
        const hasWebflowSizes = themeTestResult.buttons.some(btn => 
          btn.fontSize === '12px' || btn.fontSize === '0.75rem'
        );
        const hasWebflowBorderRadius = themeTestResult.buttons.some(btn => 
          btn.borderRadius === '4px'
        );
        
        console.log('  🎯 Webflow Characteristics:');
        console.log(`    Inter/SF Pro Font: ${hasInterFont ? '✅' : '❌'}`);
        console.log(`    Webflow Colors: ${hasWebflowColors ? '✅' : '❌'}`);
        console.log(`    Webflow Font Sizes: ${hasWebflowSizes ? '✅' : '❌'}`);
        console.log(`    Webflow Border Radius: ${hasWebflowBorderRadius ? '✅' : '❌'}`);
        
        const isThemeWorking = hasInterFont && hasWebflowColors && hasWebflowSizes && hasWebflowBorderRadius;
        console.log(`  ${isThemeWorking ? '✅' : '❌'} BlueQueue Theme Working: ${isThemeWorking ? 'YES' : 'NO'}`);
        
        // Take screenshot of the result
        await this.page.screenshot({ 
          path: 'bluequeue-manual-test.png',
          fullPage: true 
        });
        
        return { themeTestResult, isThemeWorking };
        
      } else {
        console.log('  ❌ Could not find preview iframe');
        return null;
      }

    } catch (error) {
      console.log(`  ❌ Manual theme test failed: ${error.message}`);
      return null;
    }
  }

  async run() {
    try {
      await this.init();
      const results = await this.testDirectThemeApplication();
      
      console.log('\n🎉 Manual theme test completed!');
      console.log('📸 Screenshot saved: bluequeue-manual-test.png');
      
      if (results?.isThemeWorking) {
        console.log('\n🚀 SUCCESS: BlueQueue theme is working correctly!');
        console.log('   The theme successfully applies Webflow styling to components.');
      } else {
        console.log('\n❌ ISSUE: BlueQueue theme needs adjustment.');
        console.log('   Check the CSS specificity and theme selectors.');
      }
      
      return results;
      
    } catch (error) {
      console.error('❌ Manual theme test failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the test
const tester = new ManualThemeTest();
tester.run().catch(console.error);