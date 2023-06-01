import {defineConfig} from 'tsup';

export default defineConfig({
  format: [],
  minify: false,
  sourcemap: false,
  target: 'esnext',
  tsconfig: 'tsconfig.build.json',
});
