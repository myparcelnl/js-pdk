import {AdminAction, AnyAdminAction} from '../../types';
import {isOfType} from '@myparcel/ts-utils';

export const getActionIdentifier = (action: AnyAdminAction): string => {
  return isOfType<AnyAdminAction<AdminAction>>(action, 'name') ? action.name : action.id;
};
