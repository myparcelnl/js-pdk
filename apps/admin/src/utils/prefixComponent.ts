import {type PrefixedAdminComponent} from '../types/admin.types';
import {ADMIN_COMPONENT_PREFIX} from '../data/constants';
import {type AdminComponent} from '../data/components';

export const prefixComponent = (componentName: string | AdminComponent): PrefixedAdminComponent => {
  if (componentName.startsWith(ADMIN_COMPONENT_PREFIX)) {
    return componentName as PrefixedAdminComponent;
  }

  return `${ADMIN_COMPONENT_PREFIX}${componentName}` as PrefixedAdminComponent;
};
