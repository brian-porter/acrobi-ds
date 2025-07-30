import chalk from 'chalk';
import inquirer from 'inquirer';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
  ensureDirectoryExists,
  copyFile,
  getSourcePath,
  resolveTargetPath,
} from '../utils/files';
import { execSync } from 'child_process';

interface InitOptions {
  path: string;
  force?: boolean;
  skipDeps?: boolean;
}

const baseConfig = {
  tailwindConfig: `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
`,

  globalCSS: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`,

  utilsFunction: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
};

export async function initProject(options: InitOptions): Promise<void> {
  try {
    console.log(chalk.bold.blue('\n🎨 Initializing Acrobi Design System\n'));

    const targetDir = join(process.cwd(), options.path);

    // Check if already initialized
    const utilsPath = join(targetDir, 'lib', 'utils.ts');
    if (existsSync(utilsPath) && !options.force) {
      console.log(
        chalk.yellow('⚠️  Acrobi appears to already be initialized.')
      );

      const { proceed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: 'Do you want to continue and overwrite existing files?',
          default: false,
        },
      ]);

      if (!proceed) {
        console.log(chalk.gray('Initialization cancelled.'));
        return;
      }
      options.force = true;
    }

    // Project type detection
    const packageJsonPath = join(process.cwd(), 'package.json');
    let projectType = 'react';

    if (existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(
          require('fs').readFileSync(packageJsonPath, 'utf-8')
        );
        if (
          packageJson.dependencies?.['next'] ||
          packageJson.devDependencies?.['next']
        ) {
          projectType = 'next';
        }
      } catch {
        // Ignore errors reading package.json
      }
    }

    console.log(chalk.blue(`📦 Detected project type: ${projectType}`));

    // Required dependencies
    const requiredDeps = ['class-variance-authority', 'clsx', 'tailwind-merge'];

    const requiredDevDeps = [
      'tailwindcss',
      'tailwindcss-animate',
      '@tailwindcss/typography',
      'autoprefixer',
      'postcss',
    ];

    // Check and install dependencies
    if (!options.skipDeps) {
      console.log(chalk.blue('\n📋 Checking dependencies...\n'));

      const { installDeps } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'installDeps',
          message: 'Install required dependencies?',
          default: true,
        },
      ]);

      if (installDeps) {
        try {
          console.log(chalk.blue('📥 Installing dependencies...'));
          execSync(`npm install ${requiredDeps.join(' ')}`, {
            stdio: 'inherit',
          });
          execSync(`npm install --save-dev ${requiredDevDeps.join(' ')}`, {
            stdio: 'inherit',
          });
          console.log(chalk.green('✅ Dependencies installed successfully'));
        } catch (error) {
          console.log(
            chalk.yellow('⚠️  Please install dependencies manually:')
          );
          console.log(chalk.gray(`npm install ${requiredDeps.join(' ')}`));
          console.log(
            chalk.gray(`npm install --save-dev ${requiredDevDeps.join(' ')}`)
          );
        }
      }
    }

    // Create directory structure
    console.log(chalk.blue('\n📁 Creating directory structure...\n'));

    const directories = ['components/ui', 'lib', 'hooks'];

    directories.forEach(dir => {
      const fullPath = join(targetDir, dir);
      ensureDirectoryExists(join(fullPath, 'placeholder'));
      console.log(chalk.green(`✅ Created: ${dir}/`));
    });

    // Create utils file
    const utilsFilePath = join(targetDir, 'lib', 'utils.ts');
    writeFileSync(utilsFilePath, baseConfig.utilsFunction);
    console.log(chalk.green(`✅ Created: lib/utils.ts`));

    // Create or update Tailwind config
    const tailwindConfigPath = join(process.cwd(), 'tailwind.config.js');
    if (!existsSync(tailwindConfigPath) || options.force) {
      writeFileSync(tailwindConfigPath, baseConfig.tailwindConfig);
      console.log(chalk.green(`✅ Created: tailwind.config.js`));
    } else {
      console.log(
        chalk.yellow(`⚠️  tailwind.config.js exists (use --force to overwrite)`)
      );
    }

    // Create global CSS (Next.js specific)
    if (projectType === 'next') {
      const globalCSSPath = join(process.cwd(), 'app', 'globals.css');
      const altGlobalCSSPath = join(process.cwd(), 'styles', 'globals.css');

      const cssPath = existsSync(join(process.cwd(), 'app'))
        ? globalCSSPath
        : altGlobalCSSPath;

      if (!existsSync(cssPath) || options.force) {
        ensureDirectoryExists(cssPath);
        writeFileSync(cssPath, baseConfig.globalCSS);
        console.log(
          chalk.green(`✅ Created: ${cssPath.replace(process.cwd() + '/', '')}`)
        );
      } else {
        console.log(
          chalk.yellow(`⚠️  Global CSS exists (use --force to overwrite)`)
        );
      }
    }

    // Success message
    console.log(
      chalk.bold.green('\\n🎉 Acrobi Design System initialized successfully!')
    );
    console.log(chalk.gray('\\nNext steps:'));
    console.log(chalk.gray('  1. Add components: acrobi add button'));
    console.log(chalk.gray('  2. Or browse all: acrobi list'));
    console.log(chalk.gray('  3. Interactive mode: acrobi add -i'));

    if (projectType === 'next') {
      console.log(chalk.gray('  4. Import globals.css in your layout/page'));
    }

    console.log(chalk.yellow('\\n📖 Documentation: https://acrobi.dev/docs'));
  } catch (error) {
    console.error(chalk.red('❌ Error initializing project:'), error);
    process.exit(1);
  }
}
