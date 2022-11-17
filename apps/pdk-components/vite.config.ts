import {createViteConfig} from '@myparcel-pdk/build-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],

  build: {
    lib: {
      name: 'MyPaPdkFrontend',
      entry: 'src/index.ts',
    },
  },
});
