#!/usr/bin/env node

/**
 * Button Color Test - Direct CSS Analysis
 * Tests button text colors in both Acrobi and BlueQueue themes
 */

const fs = require('fs');
const path = require('path');

function testButtonColors() {
  console.log('🎨 Testing Button Text Colors in Hybrid Theme System\n');
  
  // Read the semantic bridge CSS
  const bridgePath = 'src/styles/themes/semantic-bridge.css';
  const bridgeContent = fs.readFileSync(bridgePath, 'utf8');
  
  // Read the button CSS  
  const buttonCssPath = 'src/styles/themes/acrobi/css/button.css';
  const buttonContent = fs.readFileSync(buttonCssPath, 'utf8');
  
  console.log('📋 Testing Button Styles and Colors...\n');
  
  // Test that semantic bridge has button color fixes
  const buttonColorFixes = [
    '[data-btn-style="pf"]',
    'var(--primary-foreground)',
    '.label_wrap',
    '.txt', 
    '.icn'
  ];
  
  let bridgeSuccess = true;
  for (const fix of buttonColorFixes) {
    if (!bridgeContent.includes(fix)) {
      console.error(`❌ Missing in semantic bridge: ${fix}`);
      bridgeSuccess = false;
    }
  }
  
  if (bridgeSuccess) {
    console.log('✅ Semantic bridge has button text color fixes');
  }
  
  // Test theme color mappings
  console.log('\n🔵 Testing BlueQueue Theme Colors...');
  
  // Check BlueQueue colors are mapped to semantic variables
  const blueQueueColors = {
    'primary': 'rgb(48, 47, 44)',
    'primary-foreground': 'rgb(255, 254, 255)',
    'background': 'rgb(255, 254, 255)',
    'foreground': 'rgb(29, 28, 26)'
  };
  
  let themeSuccess = true;
  for (const [semantic, expectedRgb] of Object.entries(blueQueueColors)) {
    const pattern = new RegExp(`--${semantic}:\\s*${expectedRgb.replace(/[()]/g, '\\$&')}`);
    if (!pattern.test(bridgeContent)) {
      console.error(`❌ BlueQueue theme missing: --${semantic}: ${expectedRgb}`);
      themeSuccess = false;
    } else {
      console.log(`✅ BlueQueue --${semantic}: ${expectedRgb}`);
    }
  }
  
  console.log('\n📊 Expected Button Behavior:');
  console.log('In Acrobi theme:');
  console.log('  • Primary filled button (pf): Blue background (#1975f0) with white text');
  console.log('  • Neutral filled button (nf): Gray background with white text');
  
  console.log('\nIn BlueQueue theme:');
  console.log('  • Primary filled button (pf): Dark gray background (rgb(48,47,44)) with white text');
  console.log('  • Text should be white (rgb(255,254,255)) on all filled buttons');
  
  console.log('\n🔧 CSS Rule Priority:');
  console.log('1. Original button.css sets color: var(--color--n000)');
  console.log('2. Semantic bridge overrides with !important: var(--primary-foreground)');
  console.log('3. Theme variables map --primary-foreground to correct color');
  
  if (bridgeSuccess && themeSuccess) {
    console.log('\n🎉 SUCCESS: Button text colors should now work correctly!');
    console.log('\nTo verify in Storybook:');
    console.log('1. Go to http://localhost:6006');
    console.log('2. Navigate to Button stories');
    console.log('3. Switch between Acrobi and BlueQueue themes');
    console.log('4. Check that filled buttons always have white text on dark backgrounds');
    
    return true;
  } else {
    console.log('\n❌ Some issues found. Please review the errors above.');
    return false;
  }
}

// Create a test button styles page for manual verification
function createTestPage() {
  const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Button Color Test</title>
    <link rel="stylesheet" href="../styles/globals.css">
    <link rel="stylesheet" href="../styles/themes/theme-acrobi.css">
    <link rel="stylesheet" href="../styles/themes/theme-bluequeue.css">
    <link rel="stylesheet" href="../styles/themes/semantic-bridge.css">
    <style>
        body { 
            font-family: system-ui, sans-serif; 
            padding: 2rem; 
            background: var(--background);
            color: var(--foreground);
            transition: all 0.3s ease;
        }
        .theme-switcher { 
            margin-bottom: 2rem; 
            padding: 1rem; 
            border: 1px solid var(--border); 
            border-radius: 8px;
            background: var(--card);
        }
        .button-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 1rem; 
            margin: 2rem 0;
        }
        .button-demo { 
            padding: 1rem; 
            border: 1px solid var(--border); 
            border-radius: 8px;
            background: var(--card);
        }
        .btn { margin: 0.5rem; }
        h2 { color: var(--foreground); }
        .color-info {
            font-size: 0.875rem;
            color: var(--muted-foreground);
            margin-top: 0.5rem;
        }
    </style>
