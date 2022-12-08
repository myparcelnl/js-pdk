import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export const PORT = 9420;

export default defineConfig({
  plugins: [vue()],
  server: {
    port: PORT,
  },
  define: {
    'process.env': {},
    'process.argv': [],
  },
});
