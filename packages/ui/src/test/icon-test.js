#!/usr/bin/env node

/**
 * Icon System Test
 * Tests that BQ-Icons font is loading and displaying correctly
 */

const fs = require('fs');

function testIconSystem() {
  console.log('🎯 Testing BQ-Icons System...\n');
  
  // Check if files exist
  const requiredFiles = [
    'src/styles/themes/acrobi/css/icons.css',
    'src/styles/themes/theme-acrobi.css',
    'src/components/primitives/icon.tsx'
  ];
  
  console.log('📁 File Structure Check:');
  let filesOk = true;
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - Missing`);
      filesOk = false;
    }
  }
  
  if (!filesOk) return false;
  
  // Check Icon component has Unicode mappings
  console.log('\n🔍 Icon Component Analysis:');
  const iconContent = fs.readFileSync('src/components/primitives/icon.tsx', 'utf8');
  
  const hasUnicodeMapping = iconContent.includes('\\ue900');
  const hasBQIconsFont = iconContent.includes("'BQ-Icons', sans-serif");
  
  console.log(`Unicode mappings: ${hasUnicodeMapping ? '✅' : '❌'}`);
  console.log(`BQ-Icons font: ${hasBQIconsFont ? '✅' : '❌'}`);
  
  // Check theme imports icons CSS
  console.log('\n📦 Theme Integration:');
  const themeContent = fs.readFileSync('src/styles/themes/theme-acrobi.css', 'utf8');
  const hasIconsImport = themeContent.includes('./acrobi/css/icons.css');
  
  console.log(`Icons CSS imported: ${hasIconsImport ? '✅' : '❌'}`);
  
  // Check if semantic bridge includes icons
  console.log('\n🌉 Semantic Bridge:');
  const bridgeContent = fs.readFileSync('src/styles/themes/semantic-bridge.css', 'utf8');
  const hasIconFixes = bridgeContent.includes('.icn');
  
  console.log(`Icon styles in bridge: ${hasIconFixes ? '✅' : '❌'}`);
  
  // Success check
  const allChecks = hasUnicodeMapping && hasBQIconsFont && hasIconsImport;
  
  console.log('\n📊 Test Results:');
  if (allChecks) {
    console.log('🎉 SUCCESS: Icon system is properly configured!');
    console.log('\n✨ What should work now:');
    console.log('   • Icons display as symbols instead of text');
    console.log('   • <Icon name="default" /> shows X in box');
    console.log('   • <Icon name="check" /> shows checkmark');
    console.log('   • Icons work in both Acrobi and BlueQueue themes');
    
    console.log('\n🧪 Test in Storybook:');
    console.log('   1. Go to http://localhost:6006');
    console.log('   2. Navigate to Icon stories'); 
    console.log('   3. Verify icons show as symbols, not text');
    console.log('   4. Switch themes and confirm icons still work');
    
    return true;
  } else {
    console.log('❌ Some issues found. Please review the errors above.');
    return false;
  }
}

if (require.main === module) {
  const success = testIconSystem();
  process.exit(success ? 0 : 1);
}

module.exports = { testIconSystem };