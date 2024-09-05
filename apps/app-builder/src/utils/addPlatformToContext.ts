import {type PdkBuilderContext} from '../types/command';
import {type PdkPlatformName} from '../constants';
import {withArgs} from './command/withArgs';

export const addPlatformToContext = <P extends PdkPlatformName>(
  context: PdkBuilderContext,
  platform: P,
): PdkBuilderContext<{platform: P}> => {
  return withArgs(context, {platform});
};
