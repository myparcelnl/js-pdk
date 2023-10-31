import {executeCommand, exists, isEmptyDir, mkdirs, resolvePath, resolveString} from '../../utils';
import {type PdkBuilderContext} from '../../types';

export const runPhpScoper = async (context: PdkBuilderContext, outDir: string, config?: string): Promise<void> => {
  const {debug} = context;
  const {configFile, installDir} = context.config.phpScoper;

  const resolvedOutDir = resolvePath(outDir, context);

  if (!(await exists(resolvedOutDir))) {
    await mkdirs(resolvedOutDir, context);
  }

  if (!(await isEmptyDir(resolvedOutDir))) {
    debug(`Skipping scoping php files to ${outDir} because it already exists.`);
    return;
  }

  await executeCommand(
    context,
    'php',
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
