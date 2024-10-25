import {createViteConfig} from '@myparcel-pdk/build-vite';

export default createViteConfig({
  test: {
    environment: 'node',
    globalSetup: ['./src/__tests__/setup.ts'],
  },
});
