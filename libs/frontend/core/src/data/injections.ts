import {PdkConfiguration, PdkContextObject, PdkInstanceContext} from '../types';
import {InjectionKey} from 'vue';
import {PdkAdmin} from '../pdk';
import {PdkLogger} from '../services';

export interface PdkAppConfig {
  appName: string;
  config: PdkConfiguration;
  context: PdkContextObject;
  logger: PdkLogger;
}

export interface PdkAppInstance extends Omit<PdkAppConfig, 'context'> {
  context: Partial<PdkInstanceContext>;
}

export const INJECT_GLOBAL_PDK_ADMIN: InjectionKey<PdkAdmin> = Symbol('pdkAdmin');

export const INJECT_PDK_INSTANCE: InjectionKey<PdkAppInstance> = Symbol('instance');

export const INJECT_TRANSLATIONS: InjectionKey<Record<string, string>> = Symbol('translations');
