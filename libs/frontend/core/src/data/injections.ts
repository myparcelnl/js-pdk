import {GlobalPdkFrontend} from '../pdk';
import {InjectionKey} from 'vue';
import {PdkInstanceContext} from '../types';

export type PdkInstance = {component: string; context: PdkInstanceContext};

export const INJECT_GLOBAL_PDK_FRONTEND: InjectionKey<GlobalPdkFrontend> = Symbol('pdkFrontend');

export const INJECT_PDK_INSTANCE: InjectionKey<PdkInstance> = Symbol('instance');

export const INJECT_TRANSLATIONS: InjectionKey<Record<string, string>> = Symbol('translations');
