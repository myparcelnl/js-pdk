import {type CreateHook, type PdkBuilderConfig, type PdkBuilderContext, type WithConfigParams} from '../types';
import {type CommandName, VerbosityLevel} from '../constants';
import {resolveConfig} from './resolveConfig';
import {parseCommandInput} from './parseCommandInput';
import {mergeDefaultConfig} from './mergeDefaultConfig';

export const createWithConfig: CreateHook<WithConfigParams> = (env) => {
  return (callback) => {
    return async (...args) => {
      const config = await resolveConfig(env);
      const {command, context} = await parseCommandInput(callback, args, env);

      const commandName = command.name as CommandName;

      const mergedContext: PdkBuilderContext = {
        ...context,
        config: mergeDefaultConfig(config),
      };

      const capitalizedCommandName = commandName.charAt(0).toUpperCase() + commandName.slice(1);

      const beforeHook = `before${capitalizedCommandName}` as keyof PdkBuilderConfig['hooks'];
      const afterHook = `after${capitalizedCommandName}` as keyof PdkBuilderConfig['hooks'];

      if (context.args.verbose >= VerbosityLevel.Verbose && (config.hooks[beforeHook] ?? null)) {
        context.debug(`Running hook ${beforeHook}`);
      }

      // @ts-expect-error todo
      await config.hooks[beforeHook]?.({
        command,
        context: mergedContext,
      });

      await command(mergedContext);

      if (context.args.verbose >= VerbosityLevel.Verbose && (config.hooks[afterHook] ?? null)) {
        context.debug(`Running hook ${afterHook}`);
      }

      // @ts-expect-error todo
      await config.hooks[afterHook]?.({
        command,
        context: mergedContext,
      });

      context.debug.logTimeTaken();
    };
  };
};
