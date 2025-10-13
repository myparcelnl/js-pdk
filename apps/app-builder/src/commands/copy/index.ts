import {usesPhpScoper} from '../../utils/usesPhpScoper';
import {globFiles} from '../../utils/globFiles';
import {copyScopedFiles} from '../../utils/copyScopedFiles';
import {type PdkBuilderCommand} from '../../types/command.types';
import {copyFiles} from './copyFiles';

const copy = (async (context) => {
  const {debug, config} = context;

  const files = globFiles(config.source, context).sort();

  await copyFiles(context, files);

  debug('Finished copying files');

  if (await usesPhpScoper(context)) {
    await copyScopedFiles(context);

    debug('Finished copying scoped files');
  }
}) satisfies PdkBuilderCommand;

export default copy;
