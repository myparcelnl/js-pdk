import dts from 'vite-plugin-dts';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import {createVueViteConfig} from '@myparcel-pdk/build-vite';

export default createVueViteConfig((env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [
      isProd && dts({entryRoot: 'src/__tests__', outDir: 'dist/__tests__'}),
      customTsConfig({tsConfigPath: 'tsconfig.base.json'}),
    ],

    build: {
      emptyOutDir: false,
      minify: isProd,
      sourcemap: !isProd,
      rollupOptions: {
        external: (id) => !id.startsWith('.') && !id.startsWith('/'),
      },
      lib: {
        entry: 'src/__tests__/index.ts',
        formats: ['es'],
        fileName: '__tests__/index',
      },
    },
  };
});
