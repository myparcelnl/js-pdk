import {PdkBuilderCommand} from '../types';
import debug from 'debug';
import fs from 'fs';
import glob from 'fast-glob';
import path from 'path';

const log = debug('pdk:copy');

export const copy: PdkBuilderCommand = async ({env, config}) => {
  const files = glob.sync(config.source);

  console.log({files, config: config});

  await Promise.all(
    files.map(async (file) => {
      const source = path.resolve(env.cwd, file);
      const target = path.resolve(env.cwd, config.distFolder, file);

      log('Copying %s to %s', source, target);

      await fs.promises.copyFile(source, target);
    }),
  );
};
