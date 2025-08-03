#!/usr/bin/env node

/**
 * Neutral Button Color Test
 * Tests that neutral buttons use proper gray colors and white text
 */

const fs = require('fs');

function testNeutralButtonColors() {
  console.log('🔘 Testing Neutral Button Colors...\n');
  
  // Read the semantic bridge content
  const bridgeContent = fs.readFileSync('src/styles/themes/semantic-bridge.css', 'utf8');
  
  console.log('1️⃣ Semantic Variable Definitions:');
  
  // Test neutral color definitions
  const neutralChecks = [
    ['Root neutral variable', '--neutral: var(--color--n500)'],
    ['Root neutral-foreground variable', '--neutral-foreground: var(--color--n000)'],
    ['Acrobi theme neutral', '[data-theme=\'acrobi\'].*--neutral: var\\(--color--n500\\)'],
    ['BlueQueue theme neutral', '[data-theme=\'bluequeue\'].*--neutral: rgb\\(156, 156, 156\\)'],
  ];
  
  let semanticSuccess = true;
  for (const [name, pattern] of neutralChecks) {
    const regex = new RegExp(pattern);
    const hasPattern = regex.test(bridgeContent);
    console.log(`   ${hasPattern ? '✅' : '❌'} ${name}`);
    if (!hasPattern) semanticSuccess = false;
  }
  
  console.log('\n2️⃣ Button Style Overrides:');
  
  // Test neutral button overrides
  const buttonChecks = [
    ['Neutral background override', '\\[data-btn-style="nf"\\].*background: var\\(--neutral\\)'],
    ['Neutral border override', '\\[data-btn-style="nf"\\].*border-color: var\\(--neutral\\)'],
    ['Neutral text color', '\\[data-btn-style="nf"\\].*color: var\\(--neutral-foreground\\)'],
    ['Label text color override', '\\.label.*color: var\\(--neutral-foreground\\)'],
  ];
  
  let buttonSuccess = true;
  for (const [name, pattern] of buttonChecks) {
    const regex = new RegExp(pattern);
    const hasPattern = regex.test(bridgeContent);
    console.log(`   ${hasPattern ? '✅' : '❌'} ${name}`);
    if (!hasPattern) buttonSuccess = false;
  }
  
  console.log('\n3️⃣ Utility Classes:');
  
  // Test utility classes
  const utilityChecks = [
    ['bg-neutral utility', '\\.bg-neutral.*background-color: var\\(--neutral\\)'],
    ['text-neutral-foreground utility', '\\.text-neutral-foreground.*color: var\\(--neutral-foreground\\)'],
  ];
  
  let utilitySuccess = true;
  for (const [name, pattern] of utilityChecks) {
    const regex = new RegExp(pattern);
    const hasPattern = regex.test(bridgeContent);
    console.log(`   ${hasPattern ? '✅' : '❌'} ${name}`);
    if (!hasPattern) utilitySuccess = false;
  }
  
  console.log('\n4️⃣ Expected Colors by Theme:');
  
  console.log('   🎨 Acrobi Theme:');
  console.log('      • Neutral button background: var(--color--n500) = #9a9a9a (gray)');
  console.log('      • Neutral button text: var(--color--n000) = white');
  
  console.log('   🎨 BlueQueue Theme:');  
  console.log('      • Neutral button background: rgb(156, 156, 156) (medium gray)');
  console.log('      • Neutral button text: rgb(255, 254, 255) (white)');
  
  console.log('\n📊 Test Results:');
  const overallSuccess = semanticSuccess && buttonSuccess && utilitySuccess;
  
  if (overallSuccess) {
    console.log('🎉 SUCCESS: Neutral button colors are properly configured!\n');
    
    console.log('✨ What should work now:');
    console.log('   🔘 Neutral filled buttons (nf) have gray backgrounds');
    console.log('   🔘 Neutral button text is white for good contrast');
    console.log('   🔘 Colors are different from primary buttons');
    console.log('   🔘 Both themes have appropriate neutral gray colors');
    console.log('   🔘 Tailwind bg-neutral utilities work');
    
    console.log('\n🧪 How to verify in Storybook:');
    console.log('   1. Go to http://localhost:6006');
    console.log('   2. Navigate to Button stories');
    console.log('   3. Look for neutral filled buttons (styling="nf")');
    console.log('   4. Should see gray background with white text');
    console.log('   5. Switch to BlueQueue theme');
    console.log('   6. Neutral buttons should remain gray (not dark like primary)');
    
    return true;
    
  } else {
    console.log('❌ Some issues found:');
    if (!semanticSuccess) console.log('   • Semantic variable definitions need attention');
    if (!buttonSuccess) console.log('   • Button style overrides need attention');
    if (!utilitySuccess) console.log('   • Utility classes need attention');
    
    return false;
  }
}

if (require.main === module) {
  const success = testNeutralButtonColors();
  process.exit(success ? 0 : 1);
}

module.exports = { testNeutralButtonColors };