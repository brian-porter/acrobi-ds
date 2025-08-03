#!/usr/bin/env node

/**
 * Simple Neutral Button Test
 * Verifies neutral button semantic variables are properly set up
 */

const fs = require('fs');

function testNeutralButtons() {
  console.log('🔘 Testing Neutral Button Setup...\n');
  
  const bridgeContent = fs.readFileSync('src/styles/themes/semantic-bridge.css', 'utf8');
  
  // Simple checks for key content
  const checks = [
    ['Neutral variable defined', bridgeContent.includes('--neutral: var(--color--n500)')],
    ['Neutral foreground defined', bridgeContent.includes('--neutral-foreground: var(--color--n000)')],
    ['Acrobi neutral color', bridgeContent.includes('--neutral: var(--color--n500);         /* #9a9a9a')],
    ['BlueQueue neutral color', bridgeContent.includes('--neutral: var(--color--n500);            /* Use BlueQueue')],
    ['Neutral button override', bridgeContent.includes('[data-btn-style="nf"]')],
    ['Neutral background rule', bridgeContent.includes('background: var(--neutral)')],
    ['Neutral text rule', bridgeContent.includes('color: var(--neutral-foreground)')],
    ['bg-neutral utility', bridgeContent.includes('.bg-neutral')],
  ];
  
  let passed = 0;
  let total = checks.length;
  
  for (const [name, check] of checks) {
    if (check) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  }
  
  console.log(`\n📊 Results: ${passed}/${total} checks passed\n`);
  
  if (passed === total) {
    console.log('🎉 SUCCESS: Neutral button system is properly configured!\n');
    
    console.log('🎯 What this means:');
    console.log('   • Neutral filled buttons (nf) will have gray backgrounds');
    console.log('   • Text on neutral buttons will be white');
    console.log('   • Acrobi theme: Medium gray (#9a9a9a)');
    console.log('   • BlueQueue theme: Custom gray (rgb(156, 156, 156))');
    console.log('   • Tailwind utilities like bg-neutral available');
    
    console.log('\n🧪 Test in Storybook:');
    console.log('   1. Navigate to Button stories');
    console.log('   2. Look for neutral buttons (styling="nf")');
    console.log('   3. Should see gray background, not blue');
    console.log('   4. Text should be white for good contrast');
    console.log('   5. Switch themes - neutral stays gray in both');
    
    return true;
  } else {
    console.log('❌ Some configuration is missing. Please check the failures above.');
    return false;
  }
}

if (require.main === module) {
  const success = testNeutralButtons();
  process.exit(success ? 0 : 1);
}

module.exports = { testNeutralButtons };