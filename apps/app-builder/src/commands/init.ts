import fs from 'fs';
import path from 'path';
import {CommandArgs} from '../types';
import {LiftoffEnv} from 'liftoff';

const TEMPLATE = `
import {PLATFORMS} from '@myparcel/sdk';
import {PdkBuilderConfig} from '@myparcel-pdk/builder';

const config:configType = {
  name: ':name',
  description: ':description',
  version: ':version',
  source: [],
  platforms: [PLATFORMS.MYPARCEL_NAME, PLATFORMS.SENDMYPARCEL_NAME],
};

export default config;
`;

export const init = async <A extends CommandArgs>(env: LiftoffEnv, args: A): Promise<void> => {
  console.log({env, args});
  console.log(`${env.cwd}/package.json`);
  const packageJson = (await import(`${env.cwd}/package.json`)).default;

  console.log(packageJson, args);

  let filename = 'pdk.ts';
  let tsType = ': PdkBuilderConfig';

  if (!fs.existsSync(path.resolve(env.cwd, 'tsconfig.json'))) {
    filename = 'pdk.js';
    tsType = '';
  }

  fs.writeFileSync(
    filename,
    TEMPLATE.replace(':name', packageJson.name)
      .replace(':description', packageJson.description)
      .replace(':version', packageJson.version)
      .replace('configType', tsType),
  );
};
