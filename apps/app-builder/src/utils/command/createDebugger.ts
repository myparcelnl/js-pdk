import debugFactory from 'debug';
import chalk from 'chalk';
import {type DefaultCommandArgs, type PdkDebugger} from '../../types/command.types';

export const createDebugger = (name: string, args: DefaultCommandArgs): PdkDebugger => {
  const debug = debugFactory(`@myparcel-pdk/app-builder:${name}`) as PdkDebugger;

  const timeStart = Date.now();

  debug.enabled = !args.quiet;

  // eslint-disable-next-line no-console
  debug.log = console.log.bind(console);

  // noinspection JSUnusedGlobalSymbols
  debug.logTimeTaken = (): void => {
    debug(chalk.greenBright('Done in'), chalk.yellowBright(`${Date.now() - timeStart}ms`));
  };

  return debug;
};
