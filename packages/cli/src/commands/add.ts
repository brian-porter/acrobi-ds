import chalk from 'chalk';
import inquirer from 'inquirer';
import { getComponent } from '../utils/registry';
import { copyFile, getSourcePath, resolveTargetPath } from '../utils/files';

interface AddOptions {
  path: string;
  force?: boolean;
  dryRun?: boolean;
}

export async function addComponent(
  componentName: string,
  options: AddOptions
): Promise<void> {
  try {
    const component = getComponent(componentName);

    if (!component) {
      console.log(chalk.red(`❌ Component "${componentName}" not found.`));
      console.log(
        chalk.gray('💡 Run "acrobi list" to see available components.')
      );
      return;
    }

    console.log(
      chalk.bold.blue(`\n📦 Adding ${component.name} to your project\n`)
    );
    console.log(chalk.gray(component.description));

    // Check for dependencies
    if (component.dependencies.length > 0) {
      console.log(chalk.yellow('\n📋 Dependencies required:'));
      component.dependencies.forEach(dep => {
        console.log(chalk.gray(`   • ${dep}`));
      });

      if (!options.dryRun) {
        const { installDeps } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'installDeps',
            message: 'Install missing dependencies?',
            default: true,
          },
        ]);

        if (installDeps) {
          console.log(chalk.blue('\n📥 Installing dependencies...'));
          const { execSync } = require('child_process');
          try {
            execSync(`npm install ${component.dependencies.join(' ')}`, {
              stdio: 'inherit',
            });
          } catch (error) {
            console.log(
              chalk.yellow('⚠️  Please install dependencies manually:')
            );
            console.log(
              chalk.gray(`npm install ${component.dependencies.join(' ')}`)
            );
          }
        }
      }
    }

    // Copy files
    console.log(chalk.blue('\n📁 Copying files...\n'));
    let copiedFiles = 0;
    let skippedFiles = 0;

    for (const file of component.files) {
      const sourcePath = getSourcePath(file.path);
      const targetPath = resolveTargetPath(options.path, file.target);

      const success = copyFile(sourcePath, targetPath, {
        force: options.force,
        dryRun: options.dryRun,
      });

      if (success) {
        copiedFiles++;
      } else {
        skippedFiles++;
      }
    }

    // Summary
    console.log(
      chalk.bold.green(`\n✨ Component "${component.name}" added successfully!`)
    );
    console.log(
      chalk.gray(
        `   ${copiedFiles} files copied${skippedFiles > 0 ? `, ${skippedFiles} skipped` : ''}`
      )
    );

    // Show usage example
    if (component.examples.length > 0) {
      console.log(chalk.bold.yellow('\n📖 Usage Example:'));
      console.log(chalk.gray(component.examples[0].code));
    }

    console.log(
      chalk.gray(
        '\n💡 Check the documentation for more examples and configuration options.'
      )
    );
  } catch (error) {
    console.error(chalk.red('❌ Error adding component:'), error);
    process.exit(1);
  }
}
