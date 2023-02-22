import {CommandArgs, PdkBuilderContext} from '../types';
import createDebug from 'debug';
import fs from 'fs';
import path from 'path';

const debug = createDebug('pdk-builder:commands:init');

const TEMPLATE = `import {PLATFORMS} from '@myparcel/sdk';
import type {PdkBuilderConfig} from '@myparcel-pdk/app-builder/src';

const config:configType = {
  name: ':name',
  description: ':description',
  version: ':version',
  source: [],
  platforms: [PLATFORMS.MYPARCEL_NAME, PLATFORMS.SENDMYPARCEL_NAME],
};

export default config;
`;

export const init = async <A extends CommandArgs>(context: Omit<PdkBuilderContext, 'config'>): Promise<void> => {
  debug.enabled = Boolean(context.args.debug);

  const packageJsonPath = `${context.env.cwd}/package.json`;

  const packageJson = (
    await import(packageJsonPath, {
      assert: {type: 'json'},
    })
  ).default;

  debug('Found package.json at', packageJsonPath);

  let filename = 'pdk.config.ts';
  let tsType = ': PdkBuilderConfig';

  if (!fs.existsSync(path.resolve(context.env.cwd, 'tsconfig.json'))) {
    filename = 'pdk.config.js';
    tsType = '';
  }

  const parameters = {
    name: packageJson.name ?? '',
    description: packageJson.description ?? '',
    version: packageJson.version ?? '',
  };

  debug(`Creating ${filename} with`, parameters);

  fs.writeFileSync(
    filename,
    TEMPLATE.replace(':name', parameters.name)
      .replace(':description', parameters.description)
      .replace(':version', parameters.version)
      .replace(':configType', tsType),
  );
};
