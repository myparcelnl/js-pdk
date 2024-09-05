import path from 'path';
import {usesPhpScoper} from '../../utils/usesPhpScoper';
import {resolveString} from '../../utils/resolveString';
import {exists} from '../../utils/fs/exists';
import {type PdkBuilderCommand} from '../../types/command';
import {runPhpScoper} from './runPhpScoper';
import {installPhpScoper} from './installPhpScoper';

const scopePhp: PdkBuilderCommand = async (context) => {
  const {env, config, debug} = context;
  const {vendorConfigFile, outDir, vendorOutDir} = config.phpScoper;

  if (!(await usesPhpScoper(context))) {
    return;
  }

  await installPhpScoper(context);

  debug('Scoping php files...');

  if (await exists(path.resolve(env.cwd, vendorConfigFile))) {
    await runPhpScoper(context, resolveString(vendorOutDir, context), vendorConfigFile);
  }

  await runPhpScoper(context, resolveString(outDir, context));

  debug('Finished scoping php files');
};

export default scopePhp;
