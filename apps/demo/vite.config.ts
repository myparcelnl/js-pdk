import {defineConfig} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';

export const PORT = 9420;

export default defineConfig({
  plugins: [vue()],
  server: {
    port: PORT,
  },

  build: {
    rollupOptions: {
      external: ['vue'],
      plugins: [visualizer({filename: 'dist/stats.html'})],
    },
  },

  define: {
    'process.env': {},
    'process.argv': [],
  },
});
