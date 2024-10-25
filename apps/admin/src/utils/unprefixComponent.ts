import {type PrefixedAdminComponent} from '../types/admin.types';
import {ADMIN_COMPONENT_PREFIX} from '../data/constants';
import {type AdminComponent} from '../data/components';

export const unprefixComponent = (componentName: PrefixedAdminComponent | string): AdminComponent => {
  return componentName.replace(ADMIN_COMPONENT_PREFIX, '') as AdminComponent;
};
