/* eslint-disable no-console */
import {Options} from 'tsup';
import {createBanner} from './createBanner';
import {externalDependencies} from './externalDependencies';
import glob from 'fast-glob';
import {spawnSync} from 'child_process';

const banner = createBanner();
const files = glob.sync('src/**/*.ts');
const tsconfig = 'tsconfig.build.json';

export const commonTsupConfig: Options = {
  banner: {
    js: banner,
    css: banner,
  },
  entry: files,
  external: externalDependencies,
  format: ['esm'],
  outDir: 'lib',
  target: 'esnext',
  tsconfig,
  dts: false,
  // eslint-disable-next-line @typescript-eslint/require-await
  async onSuccess() {
    const timeStart = Date.now();

    console.log('\x1b[34m%s\x1b[0m', 'DTS', '\x1b[0m', 'Generating declaration files...');
    spawnSync('tsc', ['--project', tsconfig, '--emitDeclarationOnly', '--declarationDir', 'lib', '--declaration']);
    console.log('\x1b[34m%s\x1b[0m', 'DTS', '\x1b[0m', `Done in ${Date.now() - timeStart}ms`);
  },
};
