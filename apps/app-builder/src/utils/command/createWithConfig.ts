import {resolveConfig} from '../resolveConfig';
import {mergeDefaultConfig} from '../mergeDefaultConfig';
import {reportDryRun} from '../debug';
import {type CreateHook, type PdkBuilderConfig, type PdkBuilderContext} from '../../types';
import {VerbosityLevel} from '../../constants';
import {shouldModifyFiles} from './shouldModifyFiles';
import {parseCommandInput} from './parseCommandInput';

export const createWithConfig: CreateHook = (env) => {
  return (definition) => {
    return async (...args) => {
      const {command, context} = await parseCommandInput(definition, args, env);

      const config = await resolveConfig(env, context.args);

      const commandName = definition.name;

      const mergedContext = {...context, config: mergeDefaultConfig(config)} satisfies PdkBuilderContext;

      if (!shouldModifyFiles(mergedContext)) {
        reportDryRun(mergedContext.debug);
      }

      const capitalizedCommandName = commandName.charAt(0).toUpperCase() + commandName.slice(1);

      const beforeHook = `before${capitalizedCommandName}` as keyof PdkBuilderConfig['hooks'];
      const afterHook = `after${capitalizedCommandName}` as keyof PdkBuilderConfig['hooks'];

      if (context.args.verbose >= VerbosityLevel.Verbose && (config.hooks?.[beforeHook] ?? null)) {
        context.debug(`Running hook ${beforeHook}`);
      }

      // @ts-expect-error todo
      await config.hooks?.[beforeHook]?.({command, context: mergedContext});

      await command(mergedContext);

      if (context.args.verbose >= VerbosityLevel.Verbose && (config.hooks?.[afterHook] ?? null)) {
        context.debug(`Running hook ${afterHook}`);
      }

      // @ts-expect-error todo
      await config.hooks?.[afterHook]?.({command, context: mergedContext});

      context.debug.logTimeTaken();
    };
  };
};
