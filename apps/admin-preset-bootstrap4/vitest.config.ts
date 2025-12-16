import vue from '@vitejs/plugin-vue';
import {createViteConfig} from '@myparcel-dev/pdk-build-vite';

export default createViteConfig({
  plugins: [vue()],

  test: {
    setupFiles: ['./src/__tests__/vitest-setup.ts', '@myparcel-dev/pdk-admin-component-tests/setup'],
  },
});
