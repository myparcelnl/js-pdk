import {type PdkBuilderContext, type PdkPlatformName} from '../types';
import {withArgs} from './command/withArgs';

export const addPlatformToContext = <P extends PdkPlatformName>(
  context: PdkBuilderContext,
  platform: P,
): PdkBuilderContext<{platform: P}> => {
  return withArgs(context, {platform});
};
