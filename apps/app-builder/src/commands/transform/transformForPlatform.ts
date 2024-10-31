import {validateDistPath} from '../../utils/validateDistPath';
import {globFiles} from '../../utils/globFiles';
import {logSourcePath} from '../../utils/debug/logSourcePath';
import {isVerbose} from '../../utils/command/isVerbose';
import {type PdkBuilderContextWithPlatformArgs} from '../../types/command.types';
import {transformPlatformFiles} from './transformPlatformFiles';
import {TRANSFORM_IGNORE_GLOBS} from './constants';

export const transformForPlatform = async (context: PdkBuilderContextWithPlatformArgs): Promise<void> => {
  const {debug, args} = context;

  if (!(await validateDistPath(context))) {
    return;
  }

  if (isVerbose(context)) {
    debug('Transforming files in %s', logSourcePath(args.platformOutDir, context));
  }

  const files = globFiles(`${args.platformOutDir}/**/*`, context, {
    ignore: TRANSFORM_IGNORE_GLOBS.map((path) => `${args.platformOutDir}/${path}`),
  });

  await Promise.all(files.map((file) => transformPlatformFiles(context, file)));

  debug('Finished transforming files in %s', logSourcePath(args.platformOutDir, context));
};
