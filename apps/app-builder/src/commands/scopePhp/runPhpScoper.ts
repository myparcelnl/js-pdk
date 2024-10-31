import {resolveString} from '../../utils/resolveString';
import {resolvePath} from '../../utils/resolvePath';
import {isEmptyDir} from '../../utils/fs/isEmptyDir';
import {exists} from '../../utils/fs/exists';
import {createDirectories} from '../../utils/fs/createDirectories';
import {executeCommand} from '../../utils/executeCommand';
import {type PdkBuilderContext} from '../../types/command.types';
import {RUN_PHP} from '../../constants';

export const runPhpScoper = async (context: PdkBuilderContext, outDir: string, config?: string): Promise<void> => {
  const {debug} = context;
  const {configFile, installDir} = context.config.phpScoper;

  const resolvedOutDir = resolvePath(outDir, context);

  if (!(await exists(resolvedOutDir))) {
    await createDirectories(context, resolvedOutDir);
  }

  if (!(await isEmptyDir(resolvedOutDir))) {
    debug(`Skipping scoping php files to ${outDir} because it already exists.`);
    return;
  }

  await executeCommand(
    context,
    RUN_PHP,
    [
      '-d memory_limit=-1',
      `${resolveString(installDir, context)}/vendor/bin/php-scoper`,
      'add-prefix',
      `--config=${config ?? configFile}`,
      `--output-dir=${outDir}`,
      '--force',
      '--no-ansi',
      '--no-interaction',
    ],
    {stdio: 'inherit'},
  );
};
