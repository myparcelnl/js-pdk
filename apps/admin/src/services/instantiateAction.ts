import {type ActionDefinition, type AnyActionDefinition} from '../types/actions.types';
import {type ActionParameters} from '../types/actions/parameters.types';
import {type MaybeAdminAction} from '../types/actions/actions.types';
import {getActionIdentifier} from './actions/getActionIdentifier';

export const instantiateAction = <A extends MaybeAdminAction>(
  action: AnyActionDefinition<A>,
  parameters?: ActionParameters<A>,
): ActionDefinition<A> => ({
  ...action,
  id: getActionIdentifier(action),
  parameters,
});
