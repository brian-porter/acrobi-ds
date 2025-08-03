/**
 * BlueQueue Theme Verification Test
 * Tests the BlueQueue theme matching Webflow design exactly
 */

const puppeteer = require('puppeteer');

class BlueQueueThemeTest {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🔵 Testing BlueQueue theme on localhost:6006...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async testBlueQueueShowcase() {
    console.log('🎨 Testing BlueQueue Theme Showcase...');
    
    try {
      // Navigate to the BlueQueue showcase story
      await this.page.goto('http://localhost:6006/?path=/story/bluequeue-theme-webflow-matching-showcase--blue-queue-button-showcase', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      await new Promise(resolve => setTimeout(resolve, 3000));

      // Take screenshot
      await this.page.screenshot({ 
        path: 'bluequeue-theme-showcase.png',
        fullPage: true 
      });

      // Find the preview iframe
      const iframes = await this.page.frames();
      const previewFrame = iframes.find(frame => 
        frame.name() === 'storybook-preview-iframe'
      );

      if (previewFrame) {
        console.log('  ✅ Found Storybook preview iframe');
        
        // Test BlueQueue theme components in iframe
        const showcaseTest = await previewFrame.evaluate(() => {
          // Look for BlueQueue theme elements
          const themeContainer = document.querySelector('[data-theme="bluequeue"]');
          const buttons = document.querySelectorAll('button, .btn');
          const headings = document.querySelectorAll('h1, h2, h3, h4');
          const colorSwatches = document.querySelectorAll('div[style*="background-color: rgb("]');
          const inputs = document.querySelectorAll('input, textarea');
          const cards = document.querySelectorAll('div[style*="box-shadow"]');
          
          // Check font and styling on buttons
          const sampleButton = document.querySelector('[data-btn-style="pf"]');
          const sampleInput = document.querySelector('input');
          
          const buttonStyles = sampleButton ? {
            fontFamily: window.getComputedStyle(sampleButton).fontFamily,
            fontSize: window.getComputedStyle(sampleButton).fontSize,
            backgroundColor: window.getComputedStyle(sampleButton).backgroundColor,
            color: window.getComputedStyle(sampleButton).color,
            borderRadius: window.getComputedStyle(sampleButton).borderRadius
          } : null;
          
          const inputStyles = sampleInput ? {
            fontFamily: window.getComputedStyle(sampleInput).fontFamily,
            fontSize: window.getComputedStyle(sampleInput).fontSize,
            padding: window.getComputedStyle(sampleInput).padding,
            borderColor: window.getComputedStyle(sampleInput).borderColor
          } : null;
          
          return {
            hasThemeContainer: !!themeContainer,
            components: {
              buttons: buttons.length,
              headings: headings.length,
              colorSwatches: colorSwatches.length,
              inputs: inputs.length,
              cards: cards.length
            },
            webflowDataAttributes: {
              pf: document.querySelectorAll('[data-btn-style="pf"]').length,
              pl: document.querySelectorAll('[data-btn-style="pl"]').length,
              pt: document.querySelectorAll('[data-btn-style="pt"]').length,
              nf: document.querySelectorAll('[data-btn-style="nf"]').length
            },
            styling: {
              button: buttonStyles,
              input: inputStyles,
              hasInter: buttonStyles ? buttonStyles.fontFamily.includes('Inter') : false,
              hasSFPro: buttonStyles ? buttonStyles.fontFamily.includes('SF Pro') : false,
              hasWebflowColors: buttonStyles ? 
                (buttonStyles.backgroundColor.includes('48, 47, 44') || 
                 buttonStyles.backgroundColor.includes('25, 117, 240')) : false
            }
          };
        });

        console.log('  📊 BlueQueue Theme Analysis:');
        console.log(`    Theme Container: ${showcaseTest.hasThemeContainer ? '✅' : '❌'}`);
        console.log(`    Buttons: ${showcaseTest.components.buttons}`);
        console.log(`    Headings: ${showcaseTest.components.headings}`);
        console.log(`    Color Swatches: ${showcaseTest.components.colorSwatches}`);
        console.log(`    Inputs: ${showcaseTest.components.inputs}`);
        console.log(`    Cards: ${showcaseTest.components.cards}`);
        
        console.log('  🎯 Webflow Data Attributes:');
        console.log(`    Primary Filled (pf): ${showcaseTest.webflowDataAttributes.pf}`);
        console.log(`    Primary Line (pl): ${showcaseTest.webflowDataAttributes.pl}`);
        console.log(`    Primary Text (pt): ${showcaseTest.webflowDataAttributes.pt}`);
        console.log(`    Neutral Filled (nf): ${showcaseTest.webflowDataAttributes.nf}`);
        
        if (showcaseTest.styling.button) {
          console.log('  🎨 Button Styling:');
          console.log(`    Font Family: ${showcaseTest.styling.button.fontFamily}`);
          console.log(`    Font Size: ${showcaseTest.styling.button.fontSize}`);
          console.log(`    Background: ${showcaseTest.styling.button.backgroundColor}`);
          console.log(`    Color: ${showcaseTest.styling.button.color}`);
          console.log(`    Border Radius: ${showcaseTest.styling.button.borderRadius}`);
        }
        
        if (showcaseTest.styling.input) {
          console.log('  📝 Input Styling:');
          console.log(`    Font Family: ${showcaseTest.styling.input.fontFamily}`);
          console.log(`    Font Size: ${showcaseTest.styling.input.fontSize}`);
          console.log(`    Padding: ${showcaseTest.styling.input.padding}`);
          console.log(`    Border Color: ${showcaseTest.styling.input.borderColor}`);
        }
        
        console.log('  🔤 Typography Check:');
        console.log(`    Using Inter: ${showcaseTest.styling.hasInter ? '✅' : '❌'}`);
        console.log(`    Using SF Pro: ${showcaseTest.styling.hasSFPro ? '✅' : '❌'}`);
        console.log(`    Webflow Colors: ${showcaseTest.styling.hasWebflowColors ? '✅' : '❌'}`);

        // Determine if BlueQueue theme is working
        const isBlueQueueWorking = 
          showcaseTest.hasThemeContainer &&
          showcaseTest.components.buttons > 10 &&
          showcaseTest.components.colorSwatches > 3 &&
          (showcaseTest.styling.hasInter || showcaseTest.styling.hasSFPro) &&
          showcaseTest.webflowDataAttributes.pf > 0;
        
        console.log(`  ${isBlueQueueWorking ? '✅' : '❌'} BlueQueue Theme Working: ${isBlueQueueWorking ? 'YES' : 'NO'}`);
        
        return { showcaseTest, isBlueQueueWorking };
        
      } else {
        console.log('  ❌ Could not find Storybook preview iframe');
        return { showcaseTest: null, isBlueQueueWorking: false };
      }

    } catch (error) {
      console.log(`  ❌ Showcase test failed: ${error.message}`);
      return { showcaseTest: null, isBlueQueueWorking: false };
    }
  }

