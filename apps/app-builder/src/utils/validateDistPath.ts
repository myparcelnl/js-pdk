import {type PdkBuilderContext} from '../types/command';
import {COMMAND_COPY_NAME, type PdkPlatformName} from '../constants';
import {getPlatformDistPath} from './getPlatformDistPath';
import {exists} from './fs/exists';
import {reportDirectoryDoesNotExist} from './debug/reportOnFile';
import {shouldModifyFiles} from './command/shouldModifyFiles';

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
