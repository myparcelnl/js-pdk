import dts from 'vite-plugin-dts';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import {mergeConfig} from 'vite';

/** @type {import('vitest/config').UserConfigFn} */
const createCommonViteConfig = (env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [isProd && dts({entryRoot: 'src'}), customTsConfig()],

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
        reporter: ['clover', 'text', ...(isProd ? [] : ['html'])],
      },
      environment: 'happy-dom',
      include: ['src/**/*.spec.ts'],
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
