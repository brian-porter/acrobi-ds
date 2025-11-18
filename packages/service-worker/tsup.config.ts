import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disabled - will fix type exports
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [],
  treeshake: true,
  minify: false,
  outDir: 'dist',
  target: 'es2020',
  platform: 'browser'
});
