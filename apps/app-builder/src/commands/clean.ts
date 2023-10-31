import {rmDir} from '../utils';
import {type PdkBuilderCommand} from '../types';

const clean: PdkBuilderCommand = async (context) => {
  await rmDir(context.config.outDir, context);
};

export default clean;
