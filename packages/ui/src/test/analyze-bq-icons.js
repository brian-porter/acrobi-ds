#!/usr/bin/env node

/**
 * BQ-Icons Font Analysis
 * Analyzes the BQ-Icons font to understand its character mappings
 */

const fs = require('fs');
const path = require('path');

function analyzeBQIconsFont() {
  console.log('🔍 Analyzing BQ-Icons Font...\n');
  
  // Check if font files exist
  const fontDir = './src/styles/themes/acrobi/fonts';
  const fontFiles = [
    'BQ Icons.woff2',
    'BQ Icons.woff', 
    'BQ Icons.ttf',
    'BQ Icons.eot'
  ];
  
  console.log('📁 Font Files Status:');
  for (const file of fontFiles) {
    const filePath = path.join(fontDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✅ ${file}: ${(stats.size / 1024).toFixed(1)} KB`);
    } else {
      console.log(`❌ ${file}: Not found`);
    }
  }
  
  console.log('\n🎯 Common Icon Font Issues & Solutions:\n');
  
  console.log('1. **Character Mapping Issues**');
  console.log('   • Icon fonts often use Unicode private use area');
  console.log('   • Text like "default" may not map to actual icons');
  console.log('   • Need to use correct Unicode characters or CSS content');
  
  console.log('\n2. **Possible Solutions**');
  console.log('   a) Use Unicode characters instead of text:');
  console.log('      Example: "\\ue001" instead of "default"');
  
  console.log('\n   b) Use CSS pseudo-elements with content:');
  console.log('      .icon-default::before { content: "\\ue001"; }');
  
  console.log('\n   c) Use CSS font-feature-settings for ligatures:');
  console.log('      font-feature-settings: "liga" on;');
  
  console.log('\n🔧 Recommended Fixes:\n');
  
  // Check if there's an icon mapping file or CSS with character codes
  const possibleMappingFiles = [
    './src/styles/themes/acrobi/css/icons.css',
    './src/styles/themes/acrobi/icons.json',
    './src/styles/icons.css',
    './docs/icons.md'
  ];
  
  console.log('📋 Looking for icon mapping files...');
  let mappingFound = false;
  for (const file of possibleMappingFiles) {
    if (fs.existsSync(file)) {
      console.log(`✅ Found: ${file}`);
      mappingFound = true;
    }
  }
  
  if (!mappingFound) {
    console.log('⚠️  No icon mapping files found');
  }
  
  console.log('\n💡 Next Steps:');
  console.log('1. Create icon character mapping');
  console.log('2. Update Icon component to use Unicode characters');
  console.log('3. Add CSS rules for icon display');
  console.log('4. Test in browser with font inspector');
  
  return generateIconFix();
}

function generateIconFix() {
  console.log('\n🔧 Generating Icon Fix...\n');
  
  // Common icon font Unicode mappings (these are typical ranges)
  const commonIconMappings = {
    'default': '\\ue900', // Usually the first icon
    'close': '\\ue901',
    'check': '\\ue902', 
    'arrow': '\\ue903',
    'plus': '\\ue904',
    'minus': '\\ue905',
    'search': '\\ue906',
    'menu': '\\ue907',
    'home': '\\ue908',
    'user': '\\ue909',
    'settings': '\\ue90a'
  };
  
  console.log('📝 Suggested Icon Component Update:');
  console.log('```typescript');
  console.log('// Map icon names to Unicode characters');
  console.log('const getIconCharacter = (name: string): string => {');
  console.log('  const iconMap: Record<string, string> = {');
  
  for (const [name, unicode] of Object.entries(commonIconMappings)) {
    console.log(`    '${name}': '${unicode}',`);
  }
  
  console.log('  };');
  console.log('  return iconMap[name] || name;');
  console.log('};');
  console.log('```');
  
  console.log('\n📝 Alternative CSS-based approach:');
  console.log('```css');
  console.log('/* Icon classes with CSS content */');
  
  for (const [name, unicode] of Object.entries(commonIconMappings)) {
    console.log(`.icon-${name}::before {`);
    console.log(`  content: "${unicode}";`);
    console.log(`  font-family: 'BQ-Icons', sans-serif;`);
    console.log('}');
  }
  
  console.log('```');
  
  return commonIconMappings;
}

if (require.main === module) {
  analyzeBQIconsFont();
}

module.exports = { analyzeBQIconsFont };