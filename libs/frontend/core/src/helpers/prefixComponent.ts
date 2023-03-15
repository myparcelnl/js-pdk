import {ADMIN_COMPONENT_PREFIX, AdminComponent, PrefixedAdminComponent} from '@myparcel-pdk/common/src';

export const prefixComponent = (componentName: AdminComponent): PrefixedAdminComponent =>
  `${ADMIN_COMPONENT_PREFIX}${componentName}`;
