import {type PdkBuilderContext, type PdkPlatformName} from '../types';
import {COMMAND_COPY_NAME} from '../constants';
import {getPlatformDistPath} from './getPlatformDistPath';
import {exists} from './fs';
import {reportDirectoryDoesNotExist} from './debug';
import {shouldModifyFiles} from './command';

export const validateDistPath = async (context: PdkBuilderContext<{platform: PdkPlatformName}>): Promise<boolean> => {
  const platformDistPath = getPlatformDistPath(context);

  if (!(await exists(platformDistPath))) {
    if (!shouldModifyFiles(context)) {
      reportDirectoryDoesNotExist(platformDistPath, context);
      return false;
    }

    throw new Error(`Platform dist folder ${platformDistPath} does not exist. Run "${COMMAND_COPY_NAME}" first.`);
  }

  return true;
};
