import debugFactory, {type Debugger} from 'debug';
import {type CommandArgs} from '../types';

export const createDebugger = (name: string, args: CommandArgs): Debugger => {
  const debug = debugFactory(`@myparcel-pdk/app-builder:${name}`);

  debug.enabled = args.quiet === false;

  // eslint-disable-next-line no-console
  debug.log = console.log.bind(console);

  return debug;
};
