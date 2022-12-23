import {createBanner, externalDependencies} from '@myparcel-pdk/build-tsup';
import {UserConfigFn} from 'vitest/config';
import bannerPlugin from 'vite-plugin-banner';
import customTsConfigPlugin from 'vite-plugin-custom-tsconfig';
import dts from 'vite-plugin-dts';
import {visualizer} from 'rollup-plugin-visualizer';

export const commonViteConfig: UserConfigFn = (env) => ({
  plugins: [
    dts({entryRoot: 'src', copyDtsFiles: true}),
    bannerPlugin({
      content: createBanner(),
    }),
    customTsConfigPlugin(),
  ],

  build: {
    outDir: 'lib',
    minify: env.mode === 'production',
    sourcemap: env.mode !== 'production',
    rollupOptions: {
      plugins: [visualizer({filename: 'lib/index.html'})],
      external: externalDependencies,
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
  },

  test: {
    environment: 'happy-dom',
    coverage: {
      enabled: false,
      reporter: ['text', 'clover'],
    },
  },
});
