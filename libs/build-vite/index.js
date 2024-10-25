import dts from 'vite-plugin-dts';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import {mergeConfig} from 'vite';
import nodeExternals from 'rollup-plugin-node-externals';
import vue from '@vitejs/plugin-vue';
import {isOfType} from '@myparcel/ts-utils';

/** @type {import('vitest/config').UserConfigFn} */
const createCommonViteConfig = (env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [
      isProd && dts({entryRoot: 'src'}),
      customTsConfig({tsConfigPath: 'tsconfig.base.json'}),
      nodeExternals({devDeps: true}),
    ],

    build: {
      emptyOutDir: true,
      minify: isProd,
      sourcemap: !isProd,
      rollupOptions: {
        external: ['vue', 'vue-demi', '@myparcel/delivery-options'],
        output: {
          globals: {
            '@myparcel/delivery-options': 'MyParcelDeliveryOptions',
            vue: 'Vue',
            'vue-demi': 'VueDemi',
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
      reporters: ['default', ['junit', {outputFile: './junit.xml'}]],
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

const PROP_TYPE_DIRECTIVE = 7;

const stripDirective = (name) => (node) => {
  if (!isOfType(node, 'props')) {
    return;
  }

  node.props = node.props.filter((prop) => {
    return !(prop?.type === PROP_TYPE_DIRECTIVE && prop?.name === name);
  });
};

/**
 * @param {import('vite').ConfigEnv} env
 * @return {import('vite').Plugin<import('@vitejs/plugin-vue').Api>}
 */
export const createVuePlugin = (env) => {
  return vue({
    template: {
      compilerOptions: {
        nodeTransforms: env.mode === 'production' ? [stripDirective('test')] : [],
      },
    },
  });
};

/** @type {import('.').createViteConfig} */
export const createVueViteConfig = (config) => async (env) => {
  const baseConfig = await createViteConfig(config)(env);

  baseConfig.plugins.unshift(createVuePlugin(env));

  return baseConfig;
};
