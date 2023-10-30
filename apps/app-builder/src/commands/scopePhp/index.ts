import path from 'path';
import fs from 'fs';
import {exists, reportDryRun, resolvePath} from '../../utils';
import {type PdkBuilderCommand} from '../../types';
import {runPhpScoper} from './runPhpScoper';
import {installPhpScoper} from './installPhpScoper';

const scopePhp: PdkBuilderCommand = async (context) => {
  const {env, config, args, debug} = context;

  if (config.phpScoper.enabled === false) {
    return;
  }

  const hasConfig = await exists(path.resolve(env.cwd, config.phpScoper.configFile));

  if (!hasConfig) {
    if (config.phpScoper.enabled === true) {
      throw new Error(`File ${config.phpScoper?.configFile} not found in root of project`);
    }

    return;
  }

  if (args.dryRun) reportDryRun(debug);

  const installDir = resolvePath(config.phpScoper.installDir, context);
  const outDir = resolvePath(config.phpScoper.outDir, context);

  if (!args.dryRun) {
    await fs.promises.mkdir(installDir, {recursive: true});
    await fs.promises.mkdir(outDir, {recursive: true});
  }

  await installPhpScoper(context, installDir);

  debug('Scoping php files...');

  await runPhpScoper(context, outDir, installDir);

  debug('Finished scoping php files');
};

export default scopePhp;
