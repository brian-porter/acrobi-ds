import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  external: ['react', 'react-dom', '@acrobi/primitives', '@acrobi/aae-hooks', 'leaflet', 'react-leaflet'],
  outDir: 'dist',
  target: 'es2020'
});
