import debugFactory, {type Debugger} from 'debug';

export const createDebugger = (name: string): Debugger => {
  const debug = debugFactory(`@myparcel-pdk/app-builder:${name}`);

  debug.enabled = true;

  // eslint-disable-next-line no-console
  debug.log = console.log.bind(console);

  return debug;
};
