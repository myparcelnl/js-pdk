import {GlobalPdkFrontend} from '../setup/initializePdkFrontend';
import {InjectionKey} from 'vue';
import {PdkInstanceContext} from '@myparcel/pdk-frontend-shared';

export type PdkInstance = {component: string; context: PdkInstanceContext};

export const INJECT_PDK_INSTANCE = Symbol('instance') as InjectionKey<PdkInstance>;
export const INJECT_GLOBAL_PDK_FRONTEND: InjectionKey<GlobalPdkFrontend> = Symbol('pdkFrontend');
export const INJECT_TRANSLATIONS = Symbol('translations') as InjectionKey<Record<string, string>>;
