/**
 * Component Comparison Analyzer
 * Compares Acrobi Design System (Storybook) vs Webflow Design System
 * Generates detailed fixes list for exact matching
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

class ComponentComparisonAnalyzer {
  constructor() {
    this.browser = null;
    this.storybookPage = null;
    this.webflowPage = null;
    this.comparison = {
      storybook: {},
      webflow: {},
      differences: [],
      fixes: {},
      screenshots: []
    };
  }

  async init() {
    console.log('🚀 Initializing Component Comparison Analyzer...\n');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1920,1080'
      ]
    });
    
    // Create two pages for comparison
    this.storybookPage = await this.browser.newPage();
    this.webflowPage = await this.browser.newPage();
    
    await this.storybookPage.setViewport({ width: 1920, height: 1080 });
    await this.webflowPage.setViewport({ width: 1920, height: 1080 });
  }

  async analyzeWebflowDesignSystem() {
    console.log('🔍 Analyzing Webflow Design System...');
    
    try {
      await this.webflowPage.goto('https://bluequeue.webflow.io/ds/c1', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Take full page screenshot
      await this.webflowPage.screenshot({ 
        path: 'webflow-design-system.png', 
        fullPage: true 
      });
      this.comparison.screenshots.push('webflow-design-system.png');

      // Extract design system information
      const webflowAnalysis = await this.webflowPage.evaluate(() => {
        const components = [];
        const styles = {};
        
        // Find all component sections
        const sections = document.querySelectorAll('section, .section, [class*="section"], [class*="component"]');
        
        sections.forEach((section, index) => {
          const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
          const buttons = section.querySelectorAll('button, .button, [class*="btn"]');
          const inputs = section.querySelectorAll('input, .input, [class*="input"]');
          const cards = section.querySelectorAll('.card, [class*="card"]');
          const forms = section.querySelectorAll('form, .form, [class*="form"]');
          
          if (headings.length > 0 || buttons.length > 0 || inputs.length > 0 || cards.length > 0 || forms.length > 0) {
            components.push({
              index,
              sectionClass: section.className,
              headings: Array.from(headings).map(h => ({
                tag: h.tagName,
                text: h.textContent.trim(),
                classes: h.className,
                styles: window.getComputedStyle(h)
              })),
              buttons: Array.from(buttons).map(btn => ({
                text: btn.textContent.trim(),
                classes: btn.className,
                type: btn.type || 'button',
                styles: {
                  backgroundColor: window.getComputedStyle(btn).backgroundColor,
                  color: window.getComputedStyle(btn).color,
                  borderRadius: window.getComputedStyle(btn).borderRadius,
                  padding: window.getComputedStyle(btn).padding,
                  fontSize: window.getComputedStyle(btn).fontSize,
                  fontWeight: window.getComputedStyle(btn).fontWeight,
                  border: window.getComputedStyle(btn).border,
                  boxShadow: window.getComputedStyle(btn).boxShadow,
                  transition: window.getComputedStyle(btn).transition
                }
              })),
              inputs: Array.from(inputs).map(input => ({
                type: input.type,
                placeholder: input.placeholder,
                classes: input.className,
                styles: {
                  backgroundColor: window.getComputedStyle(input).backgroundColor,
                  color: window.getComputedStyle(input).color,
                  borderRadius: window.getComputedStyle(input).borderRadius,
                  padding: window.getComputedStyle(input).padding,
                  fontSize: window.getComputedStyle(input).fontSize,
                  border: window.getComputedStyle(input).border,
                  boxShadow: window.getComputedStyle(input).boxShadow
                }
              })),
              cards: Array.from(cards).map(card => ({
                classes: card.className,
                content: card.textContent.trim().substring(0, 100),
                styles: {
                  backgroundColor: window.getComputedStyle(card).backgroundColor,
                  borderRadius: window.getComputedStyle(card).borderRadius,
                  padding: window.getComputedStyle(card).padding,
                  boxShadow: window.getComputedStyle(card).boxShadow,
                  border: window.getComputedStyle(card).border
                }
              })),
              forms: Array.from(forms).map(form => ({
                classes: form.className,
                fields: form.querySelectorAll('input, select, textarea').length,
                styles: {
                  backgroundColor: window.getComputedStyle(form).backgroundColor,
                  padding: window.getComputedStyle(form).padding,
                  borderRadius: window.getComputedStyle(form).borderRadius
                }
              }))
            });
          }
        });

        // Extract color palette
        const colorElements = document.querySelectorAll('[class*="color"], [style*="background"], [style*="color"]');
        const colors = new Set();
        
        colorElements.forEach(el => {
          const computedStyle = window.getComputedStyle(el);
          colors.add(computedStyle.backgroundColor);
          colors.add(computedStyle.color);
        });

        // Extract typography
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
        const typography = {};
        
        textElements.forEach(el => {
          const tag = el.tagName.toLowerCase();
          if (!typography[tag]) {
            const computedStyle = window.getComputedStyle(el);
            typography[tag] = {
              fontSize: computedStyle.fontSize,
              fontWeight: computedStyle.fontWeight,
              fontFamily: computedStyle.fontFamily,
              lineHeight: computedStyle.lineHeight,
              letterSpacing: computedStyle.letterSpacing
            };
          }
        });

        return {
          title: document.title,
          url: window.location.href,
          components,
          colors: Array.from(colors).filter(c => c && c !== 'rgba(0, 0, 0, 0)'),
          typography,
          totalElements: document.querySelectorAll('*').length
        };
      });

      this.comparison.webflow = webflowAnalysis;
      console.log(`  ✅ Found ${webflowAnalysis.components.length} component sections`);
      console.log(`  🎨 Extracted ${webflowAnalysis.colors.length} colors`);
      console.log(`  📝 Analyzed ${Object.keys(webflowAnalysis.typography).length} typography elements`);

    } catch (error) {
      console.log(`  ❌ Webflow analysis failed: ${error.message}`);
      throw error;
    }
  }

  async analyzeStorybookComponents() {
    console.log('\n🔍 Analyzing Storybook Components...');
    
    try {
      await this.storybookPage.goto('https://dev.acrobi.com', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Take screenshot
      await this.storybookPage.screenshot({ 
        path: 'storybook-components.png', 
        fullPage: true 
      });
      this.comparison.screenshots.push('storybook-components.png');

      // Get all available stories
      const storybookAnalysis = await this.storybookPage.evaluate(() => {
        const stories = [];
        const storyLinks = document.querySelectorAll('a[href*="story"]');
        
        storyLinks.forEach(link => {
          const href = link.href;
          const text = link.textContent.trim();
          if (text && href.includes('story')) {
            stories.push({
              name: text,
              url: href,
              category: href.split('story/')[1]?.split('--')[0] || 'unknown'
            });
          }
        });

        return {
          title: document.title,
          url: window.location.href,
          stories,
          totalStories: stories.length
        };
      });

      this.comparison.storybook = storybookAnalysis;
      console.log(`  ✅ Found ${storybookAnalysis.stories.length} Storybook stories`);

      // Analyze specific components in detail
      const componentsToAnalyze = [
        'button',
        'input', 
        'card',
        'form',
        'textfield'
      ];

      for (const componentName of componentsToAnalyze) {
        await this.analyzeStorybookComponent(componentName);
      }

    } catch (error) {
      console.log(`  ❌ Storybook analysis failed: ${error.message}`);
      throw error;
    }
  }

  async analyzeStorybookComponent(componentName) {
    console.log(`  🧩 Analyzing ${componentName} component...`);
    
    try {
      // Find the component story
      const componentStory = this.comparison.storybook.stories.find(story => 
        story.name.toLowerCase().includes(componentName) || 
        story.category.toLowerCase().includes(componentName)
      );

      if (!componentStory) {
        console.log(`    ⚠️  No ${componentName} story found`);
        return;
      }

      await this.storybookPage.goto(componentStory.url, { 
        waitUntil: 'networkidle0', 
        timeout: 15000 
      });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Analyze component in iframe
      const iframe = await this.storybookPage.frames().find(frame => 
        frame.name() === 'storybook-preview-iframe'
      );

      if (iframe) {
        const componentAnalysis = await iframe.evaluate((compName) => {
          const elements = document.querySelectorAll(`${compName}, .${compName}, [class*="${compName}"], button, input, form, .card, [class*="card"]`);
          
          if (elements.length === 0) {
            return { found: false };
          }

          const analysis = [];
          elements.forEach((el, index) => {
            const computedStyle = window.getComputedStyle(el);
            analysis.push({
              tagName: el.tagName,
              className: el.className,
              textContent: el.textContent?.trim().substring(0, 50),
              styles: {
                backgroundColor: computedStyle.backgroundColor,
                color: computedStyle.color,
                borderRadius: computedStyle.borderRadius,
                padding: computedStyle.padding,
                margin: computedStyle.margin,
                fontSize: computedStyle.fontSize,
                fontWeight: computedStyle.fontWeight,
                fontFamily: computedStyle.fontFamily,
                border: computedStyle.border,
                boxShadow: computedStyle.boxShadow,
                transition: computedStyle.transition,
                width: computedStyle.width,
                height: computedStyle.height
              }
            });
          });

          return {
            found: true,
            count: elements.length,
            elements: analysis
          };
        }, componentName);

        this.comparison.storybook[componentName] = componentAnalysis;
        
        if (componentAnalysis.found) {
          console.log(`    ✅ Found ${componentAnalysis.count} ${componentName} elements`);
          
          // Take component screenshot
          const screenshotPath = `storybook-${componentName}.png`;
          await iframe.screenshot({ path: screenshotPath });
          this.comparison.screenshots.push(screenshotPath);
        } else {
          console.log(`    ❌ No ${componentName} elements found in iframe`);
        }
      }

    } catch (error) {
      console.log(`    ❌ Failed to analyze ${componentName}: ${error.message}`);
    }
  }

  async compareComponents() {
    console.log('\n🔍 Comparing Components and Generating Fixes...');
    
    const componentTypes = ['button', 'input', 'card', 'form'];
    
    for (const componentType of componentTypes) {
      console.log(`\n📊 Analyzing ${componentType} differences...`);
      
      const webflowComponents = this.comparison.webflow.components.flatMap(section => 
        section[componentType + 's'] || []
      );
      
      const storybookComponent = this.comparison.storybook[componentType];
      
      if (webflowComponents.length === 0) {
        console.log(`  ⚠️  No ${componentType} found in Webflow`);
        continue;
      }
      
      if (!storybookComponent || !storybookComponent.found) {
        console.log(`  ⚠️  No ${componentType} found in Storybook`);
        this.comparison.fixes[componentType] = {
          status: 'missing',
          priority: 'high',
          fixes: ['Create missing component to match Webflow design']
        };
        continue;
      }

      // Compare styles
      const webflowStyle = webflowComponents[0]?.styles || {};
      const storybookStyle = storybookComponent.elements[0]?.styles || {};
      
      const differences = [];
      const fixes = [];

      // Compare key style properties
      const styleProperties = [
        'backgroundColor', 'color', 'borderRadius', 'padding', 
        'fontSize', 'fontWeight', 'border', 'boxShadow'
      ];

      styleProperties.forEach(prop => {
        const webflowValue = webflowStyle[prop];
        const storybookValue = storybookStyle[prop];
        
        if (webflowValue && storybookValue && webflowValue !== storybookValue) {
          differences.push({
            property: prop,
            webflow: webflowValue,
            storybook: storybookValue
          });
          
          fixes.push(`Update ${prop}: change from "${storybookValue}" to "${webflowValue}"`);
        }
      });

      if (differences.length > 0) {
        console.log(`  📋 Found ${differences.length} style differences`);
        differences.forEach(diff => {
          console.log(`    🔧 ${diff.property}: "${diff.storybook}" → "${diff.webflow}"`);
        });
        
        this.comparison.fixes[componentType] = {
          status: 'needs_update',
          priority: 'high',
          differences,
          fixes,
          webflowReference: webflowComponents[0],
          storybookCurrent: storybookComponent.elements[0]
        };
      } else {
        console.log(`  ✅ ${componentType} styles match closely`);
        this.comparison.fixes[componentType] = {
          status: 'good',
          priority: 'low',
          fixes: []
        };
      }
    }

    this.comparison.differences = Object.values(this.comparison.fixes).filter(fix => 
      fix.status !== 'good'
    );
  }

  async generateDetailedReport() {
    console.log('\n📊 Generating Detailed Component Comparison Report...');
    
    const report = `
# Component Comparison Report: Storybook vs Webflow Design System

**Generated**: ${new Date().toISOString()}  
**Webflow Source**: https://bluequeue.webflow.io/ds/c1  
**Storybook Source**: https://dev.acrobi.com  

## 📋 Executive Summary

- **Webflow Components Analyzed**: ${this.comparison.webflow.components?.length || 0}
- **Storybook Stories Found**: ${this.comparison.storybook.totalStories || 0}
- **Components Needing Fixes**: ${this.comparison.differences.length}
- **Critical Priority Fixes**: ${Object.values(this.comparison.fixes).filter(f => f.priority === 'high').length}

## 🎨 Webflow Design System Analysis

### Color Palette Detected:
${this.comparison.webflow.colors?.slice(0, 10).map(color => `- ${color}`).join('\n') || 'No colors detected'}

### Typography System:
${Object.entries(this.comparison.webflow.typography || {}).map(([tag, styles]) => 
  `- **${tag.toUpperCase()}**: ${styles.fontSize} / ${styles.fontWeight} / ${styles.fontFamily}`
).join('\n')}

## 🧩 Component-by-Component Analysis

${Object.entries(this.comparison.fixes).map(([component, fix]) => `
### ${component.toUpperCase()} Component

**Status**: ${fix.status === 'good' ? '✅ MATCHES' : fix.status === 'missing' ? '❌ MISSING' : '🔧 NEEDS FIXES'}  
**Priority**: ${fix.priority?.toUpperCase()}

${fix.fixes?.length > 0 ? `
**Required Fixes**:
${fix.fixes.map(fixItem => `- ${fixItem}`).join('\n')}
` : ''}

${fix.differences?.length > 0 ? `
**Style Differences Detected**:
${fix.differences.map(diff => 
  `- **${diff.property}**: Current "${diff.storybook}" → Target "${diff.webflow}"`
).join('\n')}
` : ''}

${fix.webflowReference ? `
**Webflow Reference Styles**:
\`\`\`css
background-color: ${fix.webflowReference.styles?.backgroundColor || 'N/A'};
color: ${fix.webflowReference.styles?.color || 'N/A'};
border-radius: ${fix.webflowReference.styles?.borderRadius || 'N/A'};
padding: ${fix.webflowReference.styles?.padding || 'N/A'};
font-size: ${fix.webflowReference.styles?.fontSize || 'N/A'};
border: ${fix.webflowReference.styles?.border || 'N/A'};
box-shadow: ${fix.webflowReference.styles?.boxShadow || 'N/A'};
\`\`\`
` : ''}

${fix.storybookCurrent ? `
**Current Storybook Styles**:
\`\`\`css
background-color: ${fix.storybookCurrent.styles?.backgroundColor || 'N/A'};
color: ${fix.storybookCurrent.styles?.color || 'N/A'};
border-radius: ${fix.storybookCurrent.styles?.borderRadius || 'N/A'};
padding: ${fix.storybookCurrent.styles?.padding || 'N/A'};
font-size: ${fix.storybookCurrent.styles?.fontSize || 'N/A'};
border: ${fix.storybookCurrent.styles?.border || 'N/A'};
box-shadow: ${fix.storybookCurrent.styles?.boxShadow || 'N/A'};
\`\`\`
` : ''}
`).join('\n')}

## 🚀 Implementation Plan

### Phase 1: Critical Component Fixes (High Priority)
${Object.entries(this.comparison.fixes)
  .filter(([, fix]) => fix.priority === 'high')
  .map(([component, fix]) => `
1. **${component.toUpperCase()}**: ${fix.fixes?.join(', ') || 'Update required'}
`)
  .join('')}

### Phase 2: Style Refinements (Medium Priority)
${Object.entries(this.comparison.fixes)
  .filter(([, fix]) => fix.priority === 'medium')
  .map(([component, fix]) => `
1. **${component.toUpperCase()}**: ${fix.fixes?.join(', ') || 'Refinements needed'}
`)
  .join('')}

## 📸 Visual Documentation

### Screenshots Generated:
${this.comparison.screenshots.map(screenshot => `- ${screenshot}`).join('\n')}

## 🛠️ Swarm Agent Tasks

The following tasks should be distributed to swarm agents:

\`\`\`json
{
  "tasks": [
${Object.entries(this.comparison.fixes)
  .filter(([, fix]) => fix.status !== 'good')
  .map(([component, fix]) => `    {
      "component": "${component}",
      "priority": "${fix.priority}",
      "agent_type": "coder",
      "fixes": ${JSON.stringify(fix.fixes || [], null, 6)},
      "reference_styles": ${JSON.stringify(fix.webflowReference?.styles || {}, null, 6)}
    }`).join(',\n')}
  ]
}
\`\`\`

## 📊 Success Metrics

- [ ] All high-priority components match Webflow design
- [ ] Color palette consistency achieved
- [ ] Typography system aligned
- [ ] Interactive states match reference
- [ ] Responsive behavior consistent
- [ ] Accessibility maintained while matching design

---
*Report generated by Component Comparison Analyzer*
`;

    // Save the report
    fs.writeFileSync('component-comparison-report.md', report);
    console.log('📊 Report saved: component-comparison-report.md');

    // Save raw comparison data
    fs.writeFileSync('component-comparison-data.json', JSON.stringify(this.comparison, null, 2));
    console.log('🔧 Raw data saved: component-comparison-data.json');

    return this.comparison;
  }

  async run() {
    try {
      await this.init();
      await this.analyzeWebflowDesignSystem();
      await this.analyzeStorybookComponents();
      await this.compareComponents();
      await this.generateDetailedReport();
      
      console.log('\n🎉 Component comparison completed!');
      console.log(`📊 Found ${this.comparison.differences.length} components needing fixes`);
      
      return this.comparison;
      
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      throw error;
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the comparison
const analyzer = new ComponentComparisonAnalyzer();
analyzer.run().catch(console.error);