import {type PdkBuilderContext} from '../types';
import {type PdkPlatformName} from '../constants';
import {withArgs} from './command';

export const addPlatformToContext = <P extends PdkPlatformName>(
  context: PdkBuilderContext,
  platform: P,
): PdkBuilderContext<{platform: P}> => {
  return withArgs(context, {platform});
};
