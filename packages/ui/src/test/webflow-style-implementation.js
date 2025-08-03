/**
 * Webflow Style Implementation Script
 * Updates existing components to match Webflow design exactly
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

class WebflowStyleImplementer {
  constructor() {
    this.browser = null;
    this.webflowPage = null;
    this.storybookPage = null;
    this.styleRequirements = {};
  }

  async init() {
    console.log('🔧 Initializing Webflow Style Implementation...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.webflowPage = await this.browser.newPage();
    this.storybookPage = await this.browser.newPage();
    
    await this.webflowPage.setViewport({ width: 1920, height: 1080 });
    await this.storybookPage.setViewport({ width: 1920, height: 1080 });
  }

  async extractWebflowStyles() {
    console.log('🔍 Extracting exact Webflow styles...');
    
    await this.webflowPage.goto('https://bluequeue.webflow.io/ds/c1', { 
      waitUntil: 'networkidle0' 
    });

    // Extract button styles
    const buttonStyles = await this.webflowPage.evaluate(() => {
      const buttons = document.querySelectorAll('button, .button, [class*="btn"]');
      const buttonData = [];
      
      buttons.forEach(btn => {
        const styles = window.getComputedStyle(btn);
        buttonData.push({
          element: btn.tagName,
          classes: btn.className,
          text: btn.textContent?.trim(),
          styles: {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            border: styles.border,
            borderRadius: styles.borderRadius,
            padding: styles.padding,
            margin: styles.margin,
            height: styles.height,
            minHeight: styles.minHeight,
            lineHeight: styles.lineHeight,
            textTransform: styles.textTransform,
            letterSpacing: styles.letterSpacing,
            boxShadow: styles.boxShadow,
            transition: styles.transition
          }
        });
      });
      
      return buttonData;
    });

    // Extract input styles
    const inputStyles = await this.webflowPage.evaluate(() => {
      const inputs = document.querySelectorAll('input, textarea, .input, [class*="input"]');
      const inputData = [];
      
      inputs.forEach(input => {
        const styles = window.getComputedStyle(input);
        inputData.push({
          element: input.tagName,
          type: input.type || 'text',
          classes: input.className,
          placeholder: input.placeholder,
          styles: {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            border: styles.border,
            borderRadius: styles.borderRadius,
            padding: styles.padding,
            margin: styles.margin,
            height: styles.height,
            minHeight: styles.minHeight,
            lineHeight: styles.lineHeight,
            boxShadow: styles.boxShadow,
            outline: styles.outline
          }
        });
      });
      
      return inputData;
    });

    // Extract typography system
    const typography = await this.webflowPage.evaluate(() => {
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, input, label');
      const typographyData = {};
      
      textElements.forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (!typographyData[tag]) {
          const styles = window.getComputedStyle(el);
          typographyData[tag] = {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize, 
            fontWeight: styles.fontWeight,
            lineHeight: styles.lineHeight,
            letterSpacing: styles.letterSpacing,
            color: styles.color
          };
        }
      });
      
      return typographyData;
    });

    // Extract color palette
    const colorPalette = await this.webflowPage.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const colors = new Set();
      
      allElements.forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.color && styles.color !== 'rgba(0, 0, 0, 0)') {
          colors.add(styles.color);
        }
        if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colors.add(styles.backgroundColor);
        }
        if (styles.borderColor && styles.borderColor !== 'rgba(0, 0, 0, 0)') {
          colors.add(styles.borderColor);
        }
      });
      
      return Array.from(colors);
    });

    this.styleRequirements = {
      buttons: buttonStyles,
      inputs: inputStyles,
      typography,
      colors: colorPalette,
      extractedAt: new Date().toISOString()
    };

    console.log(`  ✅ Extracted ${buttonStyles.length} button styles`);
    console.log(`  ✅ Extracted ${inputStyles.length} input styles`);
    console.log(`  ✅ Extracted ${Object.keys(typography).length} typography elements`);
    console.log(`  ✅ Extracted ${colorPalette.length} colors`);

    return this.styleRequirements;
  }

  async compareStorybookComponents() {
    console.log('\n📊 Comparing Storybook components...');
    
    await this.storybookPage.goto('https://dev.acrobi.com', { 
      waitUntil: 'networkidle0' 
    });

    // Take screenshots for comparison
    await this.storybookPage.screenshot({ 
      path: 'storybook-before-fixes.png',
      fullPage: true 
    });

    // Analyze current button implementation
    const storybookButtons = await this.storybookPage.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      return Array.from(buttons).map(btn => ({
        text: btn.textContent?.trim(),
        styles: {
          fontFamily: window.getComputedStyle(btn).fontFamily,
          fontSize: window.getComputedStyle(btn).fontSize,
          color: window.getComputedStyle(btn).color,
          backgroundColor: window.getComputedStyle(btn).backgroundColor
        }
      }));
    });

    console.log(`  ✅ Analyzed ${storybookButtons.length} Storybook buttons`);
    return storybookButtons;
  }

  generateStyleFixes() {
    console.log('\n🔧 Generating component fixes...');
    
    const fixes = [];
    
    // Button fixes based on Webflow analysis
    if (this.styleRequirements.buttons?.length > 0) {
      const webflowButton = this.styleRequirements.buttons[0]; // Use first button as reference
      
      fixes.push({
        component: 'Button',
        file: 'src/components/primitives/button.tsx',
        fixes: [
          {
            property: 'fontFamily',
            current: 'SF Pro Display',
            target: webflowButton.styles.fontFamily,
            description: 'Update font family to match Webflow'
          },
          {
            property: 'fontSize',
            current: 'var(--font-size-r1)',
            target: webflowButton.styles.fontSize,
            description: 'Update font size to match Webflow'
          },
          {
            property: 'padding',
            current: 'var(--spacing-md)',
            target: webflowButton.styles.padding,
            description: 'Update padding to match Webflow'
          },
          {
            property: 'borderRadius',
            current: 'var(--radius-md)',
            target: webflowButton.styles.borderRadius,
            description: 'Update border radius to match Webflow'
          }
        ]
      });
    }

    // Input fixes
    if (this.styleRequirements.inputs?.length > 0) {
      const webflowInput = this.styleRequirements.inputs[0];
      
      fixes.push({
        component: 'Input',
        file: 'src/components/primitives/input.tsx',
        fixes: [
          {
            property: 'fontFamily',
            target: webflowInput.styles.fontFamily,
            description: 'Update input font family to match Webflow'
          },
          {
            property: 'fontSize', 
            target: webflowInput.styles.fontSize,
            description: 'Update input font size to match Webflow'
          },
          {
            property: 'border',
            target: webflowInput.styles.border,
            description: 'Update input border to match Webflow'
          },
          {
            property: 'padding',
            target: webflowInput.styles.padding,
            description: 'Update input padding to match Webflow'
          }
        ]
      });
    }

    console.log(`  ✅ Generated fixes for ${fixes.length} components`);
    return fixes;
  }

  generateImplementationReport() {
    console.log('\n📊 Generating implementation report...');
    
    const fixes = this.generateStyleFixes();
    
    const report = `
# Webflow Style Implementation Report

**Generated**: ${new Date().toISOString()}
**Webflow Source**: https://bluequeue.webflow.io/ds/c1
**Storybook Target**: https://dev.acrobi.com

## 🎨 Webflow Design System Analysis

### Typography System
${Object.entries(this.styleRequirements.typography || {}).map(([tag, styles]) => 
  `- **${tag.toUpperCase()}**: ${styles.fontFamily} | ${styles.fontSize} | ${styles.fontWeight}`
).join('\n')}

### Color Palette (Primary Colors)
${this.styleRequirements.colors?.slice(0, 10).map(color => `- ${color}`).join('\n') || 'No colors extracted'}

### Button Analysis
${this.styleRequirements.buttons?.slice(0, 3).map(button => `
**Button**: "${button.text}"
- Font: ${button.styles.fontFamily}
- Size: ${button.styles.fontSize}
- Weight: ${button.styles.fontWeight}
- Background: ${button.styles.backgroundColor}
- Color: ${button.styles.color}
- Padding: ${button.styles.padding}
- Border Radius: ${button.styles.borderRadius}
`).join('\n') || 'No buttons analyzed'}

### Input Analysis
${this.styleRequirements.inputs?.slice(0, 2).map(input => `
**Input**: ${input.element} (${input.type})
- Font: ${input.styles.fontFamily}
- Size: ${input.styles.fontSize}
- Border: ${input.styles.border}
- Padding: ${input.styles.padding}
- Background: ${input.styles.backgroundColor}
`).join('\n') || 'No inputs analyzed'}

## 🔧 Required Implementations

${fixes.map(fix => `
### ${fix.component} Component Updates

**File**: \`${fix.file}\`

**Required Changes**:
${fix.fixes.map(change => `
- **${change.property}**: ${change.target}
  - Description: ${change.description}
  ${change.current ? `- Current: ${change.current}` : ''}
`).join('')}
`).join('\n')}

## 🚀 Implementation CSS

### Button Component CSS Updates
\`\`\`css
.btn {
  font-family: ${this.styleRequirements.buttons?.[0]?.styles.fontFamily || '"SF Pro", Arial, sans-serif'};
  font-size: ${this.styleRequirements.buttons?.[0]?.styles.fontSize || '12px'};
  font-weight: ${this.styleRequirements.buttons?.[0]?.styles.fontWeight || '400'};
  padding: ${this.styleRequirements.buttons?.[0]?.styles.padding || '8px 16px'};
  border-radius: ${this.styleRequirements.buttons?.[0]?.styles.borderRadius || '4px'};
  border: ${this.styleRequirements.buttons?.[0]?.styles.border || '1px solid transparent'};
  transition: ${this.styleRequirements.buttons?.[0]?.styles.transition || 'all 0.2s ease'};
}

.btn[data-btn-style="pf"] {
  background-color: ${this.styleRequirements.buttons?.[0]?.styles.backgroundColor || 'rgb(48, 47, 44)'};
  color: ${this.styleRequirements.buttons?.[0]?.styles.color || 'rgb(255, 255, 255)'};
}
\`\`\`

### Input Component CSS Updates
\`\`\`css
.input, input {
  font-family: ${this.styleRequirements.inputs?.[0]?.styles.fontFamily || '"SF Pro", Arial, sans-serif'};
  font-size: ${this.styleRequirements.inputs?.[0]?.styles.fontSize || '14px'};
  padding: ${this.styleRequirements.inputs?.[0]?.styles.padding || '8px 12px'};
  border: ${this.styleRequirements.inputs?.[0]?.styles.border || '1px solid rgb(196, 196, 196)'};
  border-radius: ${this.styleRequirements.inputs?.[0]?.styles.borderRadius || '4px'};
  background-color: ${this.styleRequirements.inputs?.[0]?.styles.backgroundColor || 'white'};
}
\`\`\`

## 📋 Implementation Checklist

- [ ] Update Button component styles to match Webflow
- [ ] Update Input component styles to match Webflow  
- [ ] Update typography system with extracted fonts
- [ ] Implement Webflow color palette
- [ ] Test all component variants match exactly
- [ ] Verify responsive behavior
- [ ] Update Storybook stories to showcase matches

## 🎯 Success Criteria

- All buttons visually identical to Webflow reference
- All inputs match Webflow styling exactly
- Typography system uses correct fonts and sizes
- Color palette matches Webflow colors
- Interactive states work identically
- Components pass visual regression tests

---
*Report generated by Webflow Style Implementation Script*
`;

    // Save the report
    fs.writeFileSync('webflow-implementation-report.md', report);
    console.log('📊 Report saved: webflow-implementation-report.md');

    // Save raw style data
    fs.writeFileSync('webflow-style-requirements.json', JSON.stringify(this.styleRequirements, null, 2));
    console.log('🔧 Style data saved: webflow-style-requirements.json');

    return { report, fixes };
  }

  async run() {
    try {
      await this.init();
      await this.extractWebflowStyles();
      await this.compareStorybookComponents();
      const result = this.generateImplementationReport();
      
      console.log('\n🎉 Webflow style analysis completed!');
      console.log('📊 Implementation report generated');
      console.log('🔧 Ready to apply component fixes');
      
      return result;
      
    } catch (error) {
      console.error('❌ Style analysis failed:', error);
      throw error;
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the analysis
const implementer = new WebflowStyleImplementer();
implementer.run().catch(console.error);