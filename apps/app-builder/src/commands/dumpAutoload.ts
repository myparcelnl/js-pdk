import path from 'path';
import fs from 'fs';
import {addPlatformToContext, executeCommand, getPlatformDistPath, logSourcePath, reportDryRun} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {VerbosityLevel} from '../constants';

const dumpAutoload: PdkBuilderCommand = async (context) => {
  const {args, config, debug, env} = context;

  if (args.dryRun) reportDryRun(debug);

  debug('Dumping autoload...');

  await Promise.all(
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      const autoloadPath = path.resolve(platformDistPath, 'vendor', 'autoload.php');

      if (args.verbose >= VerbosityLevel.VeryVeryVerbose) {
        debug(`Removing ${logSourcePath(env, autoloadPath)}`);
      }

      if (!args.dryRun) {
        await fs.promises.rm(autoloadPath, {force: true});
      }

      await executeCommand(platformContext, 'composer', ['dump-autoload', '--classmap-authoritative'], {
        cwd: platformDistPath,
      });
    }),
  );
};

export default dumpAutoload;
