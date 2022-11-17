import {createViteConfig} from '@myparcel-pdk/build-vite';
import vue from '@vitejs/plugin-vue';

const config = createViteConfig({
  plugins: [vue()],
  build: {
    lib: {
      name: 'MyparcelPdkFrontend',
      entry: 'src/index.ts',
    },
  },
});

export default config;
