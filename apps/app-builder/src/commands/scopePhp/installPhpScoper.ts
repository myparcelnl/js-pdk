import {resolveString} from '../../utils/resolveString';
import {resolvePath} from '../../utils/resolvePath';
import {exists} from '../../utils/fs/exists';
import {createDirectories} from '../../utils/fs/createDirectories';
import {executeCommand} from '../../utils/executeCommand';
import {type PdkBuilderContext} from '../../types/command.types';
import {RUN_COMPOSER, VerbosityLevel} from '../../constants';
import {PACKAGE_NAME} from './constants';

export const installPhpScoper = async (context: PdkBuilderContext): Promise<void> => {
  const {config, args, debug} = context;
  const {version, installDir} = config.phpScoper;

  const resolvedInstallDir = resolveString(installDir, context);

  await createDirectories(context, installDir);

  const isInstalled = await exists(resolvePath([installDir, 'composer.json'], context));

  if (isInstalled) {
    if (args.verbose >= VerbosityLevel.Verbose) {
      debug(`Package ${PACKAGE_NAME} is already installed`);
    }

    return;
  }

  debug(`Installing ${PACKAGE_NAME}...`);

  await executeCommand(
    context,
    config.dockerCommand,
    [
      RUN_COMPOSER,
      'require',
      `--working-dir=${resolvedInstallDir}`,
      `${PACKAGE_NAME}:${version}`,
      '--ignore-platform-req=ext-*',
      '--no-interaction',
      '--no-progress',
    ],
    {stdio: args.verbose >= VerbosityLevel.Verbose ? 'inherit' : 'ignore'},
  );

  debug(`Finished installing ${PACKAGE_NAME}`);
};
