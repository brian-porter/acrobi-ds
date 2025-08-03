/**
 * Acrobi DS V10 — Phase 1 / Task 1.1
 * Acceptance Gate: Refactor CSS Variables to be Theme-Scoped (No global :root)
 *
 * Traceability:
 * - Core success criteria: docs/Mutual_Understanding_Document.md
 * - Project plan task definition: docs/project_plan.md
 * - User story AC: specifications/user-stories-v10.md
 *
 * Runner:
 *   pnpm --filter ui test packages/ui/src/test/acceptance/themescss.no-root.spec.ts
 *
 * Scope:
 * - Primary artifact under test: packages/ui/dist/themes.css
 * - Enforce:
 *   1) No top-level ":root {" scopes in generated CSS
 *   2) At least one theme-scoped class exists (e.g., .theme-<name>)
 * - If artifact missing: fail with actionable guidance to Task 1.4 and Task 1.1
 */

import { describe, it } from 'vitest';
import {
  readThemesCss,
  hasGlobalRootScope,
  hasAnyThemeClass,
  getThemesCssPath,
} from './helpers/css-file';

describe('themes.css — acceptance gate: no global :root and at least one .theme-*', () => {
  it('enforces absence of :root and presence of .theme-* class selectors', () => {
    // Will throw with a clear, actionable message if the artifact does not exist
    // (preserves RED state until Task 1.4 produces packages/ui/dist/themes.css)
    const css = readThemesCss();

    const { found, index } = hasGlobalRootScope(css);
    if (found) {
      throw new Error(
        [
          '[Acceptance Gate: No :root]',
          `Found a global :root rule in: ${getThemesCssPath()}`,
          `First match position: ${index ?? -1}`,
          'Action required:',
          '- Task 1.1: Replace any global :root variable declarations with class-scoped selectors (e.g., .theme-<name>).',
          '- Ensure variables are emitted under .theme-<name> and not :root.',
        ].join('\n')
      );
    }

    const themeClassPresent = hasAnyThemeClass(css);
    if (!themeClassPresent) {
      throw new Error(
        [
          '[Acceptance Gate: Missing theme class]',
          `No ".theme-*" class selectors were found in: ${getThemesCssPath()}`,
          'Action required:',
          '- Task 1.1: Scope variables under at least one ".theme-<name>" selector.',
          '- Optionally include a ".dark" variant (e.g., .theme-<name>.dark) as needed.',
        ].join('\n')
      );
    }
  });
});
