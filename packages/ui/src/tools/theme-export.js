#!/usr/bin/env node

/**
 * Automated Theme Export Tools
 * Generates theme configurations, CSS files, and documentation
 */

const fs = require('fs');
const path = require('path');

// Utility functions
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFileWithLog(filePath, content, description) {
  fs.writeFileSync(filePath, content);
  console.log(`✅ Generated ${description}: ${path.relative(process.cwd(), filePath)}`);
}

// Color conversion utilities
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function parseRgbValue(rgbString) {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

// Theme definitions
const themes = {
  acrobi: {
    name: 'Acrobi',
    description: 'Default Acrobi Design System theme',
    colors: {
      primary: '#1975f0',
      'primary-foreground': '#fefefe',
      secondary: '#beef10', 
      'secondary-foreground': '#1d1c1a',
      background: '#fefefe',
      foreground: '#1d1c1a',
      muted: '#c4c4c4',
      'muted-foreground': '#6d6d6d',
      border: '#c4c4c4',
      input: '#e5e5e5',
      ring: '#1975f0',
      accent: '#00abd2',
      'accent-foreground': '#fefefe',
      destructive: '#ed1c24',
      'destructive-foreground': '#fefefe',
      warning: '#ff8000',
      'warning-foreground': '#fefefe',
      success: '#00b400',
      'success-foreground': '#fefefe',
      card: '#fefefe',
      'card-foreground': '#1d1c1a',
    }
  },
  bluequeue: {
    name: 'BlueQueue',
    description: 'Webflow-matching theme for BlueQueue brand',
    colors: {
      primary: 'rgb(48, 47, 44)',
      'primary-foreground': 'rgb(255, 254, 255)',
      secondary: 'rgb(196, 196, 196)',
      'secondary-foreground': 'rgb(29, 28, 26)',
      background: 'rgb(255, 254, 255)',
      foreground: 'rgb(29, 28, 26)',
      muted: 'rgb(196, 196, 196)',
      'muted-foreground': 'rgb(109, 109, 109)',
      border: 'rgb(196, 196, 196)',
      input: 'rgb(255, 254, 255)',
      ring: 'rgb(25, 117, 240)',
      accent: 'rgb(25, 117, 240)',
      'accent-foreground': 'rgb(255, 254, 255)',
      destructive: 'rgb(220, 38, 38)',
      'destructive-foreground': 'rgb(255, 254, 255)',
      warning: 'rgb(217, 119, 6)',
      'warning-foreground': 'rgb(255, 254, 255)',
      success: 'rgb(34, 197, 94)',
      'success-foreground': 'rgb(255, 254, 255)',
      card: 'rgb(255, 254, 255)',
      'card-foreground': 'rgb(29, 28, 26)',
    }
  }
};

// Export functions
function exportThemeCSS(themeName, themeData, outputDir) {
  const css = `/**
 * ${themeData.name} Theme
 * ${themeData.description}
 * Generated automatically - do not edit manually
 */

[data-theme='${themeName}'] {
${Object.entries(themeData.colors).map(([key, value]) => 
  `  --${key}: ${value};`
).join('\n')}
}

/* HSL versions for Tailwind compatibility */
[data-theme='${themeName}'] {
${Object.entries(themeData.colors).map(([key, value]) => {
  const rgb = parseRgbValue(value) || [0, 0, 0];
  const [h, s, l] = rgbToHsl(...rgb);
  return `  --${key}-hsl: ${h} ${s}% ${l}%;`;
}).join('\n')}
}
`;

  const filePath = path.join(outputDir, `theme-${themeName}.css`);
  writeFileWithLog(filePath, css, `${themeData.name} theme CSS`);
  return filePath;
}

function exportTailwindConfig(themeName, themeData, outputDir) {
  const hslColors = {};
  Object.entries(themeData.colors).forEach(([key, value]) => {
    const rgb = parseRgbValue(value) || [0, 0, 0];
    const [h, s, l] = rgbToHsl(...rgb);
    hslColors[key] = `${h} ${s}% ${l}%`;
  });

  const config = `/**
 * Tailwind Config for ${themeData.name} Theme
 * ${themeData.description}
 * Generated automatically - do not edit manually
 */

module.exports = {
  theme: {
    extend: {
      colors: {
${Object.entries(themeData.colors).map(([key, value]) => 
  key.includes('-') 
    ? `        '${key}': '${value}',`
    : `        ${key}: '${value}',`
).join('\n')}
      },
      // HSL versions for opacity support
      hslColors: {
${Object.entries(hslColors).map(([key, value]) => 
  key.includes('-')
    ? `        '${key}': '${value}',`
    : `        ${key}: '${value}',`
).join('\n')}
      }
    }
  }
};
`;

  const filePath = path.join(outputDir, `tailwind-${themeName}.config.js`);
  writeFileWithLog(filePath, config, `${themeData.name} Tailwind config`);
  return filePath;
}

function exportTypeScriptTypes(outputDir) {
  const colorKeys = Object.keys(themes.acrobi.colors);
  
  const types = `/**
 * Theme System TypeScript Types
 * Generated automatically - do not edit manually
 */

export type ThemeName = ${Object.keys(themes).map(name => `'${name}'`).join(' | ')};

export type SemanticColorKey = ${colorKeys.map(key => `'${key}'`).join(' | ')};

export interface ThemeColors {
${colorKeys.map(key => `  '${key}': string;`).join('\n')}
}

export interface Theme {
  name: string;
  description: string;
  colors: ThemeColors;
}

export interface ThemeConfig {
  [themeName: string]: Theme;
}

export const THEME_NAMES: ThemeName[] = [${Object.keys(themes).map(name => `'${name}'`).join(', ')}];

export const SEMANTIC_COLOR_KEYS: SemanticColorKey[] = [
${colorKeys.map(key => `  '${key}',`).join('\n')}
];
`;

  const filePath = path.join(outputDir, 'theme-types.ts');
  writeFileWithLog(filePath, types, 'TypeScript theme types');
  return filePath;
}

function exportThemeJSON(outputDir) {
  const json = JSON.stringify(themes, null, 2);
  const filePath = path.join(outputDir, 'themes.json');
  writeFileWithLog(filePath, json, 'Theme configuration JSON');
  return filePath;
}

function exportDocumentation(outputDir) {
  const docs = `# Generated Theme Documentation

This documentation is automatically generated from the theme configuration.

## Available Themes

${Object.entries(themes).map(([themeName, themeData]) => `
### ${themeData.name} (\`${themeName}\`)

${themeData.description}

**Usage:**
\`\`\`html
<div data-theme="${themeName}">
  <!-- Your content -->
</div>
\`\`\`

**Colors:**
${Object.entries(themeData.colors).map(([key, value]) => 
`- \`--${key}\`: ${value}`).join('\n')}
`).join('\n')}

## CSS Variable Usage

All themes provide the same semantic variables:

\`\`\`css
.my-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--border);
}
\`\`\`

## Tailwind Integration

Use the generated Tailwind utilities:

\`\`\`html
<div class="bg-primary text-primary-foreground border border-border">
  Themed content
</div>
\`\`\`

## JavaScript/TypeScript

\`\`\`typescript
import { ThemeName, THEME_NAMES } from './theme-types';

function setTheme(theme: ThemeName) {
  document.documentElement.setAttribute('data-theme', theme);
}
\`\`\`

Generated on: ${new Date().toISOString()}
`;

  const filePath = path.join(outputDir, 'README.md');
  writeFileWithLog(filePath, docs, 'theme documentation');
  return filePath;
}

