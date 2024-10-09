import isCi from 'is-ci';
import {type BaseElementNode, type Node} from '@vue/compiler-core';
import vue from '@vitejs/plugin-vue';
import {createViteConfig} from '@myparcel-pdk/build-vite';
import {isOfType} from '@myparcel/ts-utils';
import {codecovVitePlugin} from '@codecov/vite-plugin';
import {name} from './package.json';

const PROP_TYPE_DIRECTIVE = 7;

const stripDirective = (name: string) => (node: Node) => {
  if (!isOfType<BaseElementNode>(node, 'props')) {
    return;
  }

  node.props = node.props.filter((prop) => {
    return !(prop?.type === PROP_TYPE_DIRECTIVE && prop?.name === name);
  });
};

export default createViteConfig((env) => ({
  plugins: [
    codecovVitePlugin({
      enableBundleAnalysis: isCi && process.env.CODECOV_TOKEN !== undefined,
      bundleName: name,
      uploadToken: process.env.CODECOV_TOKEN,
    }),

    vue({
      template: {
        compilerOptions: {
          nodeTransforms: env.mode === 'production' ? [stripDirective('test')] : [],
        },
      },
    }),
  ],

  build: {
    minify: false,
  },
}));
