import {Debugger} from 'debug';
import {createDebugger} from './createDebugger';

export const initializeCommand = (
  name: string,
): {
  debug: Debugger;
  time: number;
} => {
  return {
    debug: createDebugger(name),
    time: Date.now(),
  };
};
