import {UserConfigFn} from 'vitest/config';
import bannerPlugin from 'vite-plugin-banner';
import {createBanner} from '@myparcel-pdk/build-tsup';
import customTsConfigPlugin from 'vite-plugin-custom-tsconfig';
import dts from 'vite-plugin-dts';

const external = [
  '@myparcel-pdk/build-tsup',
  '@myparcel-pdk/build-vite',
  '@myparcel-pdk/common',
  '@myparcel-pdk/admin-demo',
  '@myparcel-pdk/frontend-core',
  '@myparcel-pdk/admin-component-tests',
  '@myparcel-pdk/admin-components',
  '@myparcel-pdk/admin',
  '@myparcel-pdk/admin-preset-bootstrap4',
  '@myparcel/sdk',
  '@myparcel/ts-utils',
  '@myparcel/vue-form-builder',
  '@tanstack/vue-query',
  '@types/lodash-es',
  '@vue/test-utils',
  '@vueuse/core',
  'lodash',
  'lodash-es',
  'lodash-unified',
  'pinia',
  'tsup',
  'vite',
  'vitest',
  'vue',
];

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
      external,
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
