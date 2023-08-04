import debugFactory from 'debug';
import chalk from 'chalk';
import {type CommandArgs, type PdkDebugger} from '../types';

export const createDebugger = (name: string, args: CommandArgs): PdkDebugger => {
  const debug = debugFactory(`@myparcel-pdk/app-builder:${name}`) as PdkDebugger;

  const timeStart = Date.now();

  debug.enabled = args.quiet !== false;

  // eslint-disable-next-line no-console
  debug.log = console.log.bind(console);

  // noinspection JSUnusedGlobalSymbols
  debug.logTimeTaken = (): void => {
    debug(chalk.greenBright('Done in'), chalk.yellowBright(`${Date.now() - timeStart}ms`));
  };

  return debug;
};
