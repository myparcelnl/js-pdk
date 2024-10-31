import chalk from 'chalk';
import {executePromises} from '../../utils/executePromises';
import {type PdkBuilderCommand} from '../../types/command.types';
import {incrementVersionInFile} from './incrementVersionInFile';
import {type IncrementCommandArgs} from './increment.types';
import {findFilesToIncrement} from './findFilesToIncrement';

const increment = (async (context) => {
  const {config, args, debug} = context;
  const newVersion = args.version ?? config.version;

  debug('Incrementing version to %s', chalk.greenBright(newVersion));

  const matchingFiles = await findFilesToIncrement(context);

  await executePromises(
    args,
    matchingFiles.map(async ({files, source: match}) => {
      return Promise.all(files.sort().map((file) => incrementVersionInFile(context, match, file)));
    }),
  );
}) satisfies PdkBuilderCommand<IncrementCommandArgs>;

export default increment;
