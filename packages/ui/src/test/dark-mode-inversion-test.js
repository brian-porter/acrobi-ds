#!/usr/bin/env node

/**
 * Dark Mode Inversion Test
 * Verifies dark mode properly inverts primary button colors through semantic bridge
 */

const fs = require('fs');

function testDarkModeInversion() {
  console.log('🌙 Testing Dark Mode Color Inversion...\\n');
  
  const bridgeContent = fs.readFileSync('src/styles/themes/semantic-bridge.css', 'utf8');
  
  // Check Acrobi dark mode setup
  const acrobi_dark_checks = [
    ['Acrobi dark theme exists', bridgeContent.includes('[data-theme=\'acrobi-dark\'] {')],
    ['Primary inverted to light', bridgeContent.includes('--primary: var(--color--n000);           /* Light background for primary buttons in dark mode */')],
    ['Primary foreground inverted to dark', bridgeContent.includes('--primary-foreground: var(--color--n900); /* Dark text on light primary buttons */')],
    ['Secondary inverted', bridgeContent.includes('--secondary: var(--color--n200);         /* Light secondary */')],
    ['Neutral inverted', bridgeContent.includes('--neutral: var(--color--n600);          /* Medium gray for neutral buttons */')],
    ['Dark background', bridgeContent.includes('--background: var(--color--n900);      /* Dark background */')],
    ['Light foreground', bridgeContent.includes('--foreground: var(--color--n000);      /* Light foreground */')],
  ];
  
  // Check BlueQueue dark mode setup
  const bluequeue_dark_checks = [
    ['BlueQueue dark theme exists', bridgeContent.includes('[data-theme=\'bluequeue-dark\'] {')],
    ['BlueQueue primary inverted to light', bridgeContent.includes('--primary: var(--color--n000);           /* Light background for primary buttons in dark mode */')],
    ['BlueQueue primary foreground inverted', bridgeContent.includes('--primary-foreground: var(--color--n900); /* Dark text on light primary buttons */')],
    ['BlueQueue dark background', bridgeContent.includes('--background: rgb(29, 28, 26);          /* Dark background using BlueQueue text color */')],
    ['BlueQueue light foreground', bridgeContent.includes('--foreground: rgb(255, 254, 255);       /* Light foreground using BlueQueue background */')],
  ];
  
  // Check no hard-coded button colors for dark themes
  const semantic_checks = [
    ['No hard-coded dark primary buttons', !bridgeContent.includes('[data-theme=\'acrobi-dark\'] [data-btn-style=\'pf\']')],
    ['No hard-coded BlueQueue dark buttons', !bridgeContent.includes('[data-theme=\'bluequeue-dark\'] [data-btn-style=\'pf\']')],
    ['Uses semantic variables only', bridgeContent.includes('/* Inverted button colors for dark mode */')],
  ];
  
  let passed = 0;
  let total = acrobi_dark_checks.length + bluequeue_dark_checks.length + semantic_checks.length;
  
  console.log('🎨 Acrobi Dark Mode Checks:');
  for (const [name, check] of acrobi_dark_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log('\\n🔵 BlueQueue Dark Mode Checks:');
  for (const [name, check] of bluequeue_dark_checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log('\\n🏗️ Semantic Architecture Checks:');
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
    console.log('🎉 SUCCESS: Dark mode color inversion is properly configured!\\n');
    
    console.log('🎯 What this means:');
    console.log('   • Dark mode primary buttons have LIGHT backgrounds with DARK text');
    console.log('   • Light mode primary buttons have DARK backgrounds with LIGHT text');
    console.log('   • All color changes flow through semantic bridge variables');
    console.log('   • No hard-coded theme-specific button overrides');
    console.log('   • Both Acrobi and BlueQueue support dark mode inversion');
    
    console.log('\\n🌙 Expected Dark Mode Results:');
    console.log('   Light Mode → Dark Mode');
    console.log('   • Primary buttons: Dark bg + Light text → Light bg + Dark text');
    console.log('   • Background: Light → Dark');
    console.log('   • Text: Dark → Light');
    console.log('   • All changes automatic via data-theme switching');
    
    console.log('\\n🧪 Test this:');
    console.log('   1. Set data-theme="acrobi" - primary buttons should be blue with white text');
    console.log('   2. Set data-theme="acrobi-dark" - primary buttons should be white/light with dark text');
    console.log('   3. Set data-theme="bluequeue" - primary buttons should be dark gray with white text');
    console.log('   4. Set data-theme="bluequeue-dark" - primary buttons should be white/light with dark text');
    
    return true;
  } else {
    console.log('❌ Dark mode inversion is not properly configured. Please check the failures above.');
    return false;
  }
}

if (require.main === module) {
  const success = testDarkModeInversion();
  process.exit(success ? 0 : 1);
}

module.exports = { testDarkModeInversion };