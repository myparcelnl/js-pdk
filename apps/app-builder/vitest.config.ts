import {createViteConfig} from '@myparcel-pdk/build-vite';

export default createViteConfig({
  test: {
    environment: 'node',
    globalSetup: ['./src/__tests__/setup/globalSetup.ts'],
    setupFiles: ['./src/__tests__/setup/spyOnFs.ts'],
  },
});
