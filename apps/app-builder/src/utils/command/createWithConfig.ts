/* eslint-disable no-console */
import chalk from 'chalk';
import {type AnyCommandDefinition, type CreateHook} from '../../types/command.types';
import {runHooks} from './runHooks';
import {isDryRun} from './isDryRun';
import {createCommandContext} from './createCommandContext';

export const createWithConfig = ((env) => {
  return (definition) => {
    return async (...args) => {
      const {command, context} = await createCommandContext(definition, args, env);

      if (isDryRun(context)) {
        context.debug(chalk.redBright(`The command was run with --dry-run. No files will be modified`));
      }

      try {
        await runHooks('before', definition, context, command);
        await command(context);
        await runHooks('after', definition, context, command);
      } catch (error) {
        console.error(`An error occurred while running the command "${definition.name}".`);
        console.error('Arguments:', args[0]);
        console.error(error);

        process.exit(1);
      }

      context.debug.logTimeTaken();
    };
  };
}) satisfies CreateHook<AnyCommandDefinition>;
