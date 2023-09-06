import {type Component} from 'vue';
import {type ADMIN_COMPONENT_PREFIX, type AdminComponent} from '../data';
import {
  type optionalAdminActionContainerComponentNames,
  type optionalAdminPlainWrapperComponentNames,
  type requiredAdminComponentNames,
} from '../components';

export type RequiredAdminComponentName = (typeof requiredAdminComponentNames)[number];

export type OptionalAdminComponentName =
  | (typeof optionalAdminPlainWrapperComponentNames)[number]
  | (typeof optionalAdminActionContainerComponentNames)[number];

export type PrefixedAdminComponent<A extends AdminComponent = AdminComponent> = `${typeof ADMIN_COMPONENT_PREFIX}${A}`;

export type AdminComponentMap = Record<PrefixedAdminComponent<RequiredAdminComponentName>, Component> &
  Partial<Record<PrefixedAdminComponent<OptionalAdminComponentName>, Component>>;

export type ComponentImportFunction = () => Promise<{
  default: Component;
}>;
