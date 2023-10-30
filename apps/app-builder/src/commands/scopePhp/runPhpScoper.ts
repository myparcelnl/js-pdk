import {executeCommand} from '../../utils';
import {type PdkBuilderContext} from '../../types';

export const runPhpScoper = async (context: PdkBuilderContext, outDir: string, installDir: string): Promise<void> => {
  const {config} = context;

  await executeCommand(
    context,
    config.rootCommand,
    [
      'php',
      '-d memory_limit=-1',
      'vendor/bin/php-scoper',
      'add-prefix',
      `--output-dir=${outDir}`,
      '--no-ansi',
      '--no-interaction',
    ],
    {cwd: installDir, stdio: 'inherit'},
  );
};
