import chalk from 'chalk';
import inquirer from 'inquirer';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { ensureDirectoryExists } from '../utils/files';
import type { Theme } from '../../../ui/src/theme';

interface ThemeAddOptions {
  extends?: string;
  tokens?: string[];
  path: string;
  force?: boolean;
  dryRun?: boolean;
}

interface ThemeListOptions {
  detailed?: boolean;
  format?: 'table' | 'json';
}

interface ThemeRemoveOptions {
  path: string;
  force?: boolean;
  dryRun?: boolean;
}

// Default themes available for extension
const DEFAULT_THEMES = {
  'acrobi-light': {
    name: 'Acrobi Light',
    description: 'Default light theme for Acrobi Design System',
    path: 'styles/themes/theme-acrobi.css'
  },
  'acrobi-dark': {
    name: 'Acrobi Dark',
    description: 'Dark variant of the Acrobi theme',
    path: 'styles/themes/theme-acrobi-dark.css'
  }
};

/**
 * Add a new theme to the project
 */
export async function addTheme(
  themeName: string,
  options: ThemeAddOptions
): Promise<void> {
  try {
    // Validate theme name
    if (!themeName || !isValidThemeName(themeName)) {
      console.log(chalk.red('❌ Invalid theme name. Use kebab-case (e.g., my-custom-theme)'));
      return;
    }

    // Validate required parameters
    if (!options.extends) {
      console.log(chalk.red('❌ Missing required parameter: --extends'));
      console.log(chalk.gray('💡 Specify a base theme to extend (e.g., --extends acrobi-light)'));
      return;
    }

    // Check if base theme exists
    if (!isValidBaseTheme(options.extends)) {
      console.log(chalk.red(`❌ Base theme "${options.extends}" not found.`));
      console.log(chalk.gray('💡 Available base themes: ' + Object.keys(DEFAULT_THEMES).join(', ')));
      return;
    }

    console.log(chalk.bold.blue(`\n🎨 Creating theme "${themeName}"\n`));

    const themeDir = join(process.cwd(), options.path, 'styles', 'themes');
    const themeFilePath = join(themeDir, `${themeName}.ts`);
    const themeCSSPath = join(themeDir, `${themeName}.css`);

    // Check if theme already exists
    if ((existsSync(themeFilePath) || existsSync(themeCSSPath)) && !options.force) {
      console.log(chalk.yellow(`⚠️  Theme "${themeName}" already exists (use --force to overwrite)`));
      return;
    }

    // Parse custom tokens if provided
    const customTokens = parseTokensInput(options.tokens || []);

    // Generate theme content
    const themeContent = generateThemeFile(themeName, options.extends, customTokens);
    const cssContent = generateThemeCSS(themeName, options.extends);

    if (options.dryRun) {
      console.log(chalk.blue('📄 Would create theme files:'));
      console.log(chalk.gray(`   • ${themeFilePath}`));
      console.log(chalk.gray(`   • ${themeCSSPath}`));
      console.log(chalk.blue('\n📄 Theme TypeScript content:'));
      console.log(chalk.gray(themeContent.split('\n').slice(0, 10).join('\n') + '...'));
      return;
    }

    // Create theme files
    ensureDirectoryExists(themeFilePath);
    writeFileSync(themeFilePath, themeContent);
    writeFileSync(themeCSSPath, cssContent);

    console.log(chalk.green('✅ Theme files created:'));
    console.log(chalk.gray(`   • ${themeFilePath}`));
    console.log(chalk.gray(`   • ${themeCSSPath}`));

    // Show usage instructions
    console.log(chalk.bold.yellow('\n📖 Usage:'));
    console.log(chalk.gray(`   import '${options.path}/styles/themes/${themeName}.css';`));
    console.log(chalk.gray(`   // Or import the theme object:`));
    console.log(chalk.gray(`   import { ${toCamelCase(themeName)}Theme } from '${options.path}/styles/themes/${themeName}';`));

    console.log(chalk.bold.green(`\n✨ Theme "${themeName}" created successfully!`));

  } catch (error) {
    console.error(chalk.red('❌ Error creating theme:'), error);
    process.exit(1);
  }
}

/**
 * List all available themes in the project
 */
