import {LiftoffEnv} from 'liftoff';
import {PdkBuilderConfig} from '../types';

export async function resolveConfig(env: LiftoffEnv): Promise<PdkBuilderConfig> {
  if (!env.configPath) {
    throw new Error('No config file found.');
  }

  return (await import(env.configPath)).default;
}
