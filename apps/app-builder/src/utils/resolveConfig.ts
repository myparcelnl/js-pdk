import {LiftoffEnv} from 'liftoff';
import {PdkBuilderConfig} from '../types';

export async function resolveConfig(env: LiftoffEnv): Promise<PdkBuilderConfig> {
  if (!env.configPath) {
    throw new Error('No config file found.');
  }

  const imported = await import(env.configPath);

  return imported.default.default;
}
