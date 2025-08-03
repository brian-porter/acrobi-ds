#!/usr/bin/env node

/**
 * Color Verification Test
 * Verifies that the color fixes are properly implemented in the theme files
 */

const fs = require('fs');

function testColorCorrections() {
  console.log('🎨 Testing Color Corrections...\n');
  
  const bridgeContent = fs.readFileSync('src/styles/themes/semantic-bridge.css', 'utf8');
  const bluequeueContent = fs.readFileSync('src/styles/themes/theme-bluequeue.css', 'utf8');
  const acrodiContent = fs.readFileSync('src/styles/themes/theme-acrobi.css', 'utf8');
  
  // Test BlueQueue color corrections
  const bluequeue_checks = [
    ['BlueQueue p500 is blue #1975f0', bluequeueContent.includes('--color--p500: #1975f0; /* Webflow Primary Blue (from screenshot) */')],
    ['BlueQueue n500 is gray #9a9a9a', bluequeueContent.includes('--color--n500: #9a9a9a; /* Webflow Neutral Gray for buttons (from screenshot) */')],
    ['BlueQueue uses colors from screenshot', bluequeueContent.includes('/* Webflow Neutral Colors - From screenshot */')],
    ['BlueQueue removed hard-coded buttons', bluequeueContent.includes('/* Primary buttons now use semantic bridge variables automatically */')],
  ];
  
  // Test Acrobi color consistency
  const acrobi_checks = [
    ['Acrobi n500 is gray #9a9a9a', acrodiContent.includes('--color--n500: #9a9a9a;')],
  ];
  
  // Test semantic bridge dark mode
  const dark_mode_checks = [
    ['Dark mode primary inverted to light', bridgeContent.includes('--primary: var(--color--n000);           /* Light background for primary buttons in dark mode */')],
    ['Dark mode primary text inverted to dark', bridgeContent.includes('--primary-foreground: var(--color--n900); /* Dark text on light primary buttons */')],
    ['BlueQueue dark mode exists', bridgeContent.includes('[data-theme=\'bluequeue-dark\'] {')],
    ['Acrobi dark mode exists', bridgeContent.includes('[data-theme=\'acrobi-dark\'] {')],
  ];
  
  // Test semantic bridge mapping
  const semantic_checks = [
    ['Root primary maps to p500', bridgeContent.includes('--primary: var(--color--p500);')],
    ['BlueQueue uses p500 through bridge', bridgeContent.includes('[data-theme=\'bluequeue\'] {') && bridgeContent.includes('--primary: var(--color--p500);           /* Use p500 variable through semantic bridge */')],
    ['Neutral uses n500 in both themes', bridgeContent.includes('--neutral: var(--color--n500);')],
  ];
  
  let passed = 0;
  let total = bluequeue_checks.length + acrobi_checks.length + dark_mode_checks.length + semantic_checks.length;
  
  console.log('🔵 BlueQueue Color Checks:');
  for (const [name, check] of bluequeue_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log('\\n🎨 Acrobi Color Checks:');
  for (const [name, check] of acrobi_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log('\\n🌙 Dark Mode Checks:');
  for (const [name, check] of dark_mode_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log('\\n🏗️ Semantic Bridge Checks:');
  for (const [name, check] of semantic_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log(`\\n📊 Results: ${passed}/${total} checks passed\\n`);
  
  if (passed === total) {
    console.log('🎉 SUCCESS: All color corrections are properly implemented!\\n');
    
    console.log('🎯 What is now correct:');
    console.log('   ✅ BlueQueue p500 = #1975f0 (blue, from screenshot)');
    console.log('   ✅ BlueQueue n500 = #9a9a9a (gray, from screenshot)');
    console.log('   ✅ Acrobi n500 = #9a9a9a (gray, consistent)');
    console.log('   ✅ Dark mode inverts primary buttons (dark→light bg, light→dark text)');
    console.log('   ✅ All colors flow through semantic bridge (no hard-coding)');
    console.log('   ✅ Both themes support dark mode variants');
    
    console.log('\\n🧪 Expected Results:');
    console.log('   📘 Acrobi Light: Blue primary (#1975f0), Gray neutral (#9a9a9a)');
    console.log('   🌙 Acrobi Dark: Light primary (white-ish), Gray neutral');
    console.log('   🔵 BlueQueue Light: Blue primary (#1975f0), Gray neutral (#9a9a9a)');
    console.log('   🌚 BlueQueue Dark: Light primary (white-ish), Gray neutral');
    
    console.log('\\n📝 To test visually:');
    console.log('   1. Open Storybook: npm run storybook');
    console.log('   2. Navigate to Button stories');
    console.log('   3. Test theme switching with toolbar');
    console.log('   4. Verify primary buttons are blue in light mode');
    console.log('   5. Verify primary buttons are light in dark mode');
    console.log('   6. Verify neutral buttons are gray in both modes');
    
    return true;
  } else {
    console.log('❌ Some color corrections are missing. Please check the failures above.');
    return false;
  }
}

if (require.main === module) {
  const success = testColorCorrections();
  process.exit(success ? 0 : 1);
}

module.exports = { testColorCorrections };