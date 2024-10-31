import {usesPhpScoper} from '../../utils/usesPhpScoper';
import {globFiles} from '../../utils/globFiles';
import {copyScopedFilesForPlatform} from '../../utils/copyScopedFilesForPlatform';
import {executePerPlatform} from '../../utils/command/executePerPlatform';
import {type PdkBuilderCommand} from '../../types/command.types';
import {copyForPlatform} from './copyForPlatform';

const copy = (async (context) => {
  const {debug, config} = context;

  const files = globFiles(config.source, context).sort();

  await executePerPlatform(context, (context) => copyForPlatform(context, files));

  debug('Finished copying files');

  if (await usesPhpScoper(context)) {
    await executePerPlatform(context, copyScopedFilesForPlatform);

    debug('Finished copying scoped files');
  }
}) satisfies PdkBuilderCommand;

export default copy;
