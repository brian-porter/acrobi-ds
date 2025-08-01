#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { listComponents } from './commands/list';
import { addComponent } from './commands/add';
import { initProject } from './commands/init';
import { removeComponent } from './commands/remove';
import { addTheme, listThemes, removeTheme } from './commands/theme';

const program = new Command();

program
  .name('acrobi')
  .description('CLI for the Acrobi Design System')
  .version('2.0.0');

// Initialize command
program
  .command('init')
  .description('Initialize Acrobi Design System in your project')
  .option('-p, --path <path>', 'Target directory (default: src)', 'src')
  .option('-f, --force', 'Overwrite existing files')
  .option('--skip-deps', 'Skip dependency installation')
  .action(initProject);

// List command
program
  .command('list')
  .description('List all available components')
  .option(
    '-c, --category <category>',
    'Filter by category (primitive, hook, structure)'
  )
  .option('-t, --tag <tag>', 'Filter by tag')
  .action(listComponents);

// Add command
program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-p, --path <path>', 'Target directory (default: src)', 'src')
  .option('-f, --force', 'Overwrite existing files')
  .option('--dry-run', 'Show what would be copied without making changes')
  .option('-i, --interactive', 'Interactively select components')
  .action(addComponent);

// Remove command
program
  .command('remove [components...]')
  .description('Remove components from your project')
  .option('-p, --path <path>', 'Target directory (default: src)', 'src')
  .option('-i, --interactive', 'Interactively select components to remove')
  .option('--dry-run', 'Show what would be removed without making changes')
  .action(removeComponent);

// Theme commands
const themeCommand = program
  .command('theme')
  .description('Manage themes for your project');

// Theme add command
themeCommand
  .command('add <theme-name>')
  .description('Create a new theme extending an existing one')
  .option('--extends <base-theme>', 'Base theme to extend (required)')
  .option('--tokens <tokens...>', 'Custom token overrides (e.g., colors.primary=#ff6b6b)')
  .option('-p, --path <path>', 'Target directory (default: src)', 'src')
  .option('-f, --force', 'Overwrite existing theme files')
  .option('--dry-run', 'Show what would be created without making changes')
  .action(addTheme);

// Theme list command
themeCommand
  .command('list')
  .description('List all available themes')
  .option('-d, --detailed', 'Show detailed theme information')
  .option('--format <format>', 'Output format (table, json)', 'table')
  .action(listThemes);

// Theme remove command
themeCommand
  .command('remove <theme-name>')
  .description('Remove a custom theme from your project')
  .option('-p, --path <path>', 'Target directory (default: src)', 'src')
  .option('-f, --force', 'Skip confirmation prompt')
  .option('--dry-run', 'Show what would be removed without making changes')
  .action(removeTheme);

program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(chalk.bold.blue('🎨 Acrobi Design System CLI'));
  console.log(
    chalk.gray('Add beautiful, accessible components to your React projects\n')
  );
  program.outputHelp();
  console.log(chalk.yellow('\n💡 Quick Start:'));
  console.log(
    chalk.gray('  acrobi init              Initialize in your project')
  );
  console.log(
    chalk.gray('  acrobi list              See available components')
  );
  console.log(
    chalk.gray('  acrobi add button        Add a specific component')
  );
  console.log(
    chalk.gray('  acrobi add -i            Interactively select components')
  );
  console.log(chalk.yellow('\n🎨 Theme Management:'));
  console.log(
    chalk.gray('  acrobi theme list        Show available themes')
  );
  console.log(
    chalk.gray('  acrobi theme add my-theme --extends acrobi-light')
  );
  console.log(
    chalk.gray('  acrobi theme remove my-theme')
  );
}
