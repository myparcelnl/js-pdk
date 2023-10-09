import {type LiftoffEnv} from 'liftoff';
import {type PdkBuilderConfig, type ResolvedPdkBuilderConfig} from '../types';

const configCache = new Map<string, PdkBuilderConfig>();

export async function resolveConfig(env: LiftoffEnv): Promise<ResolvedPdkBuilderConfig> {
  if (!env.configPath) {
    throw new Error('No config file found.');
  }

  if (configCache.has(env.configPath)) {
    return configCache.get(env.configPath) as ResolvedPdkBuilderConfig;
  }

  const imported = await import(env.configPath);

  configCache.set(env.configPath, imported.default);

  return imported.default;
}
