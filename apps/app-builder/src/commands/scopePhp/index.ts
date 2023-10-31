import path from 'path';
import {composerInstall, exists, reportDryRun, resolveString, usesPhpScoper} from '../../utils';
import {type PdkBuilderCommand} from '../../types';
import {runPhpScoper} from './runPhpScoper';
import {installPhpScoper} from './installPhpScoper';

const scopePhp: PdkBuilderCommand = async (context) => {
  const {env, config, args, debug} = context;
  const {vendorConfigFile, outDir, vendorOutDir} = config.phpScoper;

  if (!(await usesPhpScoper(context))) {
    return;
  }

  if (args.dryRun) reportDryRun(debug);

  await composerInstall(context, ['--no-dev']);
  await installPhpScoper(context);

  debug('Scoping php files...');

  if (await exists(path.resolve(env.cwd, vendorConfigFile))) {
    await runPhpScoper(context, resolveString(vendorOutDir, context), vendorConfigFile);
  }

  await runPhpScoper(context, resolveString(outDir, context));

  debug('Finished scoping php files');
};

export default scopePhp;
