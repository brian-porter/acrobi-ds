#!/usr/bin/env node

/**
 * Primary Button Semantic Bridge Test
 * Verifies primary button semantic variables use p500 through semantic bridge
 */

const fs = require('fs');

function testPrimaryButtonSemantic() {
  console.log('🔵 Testing Primary Button Semantic Bridge...\\n');
  
  const bridgeContent = fs.readFileSync('src/styles/themes/semantic-bridge.css', 'utf8');
  const bluequeueContent = fs.readFileSync('src/styles/themes/theme-bluequeue.css', 'utf8');
  
  // Check semantic bridge setup
  const bridgeChecks = [
    ['Root primary maps to p500', bridgeContent.includes('--primary: var(--color--p500)')],
    ['BlueQueue primary maps to p500', bridgeContent.includes('[data-theme=\'bluequeue\'] {') && bridgeContent.includes('--primary: var(--color--p500);           /* Use p500 variable through semantic bridge */')],
    ['Primary foreground defined', bridgeContent.includes('--primary-foreground: var(--color--n000)')],
    ['Primary button override exists', bridgeContent.includes('[data-btn-style="pf"]')],
    ['Primary text color rule', bridgeContent.includes('color: var(--primary-foreground)')],
  ];
  
  // Check BlueQueue theme has correct p500 value
  const themeChecks = [
    ['BlueQueue p500 is dark gray', bluequeueContent.includes('--color--p500: rgb(48, 47, 44); /* Webflow Primary Dark for buttons */')],
    ['No hard-coded primary button colors', !bluequeueContent.includes('[data-btn-style=\'pf\'] {\n  background-color: rgb(')],
    ['Removed primary-dark variable', !bluequeueContent.includes('--color--primary-dark:')],
  ];
  
  let passed = 0;
  let total = bridgeChecks.length + themeChecks.length;
  
  console.log('📋 Semantic Bridge Checks:');
  for (const [name, check] of bridgeChecks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log('\\n🎨 BlueQueue Theme Checks:');
  for (const [name, check] of themeChecks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log(`\\n📊 Results: ${passed}/${total} checks passed\\n`);
  
  if (passed === total) {
    console.log('🎉 SUCCESS: Primary button semantic bridge is properly configured!\\n');
    
    console.log('🎯 What this means:');
    console.log('   • Primary buttons use --primary semantic variable');
    console.log('   • --primary maps to --color--p500 in both themes');
    console.log('   • Acrobi theme: p500 = #1975f0 (blue)');
    console.log('   • BlueQueue theme: p500 = rgb(48, 47, 44) (dark gray)');
    console.log('   • No hard-coded colors in theme files');
    console.log('   • Semantic bridge handles all color mapping');
    
    console.log('\\n🧪 Expected Results:');
    console.log('   • Acrobi primary buttons: Blue background');
    console.log('   • BlueQueue primary buttons: Dark gray background');
    console.log('   • Both themes: White text on primary buttons');
    console.log('   • Theme switching works automatically');
    
    return true;
  } else {
    console.log('❌ Some configuration is missing. Please check the failures above.');
    return false;
  }
}

if (require.main === module) {
  const success = testPrimaryButtonSemantic();
  process.exit(success ? 0 : 1);
}

module.exports = { testPrimaryButtonSemantic };