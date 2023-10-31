import {executeCommand, exists, mkdirs, resolvePath, resolveString} from '../../utils';
import {type PdkBuilderContext} from '../../types';
import {VerbosityLevel} from '../../constants';
import {PACKAGE_NAME} from './constants';

export const installPhpScoper = async (context: PdkBuilderContext): Promise<void> => {
  const {config, args, debug} = context;
  const {version, installDir} = config.phpScoper;

  const resolvedInstallDir = resolveString(installDir, context);

  await mkdirs(installDir, context);

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
    config.rootCommand,
    [
      'composer',
      'require',
      `--working-dir=${resolvedInstallDir}`,
      `${PACKAGE_NAME}:${version}`,
      '--no-interaction',
      '--no-progress',
    ],
    {stdio: args.verbose >= VerbosityLevel.Verbose ? 'inherit' : 'ignore'},
  );

  debug(`Finished installing ${PACKAGE_NAME}`);
};
