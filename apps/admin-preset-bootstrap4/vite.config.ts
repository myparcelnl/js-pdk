import {createVueViteConfig} from '@myparcel-pdk/build-vite';

export default createVueViteConfig({
  test: {
    setupFiles: ['./src/__tests__/vitest-setup.ts', '@myparcel-pdk/admin-component-tests/setup'],
  },
});
