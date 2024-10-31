import path from 'node:path';
import fs from 'node:fs';
import {type PdkBuilderCommandWithoutConfig} from '../../types/command.types';

const init = (async ({env, debug}) => {
  const packageJsonPath = `${env.cwd}/package.json`;
  const packageJson = (await import(packageJsonPath)).default;

  debug('Found package.json at', packageJsonPath);

  const filename = `pdk.config.${packageJson.type === 'module' ? 'mjs' : 'js'}`;

  const template = fs.readFileSync(path.resolve(__dirname, 'pdk.config.js.template'), 'utf8');

  fs.writeFileSync(filename, template);
}) satisfies PdkBuilderCommandWithoutConfig;

export default init;
