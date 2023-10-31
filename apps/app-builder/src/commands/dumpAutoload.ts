import {
  addPlatformToContext,
  executeCommand,
  getPlatformDistPath,
  getRelativePath,
  resolvePath,
  rmFile,
} from '../utils';
import {type PdkBuilderCommand} from '../types';

const dumpAutoload: PdkBuilderCommand = async (context) => {
  const {config, debug} = context;

  debug('Dumping autoload...');

  await Promise.all(
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      await rmFile(resolvePath([platformDistPath, 'vendor', 'autoload.php'], context), platformContext);

      await executeCommand(platformContext, 'composer', [
        'dump-autoload',
        `--working-dir=${getRelativePath(platformDistPath, platformContext)}`,
        '--classmap-authoritative',
      ]);
    }),
  );
};

export default dumpAutoload;
