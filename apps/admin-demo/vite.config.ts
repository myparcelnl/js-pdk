import {defineConfig} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';

export const PORT = 9420;

export default defineConfig((env) => ({
  plugins: [vue()],

  server: {
    port: PORT,
    base: env.mode === 'production' ? '/js-pdk/' : '/',
  },

  build: {
    rollupOptions: {
      external: ['vue', 'vue-router'],
      plugins: [visualizer({filename: 'dist/stats.html'})],
    },
  },

  define: {
    'process.env': {},
    'process.argv': [],
  },

  test: {
    environment: 'happy-dom',
    coverage: {
      enabled: false,
      reporter: ['text', 'clover'],
    },
  },
}));
