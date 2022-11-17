import {createBanner, externalDependencies} from '@myparcel-pdk/build-tsup';
import {UserConfigFn} from 'vitest/config';
import bannerPlugin from 'vite-plugin-banner';
import dts from 'vite-plugin-dts';

export const commonViteConfig: UserConfigFn = (env) => ({
  plugins: [
    dts({entryRoot: 'src'}),
    bannerPlugin({
      content: createBanner(),
    }),
  ],

  build: {
    outDir: 'lib',
    minify: env.mode === 'production',
    sourcemap: env.mode !== 'production',
    rollupOptions: {
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
    dir: 'src',
    coverage: {
      reporter: ['text', 'clover'],
    },
  },
});
