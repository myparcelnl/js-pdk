import {LiftoffEnv} from 'liftoff';
import {CommandArgs, ResolvedPdkBuilderConfig} from '../types';
import {copy} from '../commands';
import {getPlatformDistPath} from './getPlatformDistPath';
import {exists} from './exists';

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