</head>
<body data-theme="acrobi">
    <div class="theme-switcher">
        <h2>Button Color Test - Hybrid Theme System</h2>
        <p>Switch between themes to verify button text colors work correctly:</p>
        <button onclick="setTheme('acrobi')" class="btn" data-btn-style="pl" data-btn-size="m">
            Acrobi Theme
        </button>
        <button onclick="setTheme('bluequeue')" class="btn" data-btn-style="pl" data-btn-size="m">
            BlueQueue Theme
        </button>
        <div class="color-info">
            Current theme: <span id="current-theme">acrobi</span><br>
            Primary: <span id="primary-color">--</span><br>
            Primary Foreground: <span id="primary-fg-color">--</span>
        </div>
    </div>

    <div class="button-grid">
        <div class="button-demo">
            <h3>Primary Buttons</h3>
            <button class="btn" data-btn-style="pf" data-btn-size="m">Primary Filled</button>
            <button class="btn" data-btn-style="pl" data-btn-size="m">Primary Line</button>
            <button class="btn" data-btn-style="pt" data-btn-size="m">Primary Text</button>
            <div class="color-info">
                Filled button should have white text on colored background
            </div>
        </div>

        <div class="button-demo">
            <h3>Neutral Buttons</h3>
            <button class="btn" data-btn-style="nf" data-btn-size="m">Neutral Filled</button>
            <button class="btn" data-btn-style="nl" data-btn-size="m">Neutral Line</button>
            <button class="btn" data-btn-style="nt" data-btn-size="m">Neutral Text</button>
            <div class="color-info">
                Filled button should have white text on gray background
            </div>
        </div>

        <div class="button-demo">
            <h3>Other Variants</h3>
            <button class="btn" data-btn-style="ff" data-btn-size="m">Focus Filled</button>
            <button class="btn" data-btn-style="df" data-btn-size="m">Danger Filled</button>
            <button class="btn" data-btn-style="wf" data-btn-size="m">Warning Filled</button>
            <div class="color-info">
                All filled buttons should have readable text colors
            </div>
        </div>

        <div class="button-demo">
            <h3>Button Sizes</h3>
            <button class="btn" data-btn-style="pf" data-btn-size="xs">Extra Small</button>
            <button class="btn" data-btn-style="pf" data-btn-size="s">Small</button>
            <button class="btn" data-btn-style="pf" data-btn-size="m">Medium</button>
            <button class="btn" data-btn-style="pf" data-btn-size="l">Large</button>
            <div class="color-info">
                Text color should be consistent across all sizes
            </div>
        </div>
    </div>

    <script>
        function setTheme(themeName) {
            document.body.setAttribute('data-theme', themeName);
            document.getElementById('current-theme').textContent = themeName;
            updateColorInfo();
        }

        function updateColorInfo() {
            const computedStyle = getComputedStyle(document.body);
            const primary = computedStyle.getPropertyValue('--primary').trim();
            const primaryFg = computedStyle.getPropertyValue('--primary-foreground').trim();
            
            document.getElementById('primary-color').textContent = primary || 'undefined';
            document.getElementById('primary-fg-color').textContent = primaryFg || 'undefined';
        }

        // Update color info on load
        updateColorInfo();
    </script>
</body>
</html>`;

  const testDir = './src/test';
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(testDir, 'button-color-test.html'), testHtml);
  console.log('✅ Created test page: src/test/button-color-test.html');
  console.log('   Open this file in a browser to visually test button colors');
}

// Run the tests
if (require.main === module) {
  const success = testButtonColors();
  createTestPage();
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Check Storybook: http://localhost:6006');
  console.log('2. Open test page: open src/test/button-color-test.html');
  console.log('3. Verify button text is visible on dark backgrounds');
  
  process.exit(success ? 0 : 1);
}

module.exports = { testButtonColors };