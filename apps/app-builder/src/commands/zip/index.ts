import chalk from 'chalk';
import {executePerPlatform} from '../../utils/command/executePerPlatform';
import {type PdkBuilderCommand} from '../../types/command.types';
import {executeZipForPlatform} from './executeZipForPlatform';

const zip = (async (context) => {
  const {config, debug} = context;

  debug('Compressing files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePerPlatform(context, executeZipForPlatform);
}) satisfies PdkBuilderCommand;

export default zip;
