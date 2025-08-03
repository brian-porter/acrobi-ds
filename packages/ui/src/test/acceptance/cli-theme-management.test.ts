import { test, expect } from '@playwright/test';
import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Test suite for CLI theme management
test.describe('CLI Theme Management', () => {
  let tempDir: string;
  let cliPath: string;

  test.beforeEach(() => {
    // Create temporary directory for testing
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'acrobi-cli-test-'));
    cliPath = path.join(__dirname, '../../../../cli/bin/acrobi');
  });

  test.afterEach(() => {
    // Clean up temporary directory
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test('should create new theme with inheritance via CLI command', async () => {
    // Initialize a test project
    execSync('npm init -y', { cwd: tempDir });
    
    // Copy CLI to temp directory for testing
    const testCliPath = path.join(tempDir, 'acrobi');
    fs.copyFileSync(cliPath, testCliPath);
    fs.chmodSync(testCliPath, '755');

    // Execute CLI command to add new theme
    const result = execSync(`${testCliPath} theme add my-custom-theme --extends acrobi-light --tokens colors.primary=#ff6b6b`, {
      cwd: tempDir,
      encoding: 'utf-8'
    });

    // Verify CLI command executed successfully
    expect(result).toContain('Theme "my-custom-theme" created successfully');

    // Verify theme file was created
    const themeFilePath = path.join(tempDir, 'src', 'styles', 'themes', 'my-custom-theme.ts');
    expect(fs.existsSync(themeFilePath)).toBe(true);

    // Verify theme file contains correct inheritance
    const themeContent = fs.readFileSync(themeFilePath, 'utf-8');
    expect(themeContent).toContain('extends: \'acrobi-light\'');
    expect(themeContent).toContain('primary: \'#ff6b6b\'');
  });

  test('should validate theme creation parameters', async () => {
    // Test invalid theme name
    try {
      execSync(`${cliPath} theme add "invalid theme name" --extends acrobi-light`, {
        cwd: tempDir,
        stdio: 'pipe'
      });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.stderr.toString()).toContain('Invalid theme name');
    }

    // Test missing required parameters
    try {
      execSync(`${cliPath} theme add my-theme`, {
        cwd: tempDir,
        stdio: 'pipe'
      });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.stderr.toString()).toContain('Missing required parameter: --extends');
    }
  });

  test('should handle theme inheritance chain validation', async () => {
    // Create parent theme first
    execSync(`${cliPath} theme add parent-theme --extends acrobi-light`, { cwd: tempDir });
    
    // Create child theme that inherits from parent
    execSync(`${cliPath} theme add child-theme --extends parent-theme`, { cwd: tempDir });

    // Try to create circular inheritance (should fail)
    try {
      execSync(`${cliPath} theme add parent-theme --extends child-theme`, {
        cwd: tempDir,
        stdio: 'pipe'
      });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.stderr.toString()).toContain('Circular inheritance detected');
    }
  });
});