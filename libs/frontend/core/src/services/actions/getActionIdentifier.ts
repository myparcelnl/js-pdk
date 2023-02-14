import {AdminAction, AnyAdminAction, MaybeAdminAction} from '../../types';
import {isOfType} from '@myparcel/ts-utils';

export const getActionIdentifier = <A extends MaybeAdminAction>(action: AnyAdminAction<A>): string => {
  return isOfType<AnyAdminAction<AdminAction>>(action, 'name') ? action.name : action.id;
};
