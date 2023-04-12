import {CommandArgs, ResolvedPdkBuilderConfig} from '../types';
import {LiftoffEnv} from 'liftoff';
import {copy} from '../commands';
import {exists} from './exists';
import {getPlatformDistPath} from './getPlatformDistPath';

export const validateDistPath = async (context: {
  config: ResolvedPdkBuilderConfig;
  env: LiftoffEnv;
  platform: string;
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
