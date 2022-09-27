import {UserConfigFn} from 'vitest/config';

export const commonViteConfig: UserConfigFn = (env) => ({
  plugins: [
    /* dts({root: '.', entryRoot: 'src', rollupTypes: true}) */
  ],

  build: {
    outDir: 'lib',
    minify: env.mode === 'production',
    sourcemap: env.mode === 'development',

    lib: {
      formats: ['es', 'cjs'],
      entry: 'src/main.ts',
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
