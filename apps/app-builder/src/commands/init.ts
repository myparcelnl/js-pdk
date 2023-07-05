import path from 'path';
import fs from 'fs';
import {initializeCommand, logTimeTaken} from '../utils';
import {type PdkBuilderCommandWithoutConfig} from '../types';
import {COMMAND_INIT_NAME} from '../constants';

const TEMPLATE = `import type {PdkBuilderConfig} from '@myparcel-pdk/app-builder';
import {name, version} from './package.json' assert {type: 'json'};

const config:configType = {
  name,
  version,
  source: [],
  outputs: ['myparcelnl', 'myparcelbe'],
};

export default config;
`;

export const init: PdkBuilderCommandWithoutConfig = async ({env, args}) => {
  const {debug, time} = initializeCommand(COMMAND_INIT_NAME, args);

  const packageJsonPath = `${env.cwd}/package.json`;

  const packageJson = (
    await import(packageJsonPath, {
      assert: {type: 'json'},
    })
  ).default;

  debug('Found package.json at', packageJsonPath);

  let filename = 'pdk.config.ts';
  let tsType = ': PdkBuilderConfig';

  if (!fs.existsSync(path.resolve(env.cwd, 'tsconfig.json'))) {
    filename = 'pdk.config.js';
    tsType = '';
  }

  const parameters = {
    name: packageJson.name ?? '',
    version: packageJson.version ?? '',
  };

  debug(`Creating ${filename} with`, parameters);

  fs.writeFileSync(
    filename,
    TEMPLATE.replace(':name', parameters.name).replace(':version', parameters.version).replace(':configType', tsType),
  );

  logTimeTaken(debug, time);
};
