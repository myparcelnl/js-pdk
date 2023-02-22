/* eslint-disable no-console */
import {CommandArgs, PdkBuilderContext} from '../types';
import {LiftoffEnv} from 'liftoff';
import chalk from 'chalk';
import {isOfType} from '@myparcel/ts-utils';
import {mergeDefaultConfig} from './mergeDefaultConfig';
import {resolveConfig} from './resolveConfig';

export const withConfig = <A extends CommandArgs>(
  callback: (context: PdkBuilderContext) => Promise<void> | void,
): ((env: LiftoffEnv, args: A) => Promise<void>) => {
  return async (env, args: A) => {
    try {
      const config = await resolveConfig(env);

      const context: PdkBuilderContext<A> = {
        config: mergeDefaultConfig(config),
        env,
        args,
      };

      await callback(context);
    } catch (error) {
      if (!isOfType<Error>(error, 'message')) {
        console.error(error);
        return;
      }

      console.error(chalk.red('Failed to resolve config.'));
      console.error(error.stack);
    }
  };
};
