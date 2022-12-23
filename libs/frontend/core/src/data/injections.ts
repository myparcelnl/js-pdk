import {PdkConfiguration, PdkInstanceContext} from '../types';
import {InjectionKey} from 'vue';
import {PdkFrontend} from '../pdk';
import {PdkLogger} from '../services';

export type PdkInstance = {
  appName: string;
  config: PdkConfiguration;
  context: Partial<PdkInstanceContext>;
  logger: PdkLogger;
};

export const INJECT_GLOBAL_PDK_FRONTEND: InjectionKey<PdkFrontend> = Symbol('pdkFrontend');

export const INJECT_PDK_INSTANCE: InjectionKey<PdkInstance> = Symbol('instance');

export const INJECT_TRANSLATIONS: InjectionKey<Record<string, string>> = Symbol('translations');
