import {UserConfig} from 'vitest/config';
import {createViteConfig} from '@myparcel-pdk/build-vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  plugins: [vue()],
  root: path.resolve(__dirname, '..'),
  test: {
    environment: 'happy-dom',
  },
};

export default createViteConfig(config);
