import {type PrefixedAdminComponent} from '../types';
import {ADMIN_COMPONENT_PREFIX, type AdminComponent} from '../data';

export const prefixComponent = (componentName: AdminComponent): PrefixedAdminComponent =>
  `${ADMIN_COMPONENT_PREFIX}${componentName}`;
