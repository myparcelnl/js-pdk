import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['esm'],
  minify: false,
  sourcemap: false,
  target: 'esnext',
  tsconfig: 'tsconfig.build.json',
});
