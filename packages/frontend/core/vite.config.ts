import {createViteConfig} from '@myparcel/pdk-frontend-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],

  build: {
    lib: {
      name: 'MyParcelPDK',
      entry: 'src/main.ts',
    },
  },

  test: {
    environment: 'happy-dom',
    globals: true,
  },
});
