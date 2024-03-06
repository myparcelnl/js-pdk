import vue from '@vitejs/plugin-vue';
import {createViteConfig} from '@myparcel-pdk/build-vite';

export default createViteConfig({
  plugins: [vue()],
  test: {
    setupFiles: ['@myparcel-pdk/admin-component-tests/setup'],
  },
});
