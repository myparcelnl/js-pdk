import {type LiftoffEnv} from 'liftoff';
import {type PdkBuilderConfig, type ResolvedPdkBuilderConfig} from '../types/config';
import {type AnyCommandArgs} from '../types/command';
import {type ParsedCommand} from './command/parseCommand';

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
