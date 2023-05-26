import {ADMIN_COMPONENT_PREFIX, type AdminComponent, type PrefixedAdminComponent} from '@myparcel-pdk/common';

export const prefixComponent = (componentName: AdminComponent): PrefixedAdminComponent =>
  `${ADMIN_COMPONENT_PREFIX}${componentName}`;
