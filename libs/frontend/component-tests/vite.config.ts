import {createViteConfig, externalDependencies} from '@myparcel-pdk/build-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],

  build: {
    lib: {
      name: 'MyPaPdkFrontend',
      entry: 'src/index.ts',
    },
    rollupOptions: {
      external: [
        ...externalDependencies,
        '@myparcel-pdk/frontend-shared',
        '@vue/test-utils',
        '@vueuse/core',
        'pinia',
        'vitest',
        'vue',
      ],
    },
  },
});
