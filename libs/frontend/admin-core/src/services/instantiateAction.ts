import {type ActionDefinition, type ActionParameters, type AdminAction, type AnyAdminAction} from '../types';
import {getActionIdentifier} from './actions';

export const instantiateAction = (
  action: AnyAdminAction,
  parameters?: ActionParameters<AdminAction>,
): ActionDefinition => ({
  ...action,
  id: getActionIdentifier(action as AnyAdminAction<AdminAction>),
  parameters: parameters ?? {},
});
