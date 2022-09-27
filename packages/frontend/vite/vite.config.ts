import {createViteConfig} from './src/createViteConfig';
import dtsPlugin from 'vite-plugin-dts';

export default createViteConfig({
  plugins: [dtsPlugin()],

  build: {
    rollupOptions: {
      external: ['vue', 'vite', 'vite-plugin-dts'],
    },

    lib: {
      entry: 'src/main.ts',
    },
  },
});
