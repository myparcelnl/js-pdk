import {type BaseElementNode, type Node} from '@vue/compiler-core';
import vue from '@vitejs/plugin-vue';
import {createViteConfig} from '@myparcel-pdk/build-vite';
import {isOfType} from '@myparcel/ts-utils';

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
