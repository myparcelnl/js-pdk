import {resolvePath} from '../utils/resolvePath';
import {getRelativePath} from '../utils/getRelativePath';
import {deleteFile} from '../utils/fs/deleteFile';
import {executeCommand} from '../utils/executeCommand';
import {type PdkBuilderCommand} from '../types/command.types';
import {RUN_COMPOSER} from '../constants';

const dumpAutoload = (async (context) => {
  const {debug, config} = context;

  debug('Dumping autoload...');

  const autoloadPath = resolvePath([config.outDir, 'vendor', 'autoload.php'], context);

  await deleteFile(context, autoloadPath);

  await executeCommand(context, RUN_COMPOSER, [
    'dump-autoload',
    `--working-dir=${getRelativePath(config.outDir, context)}`,
    '--classmap-authoritative',
  ]);
}) satisfies PdkBuilderCommand;

// noinspection JSUnusedGlobalSymbols
export default dumpAutoload;
