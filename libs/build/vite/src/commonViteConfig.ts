import {createBanner, externalDependencies} from '@myparcel-pdk/build-tsup';
import {UserConfigFn} from 'vitest/config';
import bannerPlugin from 'vite-plugin-banner';
import customTsConfigPlugin from 'vite-plugin-custom-tsconfig';
import dts from 'vite-plugin-dts';

export const commonViteConfig: UserConfigFn = (env) => ({
  plugins: [
    env.mode === 'production' && dts(),
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
      external: externalDependencies,
      output: {
        preserveModules: true,
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