function exportPackageJSON(outputDir) {
  const packageJson = {
    name: "@acrobi/themes",
    version: "1.0.0",
    description: "Generated theme configurations for Acrobi Design System",
    main: "themes.json",
    types: "theme-types.ts",
    files: [
      "*.css",
      "*.js",
      "*.ts",
      "*.json",
      "README.md"
    ],
    keywords: ["themes", "css", "tailwind", "design-system", "acrobi"],
    exports: {
      ".": "./themes.json",
      "./types": "./theme-types.ts",
      "./css/*": "./theme-*.css",
      "./tailwind/*": "./tailwind-*.config.js"
    },
    scripts: {
      "build": "echo 'Themes are pre-built'",
      "validate": "node -e \"console.log('Themes are valid:', !!require('./themes.json'))\""
    }
  };

  const filePath = path.join(outputDir, 'package.json');
  writeFileWithLog(filePath, JSON.stringify(packageJson, null, 2), 'package.json');
  return filePath;
}

// Main export function
function exportAllThemes(outputDir = './dist/themes') {
  console.log('🚀 Exporting Acrobi theme system...\n');
  
  ensureDir(outputDir);
  
  const generatedFiles = [];
  
  // Export individual theme files
  for (const [themeName, themeData] of Object.entries(themes)) {
    generatedFiles.push(exportThemeCSS(themeName, themeData, outputDir));
    generatedFiles.push(exportTailwindConfig(themeName, themeData, outputDir));
  }
  
  // Export shared files
  generatedFiles.push(exportThemeJSON(outputDir));
  generatedFiles.push(exportTypeScriptTypes(outputDir));
  generatedFiles.push(exportDocumentation(outputDir));
  generatedFiles.push(exportPackageJSON(outputDir));
  
  console.log(`\n🎉 Successfully exported ${generatedFiles.length} files to ${outputDir}`);
  console.log('\n📁 Generated structure:');
  generatedFiles.forEach(file => {
    console.log(`   ${path.relative(outputDir, file)}`);
  });
  
  console.log('\n✨ Ready to use:');
  console.log('   • Import CSS: @import "./dist/themes/theme-acrobi.css"');
  console.log('   • Use Tailwind: require("./dist/themes/tailwind-acrobi.config.js")');
  console.log('   • Switch themes: document.documentElement.setAttribute("data-theme", "bluequeue")');
  
  return generatedFiles;
}

// CLI interface
if (require.main === module) {
  const outputDir = process.argv[2] || './dist/themes';
  exportAllThemes(outputDir);
}

module.exports = {
  exportAllThemes,
  exportThemeCSS,
  exportTailwindConfig,
  exportTypeScriptTypes,
  exportThemeJSON,
  exportDocumentation,
  themes
};