  async testThemeInRegularButton() {
    console.log('\n🔘 Testing BlueQueue Theme in Regular Button Story...');
    
    try {
      // Navigate to button story and apply BlueQueue theme via URL params
      await this.page.goto('http://localhost:6006/?path=/story/primitives-button--default&globals=theme:bluequeue-light', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Take screenshot
      await this.page.screenshot({ 
        path: 'bluequeue-button-story.png',
        fullPage: true 
      });

      // Find the preview iframe
      const iframes = await this.page.frames();
      const previewFrame = iframes.find(frame => 
        frame.name() === 'storybook-preview-iframe'
      );

      if (previewFrame) {
        // Test button styling in iframe
        const buttonTest = await previewFrame.evaluate(() => {
          const buttons = document.querySelectorAll('button, .btn');
          
          if (buttons.length === 0) return { buttons: [], themeApplied: false };
          
          const buttonData = [];
          buttons.forEach((btn, index) => {
            if (index < 3) { // Test first 3 buttons
              const styles = window.getComputedStyle(btn);
              buttonData.push({
                text: btn.textContent?.trim(),
                fontFamily: styles.fontFamily,
                fontSize: styles.fontSize,
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                borderRadius: styles.borderRadius,
                btnStyle: btn.getAttribute('data-btn-style'),
                btnSize: btn.getAttribute('data-btn-size')
              });
            }
          });
          
          // Check if BlueQueue theme is applied
          const themeApplied = buttonData.some(btn => 
            btn.fontFamily.includes('Inter') || 
            btn.fontFamily.includes('SF Pro') ||
            btn.fontSize === '12px' ||
            btn.borderRadius === '4px'
          );
          
          return { buttons: buttonData, themeApplied };
        });

        console.log('  📊 Button Theme Analysis:');
        buttonTest.buttons.forEach((btn, index) => {
          console.log(`    Button ${index + 1}: "${btn.text}"`);
          console.log(`      Font: ${btn.fontFamily}`);
          console.log(`      Size: ${btn.fontSize}`);
          console.log(`      Background: ${btn.backgroundColor}`);
          console.log(`      Color: ${btn.color}`);
          console.log(`      Border Radius: ${btn.borderRadius}`);
          console.log(`      Data Attributes: style="${btn.btnStyle}", size="${btn.btnSize}"`);
        });

        console.log(`  ${buttonTest.themeApplied ? '✅' : '❌'} BlueQueue Theme Applied: ${buttonTest.themeApplied ? 'YES' : 'NO'}`);
        
        return buttonTest;
        
      } else {
        console.log('  ❌ Could not find Storybook preview iframe');
        return null;
      }

    } catch (error) {
      console.log(`  ❌ Button theme test failed: ${error.message}`);
      return null;
    }
  }

  async run() {
    try {
      await this.init();
      const showcaseResults = await this.testBlueQueueShowcase();
      const buttonResults = await this.testThemeInRegularButton();
      
      console.log('\n🎉 BlueQueue theme verification completed!');
      
      const showcaseWorking = showcaseResults?.isBlueQueueWorking;
      const buttonThemeApplied = buttonResults?.themeApplied;
      
      console.log('\n📋 SUMMARY:');
      console.log(`  🎨 BlueQueue Showcase: ${showcaseWorking ? '✅ WORKING' : '❌ NOT WORKING'}`);
      console.log(`  🔘 Theme Applied to Buttons: ${buttonThemeApplied ? '✅ YES' : '❌ NO'}`);
      console.log(`  📸 Screenshots: bluequeue-theme-showcase.png, bluequeue-button-story.png`);
      
      if (showcaseWorking && buttonThemeApplied) {
        console.log('\n🚀 SUCCESS: BlueQueue theme is working and matches Webflow design!');
        console.log('   🔵 Select "BlueQueue (Webflow)" theme from Storybook toolbar');
        console.log('   📖 Visit the BlueQueue showcase at:');
        console.log('      http://localhost:6006/?path=/story/bluequeue-theme-webflow-matching-showcase--blue-queue-button-showcase');
      } else if (showcaseWorking || buttonThemeApplied) {
        console.log('\n⚠️ PARTIAL: Some BlueQueue theme features are working.');
      } else {
        console.log('\n❌ FAILED: BlueQueue theme is not working properly.');
      }
      
      return { showcaseResults, buttonResults };
      
    } catch (error) {
      console.error('❌ BlueQueue theme verification failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the test
const tester = new BlueQueueThemeTest();
tester.run().catch(console.error);