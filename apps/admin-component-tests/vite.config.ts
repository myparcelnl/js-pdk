import {createVueViteConfig} from '@myparcel-pdk/build-vite';

export default createVueViteConfig({
  test: {
    setupFiles: ['./src/setup.ts'],
  },
});
