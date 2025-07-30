import chalk from 'chalk';
import {
  getAllComponents,
  getComponentsByCategory,
  getComponentsByTag,
} from '../utils/registry';

interface ListOptions {
  category?: string;
  tag?: string;
}

export function listComponents(options: ListOptions): void {
  try {
    let components = getAllComponents();

    // Apply filters
    if (options.category) {
      components = getComponentsByCategory(options.category);
      if (Object.keys(components).length === 0) {
        console.log(
          chalk.yellow(`No components found in category: ${options.category}`)
        );
        return;
      }
    }

    if (options.tag) {
      components = getComponentsByTag(options.tag);
      if (Object.keys(components).length === 0) {
        console.log(
          chalk.yellow(`No components found with tag: ${options.tag}`)
        );
        return;
      }
    }

    // Display header
    console.log(chalk.bold.blue('\n🎨 Acrobi Design System Components\n'));

    // Group by category
    const categories = ['primitive', 'structure', 'hook'] as const;

    categories.forEach(category => {
      const categoryComponents = Object.entries(components).filter(
        ([, component]) => component.category === category
      );

      if (categoryComponents.length === 0) return;

      console.log(
        chalk.bold.magenta(`\n${category.toUpperCase()} COMPONENTS:`)
      );
      console.log(chalk.gray('─'.repeat(50)));

      categoryComponents.forEach(([key, component]) => {
        console.log(chalk.green(`📦 ${key}`));
        console.log(chalk.gray(`   ${component.description}`));

        if (component.tags.length > 0) {
          const tags = component.tags
            .map(tag => chalk.cyan(`#${tag}`))
            .join(' ');
          console.log(chalk.gray(`   Tags: ${tags}`));
        }

        console.log();
      });
    });

    // Display usage info
    console.log(chalk.bold.yellow('\nUSAGE:'));
    console.log(
      chalk.gray('  acrobi add <component>     Add a component to your project')
    );
    console.log(
      chalk.gray('  acrobi list --category primitive    Filter by category')
    );
    console.log(
      chalk.gray('  acrobi list --tag form              Filter by tag')
    );
    console.log();
  } catch (error) {
    console.error(chalk.red('❌ Error listing components:'), error);
    process.exit(1);
  }
}
