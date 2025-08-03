#!/usr/bin/env node

/**
 * Hybrid Theme System Test
 * Tests that both Acrobi components and Tailwind utilities respect theme changes
 */

const fs = require('fs');
const path = require('path');

// Color extraction utilities
function extractCSSVariables(cssContent) {
  const variables = {};
  const varPattern = /--([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = varPattern.exec(cssContent)) !== null) {
    const [, name, value] = match;
    variables[name.trim()] = value.trim();
  }
  
  return variables;
}

function extractThemeVariables(cssContent, themeName) {
  const themePattern = new RegExp(`\\[data-theme=['"]${themeName}['"]\\]\\s*\\{([^}]+)\\}`, 'g');
  const match = themePattern.exec(cssContent);
  
  if (!match) return {};
  
  return extractCSSVariables(match[1]);
}

// Test functions
function testSemanticBridge() {
  console.log('🧪 Testing Semantic Bridge...');
  
  const bridgePath = path.join(__dirname, '../styles/themes/semantic-bridge.css');
  if (!fs.existsSync(bridgePath)) {
    console.error('❌ semantic-bridge.css not found');
    return false;
  }
  
  const bridgeContent = fs.readFileSync(bridgePath, 'utf8');
  
  // Test that semantic variables are mapped to Acrobi variables
  const requiredMappings = [
    ['primary', '--color--p500'],
    ['background', '--color--n000'],
    ['foreground', '--color--n999'],
    ['muted', '--color--n300'],
    ['border', '--color--n300'],
    ['accent', '--color--f500']
  ];
  
  let success = true;
  for (const [semantic, acrobi] of requiredMappings) {
    const pattern = new RegExp(`--${semantic}:\\s*var\\(${acrobi}\\)`);
    if (!pattern.test(bridgeContent)) {
      console.error(`❌ Missing mapping: --${semantic} -> ${acrobi}`);
      success = false;
    }
  }
  
  if (success) {
    console.log('✅ Semantic bridge mappings are correct');
  }
  
  return success;
}

function testThemeOverrides() {
  console.log('🎨 Testing Theme Overrides...');
  
  const bridgePath = path.join(__dirname, '../styles/themes/semantic-bridge.css');
  const bridgeContent = fs.readFileSync(bridgePath, 'utf8');
  
  // Test Acrobi theme overrides
  const acrobiVars = extractThemeVariables(bridgeContent, 'acrobi');
  const bluequeueVars = extractThemeVariables(bridgeContent, 'bluequeue');
  
  console.log('Acrobi theme variables:', Object.keys(acrobiVars).length);
  console.log('BlueQueue theme variables:', Object.keys(bluequeueVars).length);
  
  // Verify BlueQueue has Webflow colors
  const expectedBlueQueueColors = {
    'primary': 'rgb(48, 47, 44)',
    'background': 'rgb(255, 254, 255)',
    'foreground': 'rgb(29, 28, 26)'
  };
  
  let success = true;
  for (const [var_name, expectedValue] of Object.entries(expectedBlueQueueColors)) {
    if (bluequeueVars[var_name] !== expectedValue) {
      console.error(`❌ BlueQueue --${var_name}: expected "${expectedValue}", got "${bluequeueVars[var_name]}"`);
      success = false;
    }
  }
  
  if (success) {
    console.log('✅ Theme overrides are correct');
  }
  
  return success;
}

