import {type PdkBuilderCommand} from '../../types/command.types';
import {executeZip} from './executeZip';

const zip = (async (context) => {
  const {debug} = context;

  debug('Compressing files');

  await executeZip(context);
}) satisfies PdkBuilderCommand;

export default zip;
