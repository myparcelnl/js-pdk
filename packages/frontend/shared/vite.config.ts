import {createViteConfig} from '@myparcel/pdk-frontend-vite';

const config: unknown = createViteConfig({
  build: {
    lib: {
      name: 'MyParcelPDKShared',
      entry: 'src/main.ts',
    },
  },

  test: {
    environment: 'happy-dom',
    globals: true,
  },
});
export default config;
