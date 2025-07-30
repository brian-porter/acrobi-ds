/**
 * @fileoverview Service Worker Build Configuration for Epic 67
 * Build scripts and configuration for compiling the service worker
 */

import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

// Build configuration
interface BuildConfig {
  input: string;
  output: string;
  minify?: boolean;
  sourcemap?: boolean;
  target?: string[];
  define?: Record<string, string>;
}

// Default build configuration
const DEFAULT_CONFIG: BuildConfig = {
  input: 'src/service-worker/sw.ts',
  output: 'public/sw.js',
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV !== 'production',
  target: ['es2020'],
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
    'process.env.SW_VERSION': `"${process.env.SW_VERSION || '1.0.0'}"`,
  },
};

/**
 * Service Worker Builder Class
 */
export class ServiceWorkerBuilder {
  private config: BuildConfig;

  constructor(config: Partial<BuildConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Build the service worker
   */
  async build(): Promise<void> {
    console.log('Building Service Worker...');

    try {
      // Ensure output directory exists
      const outputDir = path.dirname(this.config.output);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Build with esbuild
      const result = await esbuild.build({
        entryPoints: [this.config.input],
        bundle: true,
        minify: this.config.minify,
        sourcemap: this.config.sourcemap,
        target: this.config.target,
        format: 'iife',
        outfile: this.config.output,
        define: this.config.define,
        loader: {
          '.ts': 'ts',
        },
        tsconfig: 'tsconfig.json',
      });

      // Copy offline.html to output directory
      const offlineHtmlSource = path.join(
        path.dirname(this.config.input),
        'offline.html'
      );
      const offlineHtmlOutput = path.join(outputDir, 'offline.html');

      if (fs.existsSync(offlineHtmlSource)) {
        fs.copyFileSync(offlineHtmlSource, offlineHtmlOutput);
        console.log('Copied offline.html to output directory');
      }

      console.log('Service Worker built successfully!');
      console.log(`Output: ${this.config.output}`);

      if (result.warnings.length > 0) {
        console.warn('Build warnings:', result.warnings);
      }
    } catch (error) {
      console.error('Service Worker build failed:', error);
      throw error;
    }
  }

  /**
   * Watch for changes and rebuild
   */
  async watch(): Promise<void> {
    console.log('Watching Service Worker files for changes...');

    const context = await esbuild.context({
      entryPoints: [this.config.input],
      bundle: true,
      minify: false, // Disable minification in watch mode
      sourcemap: true,
      target: this.config.target,
      format: 'iife',
      outfile: this.config.output,
      define: this.config.define,
      loader: {
        '.ts': 'ts',
      },
      tsconfig: 'tsconfig.json',
    });

    await context.watch();
    console.log(`Watching ${this.config.input} for changes...`);
  }

  /**
   * Clean build output
   */
  clean(): void {
    if (fs.existsSync(this.config.output)) {
      fs.unlinkSync(this.config.output);
      console.log('Cleaned Service Worker build output');
    }

    const offlineHtmlOutput = path.join(
      path.dirname(this.config.output),
      'offline.html'
    );
    if (fs.existsSync(offlineHtmlOutput)) {
      fs.unlinkSync(offlineHtmlOutput);
      console.log('Cleaned offline.html');
    }
  }
}

/**
 * Build service worker with default configuration
 */
export async function buildServiceWorker(
  config?: Partial<BuildConfig>
): Promise<void> {
  const builder = new ServiceWorkerBuilder(config);
  await builder.build();
}

/**
 * Watch service worker files
 */
export async function watchServiceWorker(
  config?: Partial<BuildConfig>
): Promise<void> {
  const builder = new ServiceWorkerBuilder(config);
  await builder.watch();
}

/**
 * Clean service worker build output
 */
export function cleanServiceWorker(config?: Partial<BuildConfig>): void {
  const builder = new ServiceWorkerBuilder(config);
  builder.clean();
}

// CLI support
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'build':
      buildServiceWorker().catch(console.error);
      break;
    case 'watch':
      watchServiceWorker().catch(console.error);
      break;
    case 'clean':
      cleanServiceWorker();
      break;
    default:
      console.log('Usage: node build.js [build|watch|clean]');
      process.exit(1);
  }
}
