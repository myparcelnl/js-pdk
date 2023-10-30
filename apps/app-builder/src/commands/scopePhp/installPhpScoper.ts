import path from 'path';
import {executeCommand, exists} from '../../utils';
import {type PdkBuilderContext} from '../../types';
import {VerbosityLevel} from '../../constants';
import {PACKAGE_NAME} from './constants';

export const installPhpScoper = async (context: PdkBuilderContext, directory: string): Promise<void> => {
  const {config, args, debug} = context;

  const isInstalled = await exists(path.resolve(directory, 'composer.json'));

  if (isInstalled) {
    debug(`Package ${PACKAGE_NAME} is already installed`);
    return;
  }

  debug(`Installing ${PACKAGE_NAME}...`);

  await executeCommand(
    context,
    config.rootCommand,
    ['composer', 'require', `${PACKAGE_NAME}:${config.phpScoper.version}`, '--no-interaction', '--no-progress'],
    {
      cwd: directory,
      stdio: args.verbose >= VerbosityLevel.Verbose ? 'inherit' : 'ignore',
    },
  );

  debug(`Finished installing ${PACKAGE_NAME}`);
};
