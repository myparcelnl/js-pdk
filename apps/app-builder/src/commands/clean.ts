import {deleteDirectory} from '../utils/fs/deleteDirectory';
import {type PdkBuilderCommand} from '../types/command.types';

const clean = (async (context) => {
  await deleteDirectory(context, context.config.outDir);
}) satisfies PdkBuilderCommand;

export default clean;
