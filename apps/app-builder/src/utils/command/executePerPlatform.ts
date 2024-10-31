import {executePromises} from '../executePromises';
import {addPlatformToContext} from '../addPlatformToContext';
import {type PdkBuilderContext, type PdkBuilderContextWithPlatformArgs} from '../../types/command.types';

export const executePerPlatform = (
  context: PdkBuilderContext,
  callback: (context: PdkBuilderContextWithPlatformArgs) => Promise<void>,
): Promise<void> => {
  const {args, config} = context;

  return executePromises(
    args,
    config.platforms.map((platform) => {
      const platformContext = addPlatformToContext(context, platform);

      return callback(platformContext);
    }),
  );
};
