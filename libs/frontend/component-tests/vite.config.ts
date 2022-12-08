import {createViteConfig} from '@myparcel-pdk/build-vite';
import {externalDependencies} from '@myparcel-pdk/build-tsup';
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
        '@myparcel-pdk/common',
        '@vue/test-utils',
        '@vueuse/core',
        'pinia',
        'vitest',
        'vue',
      ],
    },
  },
});
