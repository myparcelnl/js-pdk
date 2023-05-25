import {InjectionKey} from 'vue';
import {AdminView} from '@myparcel-pdk/common';
import {AdminConfiguration, AdminContextObject, AdminInstanceContext} from '../types';
import {PdkLogger} from '../services';
import {PdkAdmin} from '../pdk';

export interface AdminAppConfig {
  appName: string;
  config: AdminConfiguration;
  context: AdminContextObject;
  logger: PdkLogger;
  view: AdminView;
}

export interface AdminInstance extends Omit<AdminAppConfig, 'context'> {
  context: Partial<AdminInstanceContext>;
}

export const INJECT_ADMIN_INSTANCE: InjectionKey<AdminInstance> = Symbol('instance');

export const INJECT_GLOBAL_PDK_ADMIN: InjectionKey<PdkAdmin> = Symbol('admin');