export async function listThemes(options: ThemeListOptions): Promise<void> {
  try {
    console.log(chalk.bold.blue('\n🎨 Available Themes\n'));

    // Find all theme files in the project
    const themesDir = join(process.cwd(), 'src', 'styles', 'themes');
    const themes: Array<{
      name: string;
      type: 'built-in' | 'custom';
      path: string;
      description?: string;
    }> = [];

    // Add built-in themes
    Object.entries(DEFAULT_THEMES).forEach(([key, theme]) => {
      themes.push({
        name: key,
        type: 'built-in',
        path: theme.path,
        description: theme.description
      });
    });

    // Add custom themes if themes directory exists
    if (existsSync(themesDir)) {
      const files = readdirSync(themesDir);
      files.forEach(file => {
        if (file.endsWith('.ts') || file.endsWith('.css')) {
          const themeName = file.replace(/\.(ts|css)$/, '');
          if (!DEFAULT_THEMES[themeName as keyof typeof DEFAULT_THEMES]) {
            themes.push({
              name: themeName,
              type: 'custom',
              path: join('styles', 'themes', file),
              description: 'Custom theme'
            });
          }
        }
      });
    }

    if (themes.length === 0) {
      console.log(chalk.yellow('⚠️  No themes found in the project.'));
      console.log(chalk.gray('💡 Run "acrobi theme add my-theme --extends acrobi-light" to create your first theme.'));
      return;
    }

    if (options.format === 'json') {
      console.log(JSON.stringify(themes, null, 2));
      return;
    }

    // Display themes in table format
    themes.forEach(theme => {
      const typeIcon = theme.type === 'built-in' ? '🏭' : '🎨';
      const typeColor = theme.type === 'built-in' ? chalk.blue : chalk.green;
      
      console.log(`${typeIcon} ${chalk.bold(theme.name)}`);
      console.log(`   ${typeColor(theme.type.toUpperCase())} • ${theme.description || 'No description'}`);
      if (options.detailed) {
        console.log(`   ${chalk.gray('Path:')} ${theme.path}`);
      }
      console.log('');
    });

    console.log(chalk.gray(`Found ${themes.length} theme(s)`));

  } catch (error) {
    console.error(chalk.red('❌ Error listing themes:'), error);
    process.exit(1);
  }
}

/**
 * Remove a theme from the project
 */
