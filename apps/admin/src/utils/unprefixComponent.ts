import {type PrefixedAdminComponent} from '../types';
import {ADMIN_COMPONENT_PREFIX, type AdminComponent} from '../data';

export const unprefixComponent = (componentName: PrefixedAdminComponent | string): AdminComponent => {
  return componentName.replace(ADMIN_COMPONENT_PREFIX, '') as AdminComponent;
};
