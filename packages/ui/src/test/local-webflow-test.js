/**
 * Local Webflow Verification Test
 * Quick test to verify Webflow components are working on localhost
 */

const puppeteer = require('puppeteer');

class LocalWebflowTest {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🔍 Testing Webflow components on localhost:6006...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async testWebflowShowcase() {
    console.log('🎨 Testing Webflow Matching Showcase...');
    
    try {
      // Navigate to the Webflow showcase story
      await this.page.goto('http://localhost:6006/?path=/story/webflow-matching-component-showcase--webflow-button-showcase', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      await new Promise(resolve => setTimeout(resolve, 3000));

      // Take screenshot
      await this.page.screenshot({ 
        path: 'local-webflow-showcase.png',
        fullPage: true 
      });

      // Find the preview iframe
      const iframes = await this.page.frames();
      const previewFrame = iframes.find(frame => 
        frame.name() === 'storybook-preview-iframe'
      );

      if (previewFrame) {
        console.log('  ✅ Found Storybook preview iframe');
        
        // Test components in iframe
        const showcaseTest = await previewFrame.evaluate(() => {
          // Look for our Webflow showcase content
          const buttons = document.querySelectorAll('button, .btn');
          const headings = document.querySelectorAll('h1, h2, h3, h4');
          const colorSwatches = document.querySelectorAll('[style*="background"]');
          
          // Check for Inter/SF Pro font
          const sampleButton = document.querySelector('button');
          const buttonFont = sampleButton ? 
            window.getComputedStyle(sampleButton).fontFamily : '';
          
          // Check for Webflow-specific attributes
          const webflowButtons = document.querySelectorAll('[data-btn-style]');
          
          return {
            components: {
              buttons: buttons.length,
              headings: headings.length,
              colorSwatches: colorSwatches.length,
              webflowButtons: webflowButtons.length
            },
            styling: {
              buttonFont,
              hasInter: buttonFont.includes('Inter'),
              hasSFPro: buttonFont.includes('SF Pro'),
              hasWebflowAttrs: webflowButtons.length > 0
            },
            showcase: {
              hasContent: buttons.length > 5 && headings.length > 2,
              likelyWebflowShowcase: buttons.length > 10 && colorSwatches.length > 3
            }
          };
        });

        console.log('  📊 Webflow Showcase Analysis:');
        console.log(`    Buttons: ${showcaseTest.components.buttons}`);
        console.log(`    Headings: ${showcaseTest.components.headings}`);
        console.log(`    Color Swatches: ${showcaseTest.components.colorSwatches}`);
        console.log(`    Webflow Buttons: ${showcaseTest.components.webflowButtons}`);
        console.log(`    Button Font: ${showcaseTest.styling.buttonFont}`);
        console.log(`    Using Inter: ${showcaseTest.styling.hasInter ? '✅' : '❌'}`);
        console.log(`    Using SF Pro: ${showcaseTest.styling.hasSFPro ? '✅' : '❌'}`);
        console.log(`    Has Webflow Attrs: ${showcaseTest.styling.hasWebflowAttrs ? '✅' : '❌'}`);

        const isWorkingShowcase = showcaseTest.showcase.likelyWebflowShowcase && 
          (showcaseTest.styling.hasInter || showcaseTest.styling.hasSFPro);
        
        console.log(`  ${isWorkingShowcase ? '✅' : '❌'} Webflow Showcase Working: ${isWorkingShowcase ? 'YES' : 'NO'}`);
        
        return showcaseTest;
        
      } else {
        console.log('  ❌ Could not find Storybook preview iframe');
        return null;
      }

    } catch (error) {
      console.log(`  ❌ Showcase test failed: ${error.message}`);
      return null;
    }
  }

  async testButtonComponents() {
    console.log('\n🔘 Testing Button Components...');
    
    try {
      // Navigate to button story
      await this.page.goto('http://localhost:6006/?path=/story/primitives-button--default', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Find the preview iframe
      const iframes = await this.page.frames();
      const previewFrame = iframes.find(frame => 
        frame.name() === 'storybook-preview-iframe'
      );

      if (previewFrame) {
        // Test button styling in iframe
        const buttonTest = await previewFrame.evaluate(() => {
          const buttons = document.querySelectorAll('button, .btn');
          
          if (buttons.length === 0) return { buttons: [], webflowStyling: false };
          
          const buttonData = [];
          buttons.forEach((btn, index) => {
            if (index < 3) { // Test first 3 buttons
              const styles = window.getComputedStyle(btn);
              buttonData.push({
                text: btn.textContent?.trim(),
                fontFamily: styles.fontFamily,
                fontSize: styles.fontSize,
                backgroundColor: styles.backgroundColor,
                btnStyle: btn.getAttribute('data-btn-style'),
                btnSize: btn.getAttribute('data-btn-size')
              });
            }
          });
          
          // Check if any button has Webflow styling
          const webflowStyling = buttonData.some(btn => 
            btn.fontFamily.includes('Inter') || 
            btn.fontFamily.includes('SF Pro') ||
            btn.btnStyle !== null
          );
          
          return { buttons: buttonData, webflowStyling };
        });

        console.log('  📊 Button Component Analysis:');
        buttonTest.buttons.forEach((btn, index) => {
          console.log(`    Button ${index + 1}: "${btn.text}"`);
          console.log(`      Font: ${btn.fontFamily}`);
          console.log(`      Size: ${btn.fontSize}`);
          console.log(`      Background: ${btn.backgroundColor}`);
          console.log(`      Webflow Attrs: style="${btn.btnStyle}", size="${btn.btnSize}"`);
        });

        console.log(`  ${buttonTest.webflowStyling ? '✅' : '❌'} Webflow Button Styling: ${buttonTest.webflowStyling ? 'ACTIVE' : 'NOT ACTIVE'}`);
        
        return buttonTest;
        
      } else {
        console.log('  ❌ Could not find Storybook preview iframe');
        return null;
      }

    } catch (error) {
      console.log(`  ❌ Button test failed: ${error.message}`);
      return null;
    }
  }

  async run() {
    try {
      await this.init();
      const showcaseResults = await this.testWebflowShowcase();
      const buttonResults = await this.testButtonComponents();
      
      console.log('\n🎉 Local Webflow verification completed!');
      
      const showcaseWorking = showcaseResults?.showcase?.likelyWebflowShowcase && 
        (showcaseResults?.styling?.hasInter || showcaseResults?.styling?.hasSFPro);
      const buttonStyling = buttonResults?.webflowStyling;
      
      console.log('\n📋 SUMMARY:');
      console.log(`  📊 Webflow Showcase: ${showcaseWorking ? '✅ WORKING' : '❌ NOT FOUND'}`);
      console.log(`  🔘 Button Styling: ${buttonStyling ? '✅ ACTIVE' : '❌ NOT ACTIVE'}`);
      console.log(`  📸 Screenshots: local-webflow-showcase.png`);
      
      if (showcaseWorking && buttonStyling) {
        console.log('\n🚀 SUCCESS: Webflow matching components are working locally!');
        console.log('   Visit http://localhost:6006/?path=/story/webflow-matching-component-showcase--webflow-button-showcase to see them.');
      } else if (showcaseWorking || buttonStyling) {
        console.log('\n⚠️ PARTIAL: Some Webflow components are working, check the details above.');
      } else {
        console.log('\n❌ FAILED: Webflow components may not be loaded properly.');
      }
      
      return { showcaseResults, buttonResults };
      
    } catch (error) {
      console.error('❌ Local verification failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the test
const tester = new LocalWebflowTest();
tester.run().catch(console.error);