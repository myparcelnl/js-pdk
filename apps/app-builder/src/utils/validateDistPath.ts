import {type LiftoffEnv} from 'liftoff';
import {type CommandArgs, type ResolvedPdkBuilderConfig, type PdkPlatformName} from '../types';
import {copy} from '../commands';
import {getPlatformDistPath} from './getPlatformDistPath';
import {exists} from './exists';

export const validateDistPath = async (context: {
  config: ResolvedPdkBuilderConfig;
  env: LiftoffEnv;
  platform: PdkPlatformName;
  args: CommandArgs;
}): Promise<boolean> => {
  const platformDistPath = getPlatformDistPath(context);

  if (!(await exists(platformDistPath))) {
    if (context.args.dryRun) {
      return false;
    }

    throw new Error(`Platform dist folder ${platformDistPath} does not exist. Run "${copy.name}" first.`);
  }

  return true;
};
