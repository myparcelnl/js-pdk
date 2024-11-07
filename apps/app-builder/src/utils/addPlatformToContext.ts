import {
  type AnyCommandArgs,
  type DefaultCommandArgs,
  type PdkBuilderContext,
  type PdkBuilderContextWithPlatformArgs,
} from '../types/command.types';
import {type PdkPlatformName} from '../constants';
import {resolvePath} from './resolvePath';
import {withArgs} from './command/withArgs';

export const addPlatformToContext = <
  Platform extends PdkPlatformName,
  Args extends AnyCommandArgs = DefaultCommandArgs,
>(
  context: PdkBuilderContext<Args>,
  platform: Platform,
): PdkBuilderContextWithPlatformArgs<Args, Platform> => {
  const {config} = context;

  const withPlatform = withArgs(context, {platform});
  const platformOutDir = resolvePath([config.outDir, config.platformFolderName], withPlatform);

  return withArgs(withPlatform, {platformOutDir});
};
