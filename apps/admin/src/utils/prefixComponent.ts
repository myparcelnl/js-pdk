import {type PrefixedAdminComponent} from '../types';
import {ADMIN_COMPONENT_PREFIX, type AdminComponent} from '../data';

export const prefixComponent = (componentName: string | AdminComponent): PrefixedAdminComponent => {
  if (componentName.startsWith(ADMIN_COMPONENT_PREFIX)) {
    return componentName as PrefixedAdminComponent;
  }

  return `${ADMIN_COMPONENT_PREFIX}${componentName}` as PrefixedAdminComponent;
};
