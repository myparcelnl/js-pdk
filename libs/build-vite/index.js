import dts from 'vite-plugin-dts';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import {mergeConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

/** @type {import('vitest/config').UserConfigFn} */
const createCommonViteConfig = (env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [isProd && dts({entryRoot: 'src'}), customTsConfig(), vue()],

    build: {
      minify: isProd,
      sourcemap: !isProd,
      rollupOptions: {
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
      coverage: {
        all: true,
        enabled: false,
        reporter: ['clover'],
      },
      environment: 'happy-dom',
      passWithNoTests: true,
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
