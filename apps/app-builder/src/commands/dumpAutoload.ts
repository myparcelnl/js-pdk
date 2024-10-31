import {resolvePath} from '../utils/resolvePath';
import {getRelativePath} from '../utils/getRelativePath';
import {deleteFile} from '../utils/fs/deleteFile';
import {executeCommand} from '../utils/executeCommand';
import {executePerPlatform} from '../utils/command/executePerPlatform';
import {type PdkBuilderCommand} from '../types/command.types';

const dumpAutoload = (async (context) => {
  const {debug} = context;

  debug('Dumping autoload...');

  await executePerPlatform(context, async (platformContext) => {
    const {args} = platformContext;

    const autoloadPath = resolvePath([args.platformOutDir, 'vendor', 'autoload.php'], platformContext);

    await deleteFile(platformContext, autoloadPath);

    await executeCommand(platformContext, 'composer', [
      'dump-autoload',
      `--working-dir=${getRelativePath(args.platformOutDir, platformContext)}`,
      '--classmap-authoritative',
    ]);
  });
}) satisfies PdkBuilderCommand;

// noinspection JSUnusedGlobalSymbols
export default dumpAutoload;
