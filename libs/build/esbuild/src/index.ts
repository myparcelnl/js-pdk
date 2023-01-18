import {buildSync} from 'esbuild';
import child_process from 'child_process';

export const createBanner = (): string => {
  return `/** ${process.env.npm_package_name} v${process.env.npm_package_version} */`;
};

const banner = createBanner();

buildSync({
  logLevel: 'info',
  banner: {
    js: banner,
    css: banner,
  },
  bundle: false,
  entryPoints: ['src/index.ts'],
  packages: 'external',
  outdir: 'lib',
  target: 'esnext',
  tsconfig: 'tsconfig.build.json',
});

if (process.argv.includes('--dts')) {
  child_process.spawnSync('tsc', ['--emitDeclarationOnly', '--declarationDir', 'lib'], {stdio: 'inherit'});
}
