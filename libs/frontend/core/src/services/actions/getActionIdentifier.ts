import {AdminAction, MaybeAdminAction, PdkAction} from '../../types';
import {isOfType} from '@myparcel/ts-utils';

export const getActionIdentifier = <A extends MaybeAdminAction>(action: PdkAction<A>): string => {
  return isOfType<PdkAction<AdminAction>>(action, 'name') ? action.name : action.id;
};
