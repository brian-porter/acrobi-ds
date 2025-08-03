/**
 * Component Iframe Test
 * Tests components specifically in the Storybook preview iframe
 */

const puppeteer = require('puppeteer');

class ComponentIframeTest {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🔍 Testing components in Storybook iframe...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async testButtonComponent() {
    console.log('🔍 Testing Button component in iframe...');
    
    try {
      // Navigate directly to a button story
      await this.page.goto('https://dev.acrobi.com/?path=/story/primitives-button--default', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Wait for iframe to load
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Take screenshot of full page
      await this.page.screenshot({ 
        path: 'button-story-test.png',
        fullPage: true 
      });

      // Access the iframe specifically
      const iframes = await this.page.frames();
      console.log(`  Found ${iframes.length} frames`);
      
      const previewFrame = iframes.find(frame => 
        frame.name() === 'storybook-preview-iframe'
      );

      if (previewFrame) {
        console.log('  ✅ Found preview iframe');
        
        // Test button in iframe
        const buttonTest = await previewFrame.evaluate(() => {
          const buttons = document.querySelectorAll('button, .btn');
          console.log('Found buttons in iframe:', buttons.length);
          
          const buttonData = [];
          buttons.forEach((btn, index) => {
            const styles = window.getComputedStyle(btn);
            buttonData.push({
              index,
              text: btn.textContent?.trim(),
              tagName: btn.tagName,
              className: btn.className,
              fontFamily: styles.fontFamily,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              padding: styles.padding,
              borderRadius: styles.borderRadius,
              dataAttributes: {
                btnStyle: btn.getAttribute('data-btn-style'),
                btnSize: btn.getAttribute('data-btn-size')
              }
            });
          });
          
          return buttonData;
        });

        console.log('\n📊 Button Component Analysis in Iframe:');
        buttonTest.forEach((btn, index) => {
          console.log(`  Button ${index + 1}: "${btn.text}" (${btn.tagName})`);
          console.log(`    Class: ${btn.className}`);
          console.log(`    Font: ${btn.fontFamily}`);
          console.log(`    Size: ${btn.fontSize}`);
          console.log(`    Weight: ${btn.fontWeight}`);
          console.log(`    Background: ${btn.backgroundColor}`);
          console.log(`    Color: ${btn.color}`);
          console.log(`    Data Attributes: style="${btn.dataAttributes.btnStyle}", size="${btn.dataAttributes.btnSize}"`);
          console.log('');
        });

        // Check for Webflow matching
        const webflowMatch = buttonTest.some(btn => 
          btn.fontFamily.includes('Inter') || 
          btn.fontFamily.includes('SF Pro') ||
          (btn.fontSize === '12px' && btn.dataAttributes.btnStyle)
        );

        console.log(`  ${webflowMatch ? '✅' : '❌'} Webflow Match: ${webflowMatch ? 'FOUND' : 'NOT FOUND'}`);
        
        return buttonTest;
        
      } else {
        console.log('  ❌ Could not find preview iframe');
        return [];
      }

    } catch (error) {
      console.log(`  ❌ Button test failed: ${error.message}`);
      return [];
    }
  }

  async testWebflowShowcase() {
    console.log('\n🎨 Testing Webflow Matching Showcase...');
    
    try {
      // Navigate to our Webflow matching showcase
      await this.page.goto('https://dev.acrobi.com/?path=/story/webflow-matching-component-showcase--webflow-button-showcase', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      await new Promise(resolve => setTimeout(resolve, 5000));

      // Take screenshot
      await this.page.screenshot({ 
        path: 'webflow-showcase-test.png',
        fullPage: true 
      });

      const iframes = await this.page.frames();
      const previewFrame = iframes.find(frame => 
        frame.name() === 'storybook-preview-iframe'
      );

      if (previewFrame) {
        const showcaseTest = await previewFrame.evaluate(() => {
          // Check for our specific showcase content
          const showcaseElements = {
            buttons: document.querySelectorAll('button, .btn').length,
            headings: document.querySelectorAll('h1, h2, h3').length,
            colorSwatches: document.querySelectorAll('div[style*="background"]').length,
            inputs: document.querySelectorAll('input, textarea').length,
            cards: document.querySelectorAll('[style*="border"], [style*="shadow"]').length
          };
          
          // Get some sample styles
          const sampleButton = document.querySelector('button');
          const sampleInput = document.querySelector('input');
          
          return {
            elements: showcaseElements,
            sampleStyles: {
              button: sampleButton ? {
                fontFamily: window.getComputedStyle(sampleButton).fontFamily,
                fontSize: window.getComputedStyle(sampleButton).fontSize,
                backgroundColor: window.getComputedStyle(sampleButton).backgroundColor
              } : null,
              input: sampleInput ? {
                fontFamily: window.getComputedStyle(sampleInput).fontFamily,
                fontSize: window.getComputedStyle(sampleInput).fontSize
              } : null
            }
          };
        });

        console.log('  📊 Webflow Showcase Analysis:');
        console.log(`    Buttons: ${showcaseTest.elements.buttons}`);
        console.log(`    Headings: ${showcaseTest.elements.headings}`);
        console.log(`    Color Swatches: ${showcaseTest.elements.colorSwatches}`);
        console.log(`    Inputs: ${showcaseTest.elements.inputs}`);
        console.log(`    Cards: ${showcaseTest.elements.cards}`);
        
        if (showcaseTest.sampleStyles.button) {
          console.log(`    Sample Button Font: ${showcaseTest.sampleStyles.button.fontFamily}`);
          console.log(`    Sample Button Size: ${showcaseTest.sampleStyles.button.fontSize}`);
        }
        
        if (showcaseTest.sampleStyles.input) {
          console.log(`    Sample Input Font: ${showcaseTest.sampleStyles.input.fontFamily}`);
        }

        const isWebflowShowcase = showcaseTest.elements.buttons > 5 && showcaseTest.elements.colorSwatches > 3;
        console.log(`  ${isWebflowShowcase ? '✅' : '❌'} Webflow Showcase: ${isWebflowShowcase ? 'FOUND' : 'NOT FOUND'}`);
        
        return showcaseTest;
        
      } else {
        console.log('  ❌ Could not find preview iframe for showcase');
        return null;
      }

    } catch (error) {
      console.log(`  ❌ Showcase test failed: ${error.message}`);
      return null;
    }
  }

  async run() {
    try {
      await this.init();
      const buttonResults = await this.testButtonComponent();
      const showcaseResults = await this.testWebflowShowcase();
      
      console.log('\n🎉 Component iframe testing completed!');
      console.log(`📊 Button components found: ${buttonResults.length}`);
      console.log(`📊 Showcase loaded: ${showcaseResults ? 'Yes' : 'No'}`);
      
      return { buttonResults, showcaseResults };
      
    } catch (error) {
      console.error('❌ Component iframe test failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the test
const tester = new ComponentIframeTest();
tester.run().catch(console.error);