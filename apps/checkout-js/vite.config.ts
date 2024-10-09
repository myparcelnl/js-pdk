import isCi from 'is-ci';
import {createViteConfig} from '@myparcel-pdk/build-vite';
import {codecovVitePlugin} from '@codecov/vite-plugin';
import {name} from './package.json';

export default createViteConfig({
  plugins: [
    codecovVitePlugin({
      enableBundleAnalysis: isCi && process.env.CODECOV_TOKEN !== undefined,
      bundleName: name,
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
});
