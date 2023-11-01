import {isOfType} from '@myparcel/ts-utils';
import {type AdminAction, type AnyActionDefinition} from '../../types';

export const getActionIdentifier = (action: AnyActionDefinition): string => {
  return isOfType<AnyActionDefinition<AdminAction>>(action, 'name') ? action.name : action.id;
};
