import {logPlatforms} from '../../utils/debug/logPlatforms';
import {executePerPlatform} from '../../utils/command/executePerPlatform';
import {type PdkBuilderCommand} from '../../types/command.types';
import {SOURCE_PLATFORM} from '../../constants';
import {transformForPlatform} from './transformForPlatform';

const transform = (async (context) => {
  const {config, debug} = context;

  const filteredPlatforms = config.platforms.filter((platform) => platform !== SOURCE_PLATFORM);

  if (!filteredPlatforms.length) {
    debug('No platforms to transform, skipping...');
    return;
  }

  debug('Transforming files for platforms %s', logPlatforms(filteredPlatforms));

  const contextWithoutSourcePlatform = {...context, config: {...config, platforms: filteredPlatforms}};

  await executePerPlatform(contextWithoutSourcePlatform, transformForPlatform);
}) satisfies PdkBuilderCommand;

export default transform;
