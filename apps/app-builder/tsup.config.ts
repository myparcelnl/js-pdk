import {createTsupConfig} from '@myparcel-pdk/build-tsup';

export default createTsupConfig({
  entry: ['src/main.ts'],
  minify: false,
  sourcemap: false,
});
