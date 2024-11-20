import {type PdkBuilderContextWithPlatformArgs} from '../types/command.types';
import {COMMAND_COPY_NAME} from '../constants';
import {getPlatformDistPath} from './getPlatformDistPath';
import {exists} from './fs/exists';
import {isDryRun} from './command/isDryRun';

export const validateDistPath = async (context: PdkBuilderContextWithPlatformArgs): Promise<boolean> => {
  const platformDistPath = getPlatformDistPath(context);

  if (!(await exists(platformDistPath))) {
    if (isDryRun(context)) {
      return false;
    }

    throw new Error(`Platform dist folder ${platformDistPath} does not exist. Run "${COMMAND_COPY_NAME}" first.`);
  }

  return true;
};
