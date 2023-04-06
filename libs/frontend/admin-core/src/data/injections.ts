import {AdminConfiguration, AdminContextObject, AdminInstanceContext} from '../types';
import {AdminView} from '@myparcel-pdk/common/src';
import {InjectionKey} from 'vue';
import {PdkAdmin} from '../pdk';
import {PdkLogger} from '../services';

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