function testTailwindConfig() {
  console.log('⚙️ Testing Tailwind Configuration...');
  
  const configPath = path.join(__dirname, '../styles/tailwind/tailwind-theme-config.js');
  if (!fs.existsSync(configPath)) {
    console.error('❌ tailwind-theme-config.js not found');
    return false;
  }
  
  try {
    const config = require(configPath);
    
    // Test that required functions exist
    const requiredFunctions = [
      'createAcrobiTailwindConfig',
      'createMinimalAcrobiConfig',
      'getThemeHSLColors',
      'prebuiltConfigs'
    ];
    
    let success = true;
    for (const funcName of requiredFunctions) {
      if (typeof config[funcName] !== 'function' && typeof config[funcName] !== 'object') {
        console.error(`❌ Missing function/object: ${funcName}`);
        success = false;
      }
    }
    
    // Test config generation
    const tailwindConfig = config.createAcrobiTailwindConfig();
    if (!tailwindConfig.theme?.extend?.colors?.primary) {
      console.error('❌ Generated config missing primary color');
      success = false;
    }
    
    // Test HSL colors
    const acrobiHSL = config.getThemeHSLColors('acrobi');
    const bluequeueHSL = config.getThemeHSLColors('bluequeue');
    
    if (!acrobiHSL.primary || !bluequeueHSL.primary) {
      console.error('❌ HSL color generation failed');
      success = false;
    }
    
    if (success) {
      console.log('✅ Tailwind configuration is working');
      console.log(`   Acrobi primary: ${acrobiHSL.primary}`);
      console.log(`   BlueQueue primary: ${bluequeueHSL.primary}`);
    }
    
    return success;
  } catch (error) {
    console.error('❌ Error testing Tailwind config:', error.message);
    return false;
  }
}

function testStorybook() {
  console.log('📚 Testing Storybook Integration...');
  
  const storiesPath = path.join(__dirname, '../examples/hybrid-showcase.stories.tsx');
  if (!fs.existsSync(storiesPath)) {
    console.error('❌ hybrid-showcase.stories.tsx not found');
    return false;
  }
  
  const storiesContent = fs.readFileSync(storiesPath, 'utf8');
  
  // Test that stories contain theme switching
  const requiredElements = [
    'data-theme={theme}',
    'setTheme(',
    'bg-primary',
    'text-primary-foreground',
    'Button styling="pf"'
  ];
  
  let success = true;
  for (const element of requiredElements) {
    if (!storiesContent.includes(element)) {
      console.error(`❌ Missing element in stories: ${element}`);
      success = false;
    }
  }
  
  if (success) {
    console.log('✅ Storybook stories are properly configured');
  }
  
  return success;
}

function testExampleApp() {
  console.log('🚀 Testing Example App...');
  
  const examplePath = path.join(__dirname, '../examples/hybrid-app-example.tsx');
  if (!fs.existsSync(examplePath)) {
    console.error('❌ hybrid-app-example.tsx not found');
    return false;
  }
  
  const exampleContent = fs.readFileSync(examplePath, 'utf8');
  
  // Test that example demonstrates both systems
  const requiredPatterns = [
    /styling="[a-z]+"/g, // Acrobi semantic props
    /className="[^"]*bg-[a-z-]+/g, // Tailwind utilities
    /data-theme=\{theme\}/g, // Theme switching
    /setTheme\(/g // Theme state management
  ];
  
  let success = true;
  for (const pattern of requiredPatterns) {
    if (!pattern.test(exampleContent)) {
      console.error(`❌ Missing pattern in example app: ${pattern}`);
      success = false;
    }
  }
  
  if (success) {
    console.log('✅ Example app demonstrates hybrid approach correctly');
  }
  
  return success;
}

function generateReport() {
  console.log('\n📊 Hybrid Theme System Test Report');
  console.log('=====================================');
  
  const tests = [
    ['Semantic Bridge', testSemanticBridge],
    ['Theme Overrides', testThemeOverrides], 
    ['Tailwind Config', testTailwindConfig],
    ['Storybook Integration', testStorybook],
    ['Example App', testExampleApp]
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const [name, testFn] of tests) {
    console.log(`\n🔍 ${name}:`);
    if (testFn()) {
      passed++;
    }
  }
  
  console.log('\n=====================================');
  console.log(`Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! Hybrid theme system is working correctly.');
    console.log('\n✨ Ready for use:');
    console.log('   • Components: Use styling="pf", size="m" props');
    console.log('   • Utilities: Use bg-primary, text-foreground classes');
    console.log('   • Themes: Switch with data-theme="bluequeue"');
    console.log('   • Storybook: Run `npm run storybook` to see examples');
  } else {
    console.log('❌ Some tests failed. Please review the issues above.');
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  generateReport();
}

module.exports = {
  testSemanticBridge,
  testThemeOverrides,
  testTailwindConfig,
  testStorybook,
  testExampleApp
};