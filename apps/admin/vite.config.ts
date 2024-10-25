import isCi from 'is-ci';
import {createVueViteConfig} from '@myparcel-pdk/build-vite';
import {codecovVitePlugin} from '@codecov/vite-plugin';
import packageJson from './package.json';

const {name} = packageJson;

export default createVueViteConfig({
  build: {
    emptyOutDir: false,
  },

  plugins: [
    codecovVitePlugin({
      enableBundleAnalysis: isCi && process.env.CODECOV_TOKEN !== undefined,
      bundleName: name,
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],

  test: {
    setupFiles: ['@myparcel-pdk/admin-component-tests/setup'],
  },
});
