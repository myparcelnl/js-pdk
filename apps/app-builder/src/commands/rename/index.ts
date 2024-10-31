import chalk from 'chalk';
import {executePerPlatform} from '../../utils/command/executePerPlatform';
import {type PdkBuilderCommand} from '../../types/command.types';
import {executeRenameFiles} from './executeRenameFiles';

const rename: PdkBuilderCommand = async (context) => {
  const {debug, config} = context;

  debug('Renaming files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePerPlatform(context, executeRenameFiles);
};

export default rename;
