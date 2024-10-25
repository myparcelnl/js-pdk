import {createVueViteConfig} from '@myparcel-pdk/build-vite';

export default createVueViteConfig({
  test: {
    setupFiles: ['@myparcel-pdk/admin-component-tests/setup'],
  },
});
