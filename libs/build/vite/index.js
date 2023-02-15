import customTsConfigPlugin from 'vite-plugin-custom-tsconfig';
import dts from 'vite-plugin-dts';
import {mergeConfig} from 'vite';

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

/** @type {import('vitest/config').UserConfigFn} */
const createCommonViteConfig = (env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [isProd && dts(), customTsConfigPlugin()],

    build: {
      outDir: 'lib',
      minify: isProd,
      sourcemap: !isProd,
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
  };
};

/** @type {import('.').createViteConfig} */
export const createViteConfig = (config) => async (env) => {
  let resolvedConfig = config ?? {};

  if (typeof config === 'function') {
    resolvedConfig = await config(env);
  }

  return mergeConfig(await createCommonViteConfig(env), resolvedConfig);
};
