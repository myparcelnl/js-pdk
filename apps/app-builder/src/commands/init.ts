import {CommandArgs, PdkBuilderContext} from '../types';
import {createDebugger} from '../utils/createDebugger';
import fs from 'fs';
import path from 'path';

const TEMPLATE = `import type {PdkBuilderConfig} from '@myparcel-pdk/app-builder/src';

const config:configType = {
  name: ':name',
  description: ':description',
  version: ':version',
  source: [],
  outputs: ['myparcelnl', 'myparcelbe'],
};

export default config;
`;

export const init = async <A extends CommandArgs>(context: Omit<PdkBuilderContext, 'config'>): Promise<void> => {
  const debug = createDebugger('init');

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
