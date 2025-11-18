import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disabled - will fix type exports
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'socket.io-client',
    '@zxing/library',
    '@zxing/browser'
  ],
  treeshake: true,
  minify: false,
  outDir: 'dist',
  target: 'es2020',
  platform: 'browser'
});
