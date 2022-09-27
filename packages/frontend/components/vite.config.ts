import {createViteConfig} from '@myparcel/pdk-frontend-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],
  build: {
    lib: {
      name: 'MyParcelPDKComponents',
    },
  },
});
