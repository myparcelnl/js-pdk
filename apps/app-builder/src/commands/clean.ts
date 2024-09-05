import {rmDir} from '../utils/fs/rmDir';
import {type PdkBuilderCommand} from '../types/command';

const clean: PdkBuilderCommand = async (context) => {
  await rmDir(context.config.outDir, context);
};

export default clean;
