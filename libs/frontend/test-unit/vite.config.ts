import {UserConfig} from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  plugins: [vue()],
  root: path.resolve(__dirname, '..'),
  test: {
    coverage: {
      reporter: ['text', 'clover'],
    },
    environment: 'happy-dom',
  },
};
export default config;
