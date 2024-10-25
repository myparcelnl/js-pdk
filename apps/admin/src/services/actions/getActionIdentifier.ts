import {isOfType} from '@myparcel/ts-utils';
import {type AnyActionDefinition} from '../../types/actions.types';
import {type AdminAction} from '../../data/constants';

export const getActionIdentifier = (action: AnyActionDefinition): string => {
  return isOfType<AnyActionDefinition<AdminAction>>(action, 'name') ? action.name : action.id;
};
