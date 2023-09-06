import {type InjectionKey} from 'vue';
import {type AdminView} from '@myparcel-pdk/admin-common';
import {type AdminConfiguration, type AdminContextObject, type AdminInstanceContext} from '../types';
import {type PdkLogger} from '../services';
import {type PdkAdmin} from '../pdk';

export interface AdminAppConfig {
  appName: string;
  config: AdminConfiguration;
  context: AdminContextObject;
  logger: PdkLogger;
  view?: AdminView;
}

export interface AdminInstance extends Omit<AdminAppConfig, 'context'> {
  context: Partial<AdminInstanceContext>;
}

export const INJECT_ADMIN_INSTANCE: InjectionKey<AdminInstance> = Symbol('instance');

export const INJECT_GLOBAL_PDK_ADMIN: InjectionKey<PdkAdmin> = Symbol('admin');
