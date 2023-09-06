import customTsConfig from 'vite-plugin-custom-tsconfig';
import {defineConfig} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';

export const PORT = 9420;

export default defineConfig((env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [vue(), customTsConfig({tsConfigPath: 'tsconfig.base.json'})],
    base: isProd ? '/js-pdk/' : '/',

    server: {
      port: PORT,
    },

    build: {
      rollupOptions: {
        external: ['vue', 'vue-router'],
        plugins: [visualizer({filename: 'dist/stats.html'})],
      },
    },

    optimizeDeps: {
      // Optimizing this dependency causes the element and form injection keys to be mismatched.
      exclude: ['@myparcel/vue-form-builder'],
    },

    test: {
      environment: 'happy-dom',
      coverage: {
        enabled: false,
        reporter: ['clover'],
      },
    },
  };
});
