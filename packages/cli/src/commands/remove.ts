import chalk from 'chalk';
import inquirer from 'inquirer';
import { existsSync, unlinkSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { getComponent, getAllComponents } from '../utils/registry';
import { resolveTargetPath } from '../utils/files';

interface RemoveOptions {
  path: string;
  interactive?: boolean;
  dryRun?: boolean;
}

export async function removeComponent(
  componentNames: string[],
  options: RemoveOptions
): Promise<void> {
  try {
    let componentsToRemove: string[] = [];

    // Interactive mode
    if (options.interactive || componentNames.length === 0) {
      const allComponents = getAllComponents();
      const installedComponents = Object.keys(allComponents).filter(name => {
        const component = allComponents[name];
        // Check if main component file exists
        const mainFile = component.files.find(f => f.type === 'component');
        if (mainFile) {
          const targetPath = resolveTargetPath(options.path, mainFile.target);
          return existsSync(targetPath);
        }
        return false;
      });

      if (installedComponents.length === 0) {
        console.log(
          chalk.yellow('📭 No Acrobi components found in your project.')
        );
        console.log(
          chalk.gray('💡 Use "acrobi add <component>" to install components.')
        );
        return;
      }

      const { selectedComponents } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedComponents',
          message: 'Select components to remove:',
          choices: installedComponents.map(name => ({
            name: `${name} - ${allComponents[name].description}`,
            value: name,
            short: name,
          })),
          pageSize: 10,
        },
      ]);

      if (selectedComponents.length === 0) {
        console.log(chalk.gray('No components selected for removal.'));
        return;
      }

      componentsToRemove = selectedComponents;
    } else {
      componentsToRemove = componentNames;
    }

    // Validate components
    const validComponents: string[] = [];
    for (const name of componentsToRemove) {
      const component = getComponent(name);
      if (!component) {
        console.log(chalk.red(`❌ Component "${name}" not found.`));
        continue;
      }

      // Check if component is actually installed
      const mainFile = component.files.find(f => f.type === 'component');
      if (mainFile) {
        const targetPath = resolveTargetPath(options.path, mainFile.target);
        if (!existsSync(targetPath)) {
          console.log(
            chalk.yellow(`⚠️  Component "${name}" is not installed.`)
          );
          continue;
        }
      }

      validComponents.push(name);
    }

    if (validComponents.length === 0) {
      console.log(chalk.yellow('No valid components to remove.'));
      return;
    }

    // Confirmation
    if (!options.dryRun) {
      console.log(
        chalk.yellow(
          `\\n⚠️  About to remove ${validComponents.length} component(s):`
        )
      );
      validComponents.forEach(name => {
        console.log(chalk.gray(`   • ${name}`));
      });

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Are you sure you want to remove these components?',
          default: false,
        },
      ]);

      if (!confirm) {
        console.log(chalk.gray('Removal cancelled.'));
        return;
      }
    }

    // Remove components
    console.log(chalk.blue('\\n🗑️  Removing components...\\n'));
    let removedFiles = 0;
    const filesToKeep = new Set<string>();

    // First pass: identify shared files (utils.ts, etc.)
    const allComponents = getAllComponents();
    const remainingComponents = Object.keys(allComponents).filter(
      (name: string) => {
        if (validComponents.includes(name)) return false;

        const component = allComponents[name];
        const mainFile = component.files.find(f => f.type === 'component');
        if (mainFile) {
          const targetPath = resolveTargetPath(options.path, mainFile.target);
          return existsSync(targetPath);
        }
        return false;
      }
    );

    // Mark files that should be kept (used by remaining components)
    remainingComponents.forEach((name: string) => {
      const component = allComponents[name];
      component.files.forEach((file: any) => {
        const targetPath = resolveTargetPath(options.path, file.target);
        filesToKeep.add(targetPath);
      });
    });

    // Remove files
    for (const componentName of validComponents) {
      const component = getComponent(componentName)!;
      console.log(chalk.blue(`📦 Removing ${component.name}...`));

      for (const file of component.files) {
        const targetPath = resolveTargetPath(options.path, file.target);

        // Skip if file should be kept (used by other components)
        if (filesToKeep.has(targetPath)) {
          console.log(
            chalk.gray(`⏭️  Skipped: ${file.target} (used by other components)`)
          );
          continue;
        }

        if (!existsSync(targetPath)) {
          console.log(chalk.gray(`⏭️  Not found: ${file.target}`));
          continue;
        }

        if (options.dryRun) {
          console.log(chalk.blue(`🗑️  Would remove: ${file.target}`));
          removedFiles++;
          continue;
        }

        try {
          unlinkSync(targetPath);
          console.log(chalk.green(`✅ Removed: ${file.target}`));
          removedFiles++;

          // Remove empty directories
          const dir = dirname(targetPath);
          try {
            rmSync(dir, { recursive: true });
            console.log(
              chalk.gray(
                `🗂️  Removed empty directory: ${dir.replace(process.cwd() + '/', '')}`
              )
            );
          } catch {
            // Directory not empty or other error - ignore
          }
        } catch (error) {
          console.log(
            chalk.red(`❌ Failed to remove ${file.target}: ${error}`)
          );
        }
      }
    }

    // Summary
    if (options.dryRun) {
      console.log(
        chalk.bold.blue(
          `\\n🔍 Dry run complete: ${removedFiles} files would be removed`
        )
      );
    } else {
      console.log(
        chalk.bold.green(
          `\\n✨ Successfully removed ${validComponents.length} component(s)!`
        )
      );
      console.log(chalk.gray(`   ${removedFiles} files removed`));

      if (filesToKeep.size > 0) {
        console.log(
          chalk.gray(`   ${filesToKeep.size} shared files preserved`)
        );
      }
    }

    // Cleanup suggestions
    console.log(chalk.yellow('\\n💡 Next steps:'));
    console.log(
      chalk.gray(
        '  • Review your imports and remove any references to deleted components'
      )
    );
    console.log(
      chalk.gray('  • Consider running your linter to catch unused imports')
    );
    console.log(
      chalk.gray('  • Check if any dependencies are no longer needed')
    );
  } catch (error) {
    console.error(chalk.red('❌ Error removing components:'), error);
    process.exit(1);
  }
}
