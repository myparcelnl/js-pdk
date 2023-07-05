import {type Debugger} from 'debug';
import {type CommandArgs} from '../types';
import {createDebugger} from './createDebugger';

export const initializeCommand = (
  name: string,
  args: CommandArgs,
): {
  debug: Debugger;
  time: number;
} => {
  return {
    debug: createDebugger(name, args),
    time: Date.now(),
  };
};
