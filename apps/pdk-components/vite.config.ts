import vue from '@vitejs/plugin-vue';
import {createViteConfig} from '@myparcel-pdk/build-vite';

export const PORT = 9420;

export default createViteConfig({
  plugins: [vue()],
});
