import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  external: ['react', 'react-dom', '@acrobi/primitives', '@acrobi/form-components', '@acrobi/aae-hooks'],
  outDir: 'dist',
  target: 'es2020'
});
