import {Options} from 'tsup';
import {createBanner} from './createBanner';
import {externalDependencies} from './externalDependencies';

const banner = createBanner();

export const commonTsupConfig: Options = {
  banner: {
    js: banner,
    css: banner,
  },
  entry: ['src/index.ts'],
  external: externalDependencies,
  format: ['esm', 'cjs'],
  outDir: 'lib',
  target: 'esnext',
  tsconfig: 'tsconfig.build.json',
};
