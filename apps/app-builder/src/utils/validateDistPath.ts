import {type PdkBuilderContext, type PdkPlatformName} from '../types';
import {COMMAND_COPY_NAME} from '../constants';
import {getPlatformDistPath} from './getPlatformDistPath';
import {exists} from './exists';

export const validateDistPath = async (context: PdkBuilderContext<{platform: PdkPlatformName}>): Promise<boolean> => {
  const platformDistPath = getPlatformDistPath(context);

  if (!(await exists(platformDistPath))) {
    if (context.args.dryRun) {
      return false;
    }

    throw new Error(`Platform dist folder ${platformDistPath} does not exist. Run "${COMMAND_COPY_NAME}" first.`);
  }

  return true;
};