export async function removeTheme(
  themeName: string,
  options: ThemeRemoveOptions
): Promise<void> {
  try {
    if (!themeName) {
      console.log(chalk.red('❌ Theme name is required'));
      return;
    }

    // Prevent removal of built-in themes
    if (DEFAULT_THEMES[themeName as keyof typeof DEFAULT_THEMES]) {
      console.log(chalk.red(`❌ Cannot remove built-in theme "${themeName}"`));
      return;
    }

    const themeDir = join(process.cwd(), options.path, 'styles', 'themes');
    const themeFilePath = join(themeDir, `${themeName}.ts`);
    const themeCSSPath = join(themeDir, `${themeName}.css`);

    const filesToRemove = [];
    if (existsSync(themeFilePath)) filesToRemove.push(themeFilePath);
    if (existsSync(themeCSSPath)) filesToRemove.push(themeCSSPath);

    if (filesToRemove.length === 0) {
      console.log(chalk.yellow(`⚠️  Theme "${themeName}" not found`));
      return;
    }

    if (options.dryRun) {
      console.log(chalk.blue('📄 Would remove theme files:'));
      filesToRemove.forEach(file => {
        console.log(chalk.gray(`   • ${file}`));
      });
      return;
    }

    // Confirm deletion unless force is used
    if (!options.force) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to remove theme "${themeName}"?`,
          default: false,
        },
      ]);

      if (!confirm) {
        console.log(chalk.gray('Theme removal cancelled'));
        return;
      }
    }

    // Remove theme files
    const { unlinkSync } = require('fs');
    filesToRemove.forEach(file => {
      try {
        unlinkSync(file);
        console.log(chalk.green(`✅ Removed: ${file}`));
      } catch (error) {
        console.log(chalk.red(`❌ Failed to remove: ${file}`));
      }
    });

    console.log(chalk.bold.green(`\n✨ Theme "${themeName}" removed successfully!`));

  } catch (error) {
    console.error(chalk.red('❌ Error removing theme:'), error);
    process.exit(1);
  }
}

// Helper functions

function isValidThemeName(name: string): boolean {
  // Theme names should be kebab-case
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name);
}

function isValidBaseTheme(baseTheme: string): boolean {
  return Object.keys(DEFAULT_THEMES).includes(baseTheme);
}

function parseTokensInput(tokens: string[]): Record<string, any> {
  const parsedTokens: Record<string, any> = {};
  
  tokens.forEach(token => {
    const [path, value] = token.split('=');
    if (path && value) {
      // Support nested paths like colors.primary or spacing.lg
      const pathParts = path.split('.');
      let current = parsedTokens;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      current[pathParts[pathParts.length - 1]] = value;
    }
  });
  
  return parsedTokens;
}

function generateThemeFile(
  themeName: string,
  baseTheme: string,
  customTokens: Record<string, any>
): string {
  const camelCaseName = toCamelCase(themeName);
  
  return `// ${themeName} theme
// Generated by Acrobi CLI
import { Theme } from '../../../theme';

export const ${camelCaseName}Theme: Theme = {
  name: '${themeName}',
  tokens: {
    colors: {
      // Extend base theme colors
      background: { light: 'var(--background)', dark: 'var(--background)' },
      foreground: { light: 'var(--foreground)', dark: 'var(--foreground)' },
      card: { light: 'var(--card)', dark: 'var(--card)' },
      cardForeground: { light: 'var(--card-foreground)', dark: 'var(--card-foreground)' },
      primary: { light: 'var(--primary)', dark: 'var(--primary)' },
      primaryForeground: { light: 'var(--primary-foreground)', dark: 'var(--primary-foreground)' },
      secondary: { light: 'var(--secondary)', dark: 'var(--secondary)' },
      secondaryForeground: { light: 'var(--secondary-foreground)', dark: 'var(--secondary-foreground)' },
      accent: { light: 'var(--accent)', dark: 'var(--accent)' },
      accentForeground: { light: 'var(--accent-foreground)', dark: 'var(--accent-foreground)' },
      destructive: { light: 'var(--destructive)', dark: 'var(--destructive)' },
      destructiveForeground: { light: 'var(--destructive-foreground)', dark: 'var(--destructive-foreground)' },
      muted: { light: 'var(--muted)', dark: 'var(--muted)' },
      mutedForeground: { light: 'var(--muted-foreground)', dark: 'var(--muted-foreground)' },
      border: { light: 'var(--border)', dark: 'var(--border)' },
      input: { light: 'var(--input)', dark: 'var(--input)' },
      ring: { light: 'var(--ring)', dark: 'var(--ring)' },
      ${generateCustomColorTokens(customTokens.colors || {})}
    },
    spacing: {
      xs: 'var(--spacing-xs, 0.25rem)',
      sm: 'var(--spacing-sm, 0.5rem)',
      md: 'var(--spacing-md, 1rem)',
      lg: 'var(--spacing-lg, 1.5rem)',
      xl: 'var(--spacing-xl, 2rem)',
      ${generateCustomTokens(customTokens.spacing || {})}
    },
    fontFamily: {
      sans: 'var(--font-sans, ui-sans-serif, system-ui)',
      serif: 'var(--font-serif, ui-serif, Georgia)',
      mono: 'var(--font-mono, ui-monospace, SFMono-Regular)',
      ${generateCustomTokens(customTokens.fontFamily || {})}
    },
    borderRadius: {
      sm: 'var(--radius-sm, 0.125rem)',
      md: 'var(--radius-md, 0.375rem)',
      lg: 'var(--radius-lg, 0.5rem)',
      full: 'var(--radius-full, 9999px)',
      ${generateCustomTokens(customTokens.borderRadius || {})}
    }
  }
};

export default ${camelCaseName}Theme;
`;
}

function generateThemeCSS(themeName: string, baseTheme: string): string {
  return `/* ${themeName} theme */
/* Extends: ${baseTheme} */
/* Generated by Acrobi CLI */

@import './${baseTheme === 'acrobi-light' ? 'theme-acrobi.css' : baseTheme + '.css'}';

/* Custom theme overrides */
:root {
  /* Add your custom CSS variables here */
  /* Example: --primary: 210 40% 50%; */
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    /* Add your dark mode overrides here */
  }
}

/* Theme-specific component styles */
.theme-${themeName} {
  /* Add theme-specific styles here */
}
`;
}

function generateCustomColorTokens(colors: Record<string, any>): string {
  return Object.entries(colors)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}: { light: '${value}', dark: '${value}' },`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n      ');
}

function generateCustomTokens(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([key, value]) => `${key}: '${value}',`)
    .join('\n      ');
}

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}