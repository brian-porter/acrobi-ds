import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import chalk from 'chalk';

export interface CopyFileOptions {
  force?: boolean;
  dryRun?: boolean;
}

export function ensureDirectoryExists(filePath: string): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function copyFile(
  sourcePath: string,
  targetPath: string,
  options: CopyFileOptions = {}
): boolean {
  const { force = false, dryRun = false } = options;

  // Check if target exists and force is not enabled
  if (existsSync(targetPath) && !force) {
    console.log(
      chalk.yellow(`⚠️  File exists: ${targetPath} (use --force to overwrite)`)
    );
    return false;
  }

  if (dryRun) {
    console.log(chalk.blue(`📄 Would copy: ${sourcePath} → ${targetPath}`));
    return true;
  }

  try {
    const content = readFileSync(sourcePath, 'utf-8');
    ensureDirectoryExists(targetPath);
    writeFileSync(targetPath, content);

    const status = existsSync(targetPath) && !force ? 'Updated' : 'Created';
    console.log(chalk.green(`✅ ${status}: ${targetPath}`));
    return true;
  } catch (error) {
    console.log(chalk.red(`❌ Failed to copy ${sourcePath}: ${error}`));
    return false;
  }
}

export function getSourcePath(relativePath: string): string {
  // Return path to the UI package source
  return join(__dirname, '../../../ui/src/', relativePath);
}

export function resolveTargetPath(
  targetDir: string,
  targetFile: string
): string {
  return join(process.cwd(), targetDir, targetFile);
}
