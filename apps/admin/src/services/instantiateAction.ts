import {type ActionDefinition, type ActionParameters, type AnyActionDefinition, type MaybeAdminAction} from '../types';
import {getActionIdentifier} from './actions';

export const instantiateAction = <A extends MaybeAdminAction>(
  action: AnyActionDefinition<A>,
  parameters?: ActionParameters<A>,
): ActionDefinition<A> => ({
  ...action,
  id: getActionIdentifier(action),
  parameters,
});
