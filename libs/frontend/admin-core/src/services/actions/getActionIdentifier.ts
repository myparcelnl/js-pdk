import {isOfType} from '@myparcel/ts-utils';
import {type AdminAction, type AnyAdminAction} from '../../types';

export const getActionIdentifier = (action: AnyAdminAction): string => {
  return isOfType<AnyAdminAction<AdminAction>>(action, 'name') ? action.name : action.id;
};
