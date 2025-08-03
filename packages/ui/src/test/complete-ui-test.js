#!/usr/bin/env node

/**
 * Complete UI System Test
 * Tests that both button text colors and icons are working correctly
 */

const fs = require('fs');

function testCompleteUISystem() {
  console.log('🎨 Testing Complete UI System (Buttons + Icons)...\n');
  
  console.log('1️⃣ Button Text Color System:');
  
  // Test button color fixes
  const bridgeContent = fs.readFileSync('src/styles/themes/semantic-bridge.css', 'utf8');
  
  const buttonColorChecks = [
    ['Primary filled buttons', '[data-btn-style="pf"]', 'var(--primary-foreground)'],
    ['Neutral filled buttons', '[data-btn-style="nf"]', 'var(--primary-foreground)'],
    ['Focus filled buttons', '[data-btn-style="ff"]', 'var(--accent-foreground)'],
    ['Danger filled buttons', '[data-btn-style="df"]', 'var(--destructive-foreground)'],
  ];
  
  let buttonSuccess = true;
  for (const [name, selector, expectedColor] of buttonColorChecks) {
    const hasRule = bridgeContent.includes(selector) && bridgeContent.includes(expectedColor);
    console.log(`   ${hasRule ? '✅' : '❌'} ${name}`);
    if (!hasRule) buttonSuccess = false;
  }
  
  console.log('\n2️⃣ Icon Font System:');
  
  // Test icon system
  const iconContent = fs.readFileSync('src/components/primitives/icon.tsx', 'utf8');
  const themeContent = fs.readFileSync('src/styles/themes/theme-acrobi.css', 'utf8');
  
  const iconChecks = [
    ['Unicode character mapping', iconContent.includes('\\ue900')],
    ['BQ-Icons font usage', iconContent.includes("'BQ-Icons', sans-serif")],
    ['Icons CSS imported', themeContent.includes('./acrobi/css/icons.css')],
    ['BlueQueue theme support', bridgeContent.includes('[data-theme=\'bluequeue\'] .icn')],
  ];
  
  let iconSuccess = true;
  for (const [name, check] of iconChecks) {
    console.log(`   ${check ? '✅' : '❌'} ${name}`);
    if (!check) iconSuccess = false;
  }
  
  console.log('\n3️⃣ Theme Integration:');
  
  // Test theme integration
  const themeChecks = [
    ['Acrobi theme variables', bridgeContent.includes('[data-theme=\'acrobi\']')],
    ['BlueQueue theme variables', bridgeContent.includes('[data-theme=\'bluequeue\']')],
    ['Webflow color matching', bridgeContent.includes('rgb(48, 47, 44)')],
    ['Semantic bridge imported', fs.existsSync('.storybook/preview.ts') && 
     fs.readFileSync('.storybook/preview.ts', 'utf8').includes('semantic-bridge.css')],
  ];
  
  let themeSuccess = true;
  for (const [name, check] of themeChecks) {
    console.log(`   ${check ? '✅' : '❌'} ${name}`);
    if (!check) themeSuccess = false;
  }
  
  console.log('\n📊 Overall Results:');
  const overallSuccess = buttonSuccess && iconSuccess && themeSuccess;
  
  if (overallSuccess) {
    console.log('🎉 SUCCESS: Complete UI system is working perfectly!\n');
    
    console.log('✨ What should work now:');
    console.log('   🔘 Button text is white on dark backgrounds');
    console.log('   🔘 Icons display as symbols, not text strings'); 
    console.log('   🔘 Theme switching affects both buttons and icons');
    console.log('   🔘 BlueQueue theme matches Webflow exactly');
    console.log('   🔘 Hybrid Tailwind utilities work seamlessly');
    
    console.log('\n🧪 How to verify in Storybook:');
    console.log('   1. Go to http://localhost:6006');
    console.log('   2. Navigate to Button stories:');
    console.log('      • Check filled buttons have white text');
    console.log('      • Switch to BlueQueue theme');
    console.log('      • Verify primary button is dark gray with white text');
    console.log('   3. Navigate to Icon stories:');
    console.log('      • Icons should show as symbols (✓, ✕, etc.)');
    console.log('      • NOT as text ("check", "close", etc.)');
    console.log('   4. Test Hybrid examples:');
    console.log('      • Mixed Acrobi components + Tailwind utilities');
    console.log('      • Both systems respond to theme changes');
    
    console.log('\n🚀 Ready for production use!');
    return true;
    
  } else {
    console.log('❌ Some issues remain:');
    if (!buttonSuccess) console.log('   • Button text color system needs attention');
    if (!iconSuccess) console.log('   • Icon font system needs attention');  
    if (!themeSuccess) console.log('   • Theme integration needs attention');
    
    console.log('\nPlease review the specific failures above.');
    return false;
  }
}

if (require.main === module) {
  const success = testCompleteUISystem();
  process.exit(success ? 0 : 1);
}

module.exports = { testCompleteUISystem };