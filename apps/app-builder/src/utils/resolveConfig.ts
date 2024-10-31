import {type LiftoffEnv} from 'liftoff';
import {type PdkBuilderConfig, type ResolvedPdkBuilderConfig} from '../types/config.types';
import {type AnyCommandArgs, type ParsedCommand} from '../types/command.types';

const configCache = new Map<string, PdkBuilderConfig>();

export async function resolveConfig(
  env: LiftoffEnv,
  args?: ParsedCommand<AnyCommandArgs>,
): Promise<ResolvedPdkBuilderConfig> {
  if (!env.configPath) {
    throw new Error('No config file found.');
  }

  if (configCache.has(env.configPath)) {
    return {...configCache.get(env.configPath), ...args} as ResolvedPdkBuilderConfig;
  }

  const imported = await import(env.configPath);

  const resolvedConfig = {
    ...imported.default,
    ...args,
  };

  configCache.set(env.configPath, resolvedConfig);

  return resolvedConfig;
}
