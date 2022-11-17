import {Options} from 'tsup';
import {createBanner} from './createBanner';
import {externalDependencies} from './externalDependencies';

const banner = createBanner();

export const commonTsupConfig: Options = {
  entry: ['src/index.ts'],
  external: externalDependencies,
  format: ['esm'],
  outDir: 'lib',
  target: 'esnext',
  banner: {
    js: banner,
    css: banner,
  },
};
