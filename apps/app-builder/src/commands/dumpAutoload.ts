import fs from 'fs';
import {
  addPlatformToContext,
  executeCommand,
  getPlatformDistPath,
  getRelativePath,
  logSourcePath,
  reportDryRun,
  resolvePath,
} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {VerbosityLevel} from '../constants';

const dumpAutoload: PdkBuilderCommand = async (context) => {
  const {args, config, debug} = context;

  if (args.dryRun) reportDryRun(debug);

  debug('Dumping autoload...');

  await Promise.all(
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      const autoloadPath = resolvePath([platformDistPath, 'vendor', 'autoload.php'], context);

      if (args.verbose >= VerbosityLevel.VeryVeryVerbose) {
        debug(`Removing ${logSourcePath(autoloadPath, platformContext)}`);
      }

      if (!args.dryRun) {
        await fs.promises.rm(autoloadPath, {force: true});
      }

      await executeCommand(platformContext, 'composer', [
        'dump-autoload',
        `--working-dir=${getRelativePath(platformDistPath, platformContext)}`,
        '--classmap-authoritative',
      ]);
    }),
  );
};

export default dumpAutoload;
