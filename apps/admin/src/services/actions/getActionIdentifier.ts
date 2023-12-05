import {isOfType} from '@myparcel/ts-utils';
import {type AnyActionDefinition} from '../../types';
import {type AdminAction} from '../../data';

export const getActionIdentifier = (action: AnyActionDefinition): string => {
  return isOfType<AnyActionDefinition<AdminAction>>(action, 'name') ? action.name : action.id;
};
