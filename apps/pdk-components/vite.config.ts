import {createViteConfig} from '@myparcel-pdk/build-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],

  test: {
    setupFiles: './src/__tests__/setup.ts',
  },
});
