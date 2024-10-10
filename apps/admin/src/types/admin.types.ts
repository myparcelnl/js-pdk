import {type Component} from 'vue';
import {type PdkLogger} from '../services';
import {
  type ADMIN_COMPONENT_PREFIX,
  type AdminComponent,
  type AdminView,
  type optionalAdminActionContainerComponentNames,
  type optionalAdminComponentNames,
  type optionalAdminPlainWrapperComponentNames,
  type requiredAdminComponentNames,
} from '../data';
import {type AdminContextObject, type AdminInstanceContext} from './context.types';
import {type AdminConfiguration} from './configuration.types';

export type RequiredAdminComponentName = (typeof requiredAdminComponentNames)[number];

export type OptionalAdminComponentName =
  | (typeof optionalAdminComponentNames)[number]
  | (typeof optionalAdminPlainWrapperComponentNames)[number]
  | (typeof optionalAdminActionContainerComponentNames)[number];

export type PrefixedAdminComponent<A extends AdminComponent = AdminComponent> = `${typeof ADMIN_COMPONENT_PREFIX}${A}`;

export type AdminComponentMap = Record<RequiredAdminComponentName, Component> &
  Partial<Record<OptionalAdminComponentName, Component>>;

/**
 * Prefer using AdminComponentMap instead to reduce bundle size.
 */
export type PrefixedAdminComponentMap = Record<PrefixedAdminComponent<RequiredAdminComponentName>, Component> &
  Partial<Record<PrefixedAdminComponent<OptionalAdminComponentName>, Component>>;

export type ComponentImportFunction = () => Promise<{
  default: Component;
}>;

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
