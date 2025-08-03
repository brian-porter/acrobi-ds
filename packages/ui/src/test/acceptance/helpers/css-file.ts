/**
 * Helper utilities for validating the built themes.css artifact
 *
 * Primary artifact: packages/ui/dist/themes.css
 * Failure policy (Classical state-based):
 *  - If the artifact is missing, throw with a clear, actionable message that
 *    references Task 1.4 (build pipeline) and Task 1.1 (variable scoping).
 *  - No mocking. Real FS reads only.
 *
 * Traceability:
 *  - docs/Mutual_Understanding_Document.md
 *  - docs/project_plan.md
 *  - specifications/user-stories-v10.md
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * Absolute filesystem path to packages/ui/dist/themes.css derived from this file location.
 * This avoids relying on process.cwd() differences when running tests via pnpm workspaces.
 */
export function getThemesCssPath(): string {
  // This file lives at: packages/ui/src/test/acceptance/helpers/css-file.ts
  // We need:            packages/ui/dist/themes.css
  // Move up from helpers -> acceptance -> test -> src => ../../../../
  const uiRoot = path.resolve(__dirname, '../../../../');
  return path.join(uiRoot, 'dist', 'themes.css');
}

/**
 * Read the themes.css artifact or throw with an actionable error message.
 */
export function readThemesCss(): string {
  const p = getThemesCssPath();
  try {
    return fs.readFileSync(p, 'utf8');
  } catch (err: any) {
    const missing = err && (err.code === 'ENOENT' || err.code === 'ENOTDIR');
    if (missing) {
      throw new Error(
        [
          `Missing CSS artifact at: ${p}`,
          'Action required:',
          '- Task 1.4: Implement or wire the build pipeline to generate packages/ui/dist/themes.css.',
          '- Task 1.1: Ensure CSS variables are scoped under .theme-<name> (no global :root).',
        ].join('\n')
      );
    }
    // Re-throw unknown errors to surface root cause
    throw err;
  }
}

/**
 * Detect any occurrence of a global :root block. The acceptance gate forbids global :root entirely.
 *
 * Regex rationale: /(^|\s):root\s*\{/m matches ':root {' even when preceded by whitespace or newlines,
 * including within at-rules (e.g., @layer, @media) since they ultimately include whitespace before ':root'.
 */
export function hasGlobalRootScope(css: string): { found: boolean; index?: number } {
  const re = /(^|\s):root\s*\{/m;
  const idx = css.search(re);
  return { found: idx !== -1, index: idx !== -1 ? idx : undefined };
}

/**
 * Check that at least one theme-scoped class exists.
 * Example formats accepted: .theme-acrobi, .theme_default, .theme-acme-1
 */
export function hasAnyThemeClass(css: string): boolean {
  const re = /\.theme-[a-z0-9_-]+\b/i;
  return re.test(css);
}
