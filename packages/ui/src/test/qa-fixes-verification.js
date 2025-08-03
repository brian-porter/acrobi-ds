#!/usr/bin/env node

/**
 * QA Fixes Verification Test
 * Verifies that the QA swarm identified fixes have been properly implemented
 */

const fs = require('fs');

function verifyQAFixes() {
  console.log('🔍 Verifying QA Swarm Fixes Implementation...\n');
  
  const bridgeContent = fs.readFileSync('src/styles/themes/semantic-bridge.css', 'utf8');
  const previewContent = fs.readFileSync('.storybook/preview.ts', 'utf8');
  
  // QA Fix #1: HSL Primary Color Correction
  const hsl_checks = [
    ['HSL primary corrected to blue', bridgeContent.includes('--primary-hsl: 217 89% 51%;          /* #1975f0 as HSL - CORRECTED from QA analysis */')],
    ['Old incorrect HSL removed', !bridgeContent.includes('--primary-hsl: 30 41% 18%;')],
  ];
  
  // QA Fix #2: Storybook Dark Mode Suffix Preservation  
  const storybook_checks = [
    ['Storybook line 123 fixed', !previewContent.includes('selectedTheme.replace(\'-light\', \'\').replace(\'-dark\', \'\')')],
    ['Document attribute preserves theme name', previewContent.includes('document.documentElement.setAttribute(\'data-theme\', selectedTheme);')],
    ['React element preserves theme name', previewContent.includes('\'data-theme\': selectedTheme,')],
  ];
  
  // QA Fix #3: Missing BlueQueue Dark Mode HSL
  const dark_mode_hsl_checks = [
    ['BlueQueue dark mode accent HSL added', bridgeContent.includes('--accent-hsl: 217 89% 51%;            /* Missing accent HSL for BlueQueue dark mode */')],
  ];
  
  // Combined validation
  const all_checks = [
    ...hsl_checks.map(check => ['HSL Fix: ' + check[0], check[1]]),
    ...storybook_checks.map(check => ['Storybook Fix: ' + check[0], check[1]]),
    ...dark_mode_hsl_checks.map(check => ['Dark Mode Fix: ' + check[0], check[1]]),
  ];
  
  let passed = 0;
  let total = all_checks.length;
  
  console.log('🔵 Primary Button Color Fix Verification:');
  for (const [name, check] of hsl_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log('\\n🌙 Dark Mode Fix Verification:');
  for (const [name, check] of storybook_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log('\\n🎨 Additional HSL Fix Verification:');
  for (const [name, check] of dark_mode_hsl_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log(`\\n📊 QA Fixes Verification: ${passed}/${total} fixes confirmed\\n`);
  
  if (passed === total) {
    console.log('🎉 SUCCESS: All QA identified fixes have been properly implemented!\\n');
    
    console.log('🎯 What should now work:');
    console.log('   ✅ BlueQueue primary buttons should be BLUE (#1975f0) not dark/black');
    console.log('   ✅ Dark mode theme switching should work in Storybook');
    console.log('   ✅ acrobi-dark and bluequeue-dark themes should apply properly');
    console.log('   ✅ Primary buttons should invert to light backgrounds in dark mode');
    console.log('   ✅ All HSL color values should be consistent');
    
    console.log('\\n🚀 Next Steps:');
    console.log('   1. Restart Storybook: Ctrl+C then npm run dev');
    console.log('   2. Navigate to Button stories');
    console.log('   3. Test BlueQueue theme - buttons should be blue');
    console.log('   4. Test BlueQueue Dark - buttons should be light/white');
    console.log('   5. Verify all theme switching works properly');
    
    console.log('\\n⚠️  IMPORTANT: Storybook needs restart to apply preview.ts changes!');
    
    return true;
  } else {
    console.log('❌ Some QA fixes were not properly implemented. Please check the failures above.');
    return false;
  }
}

if (require.main === module) {
  const success = verifyQAFixes();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyQAFixes };